import { useRef, useState, useEffect } from 'react';
import EquationToolbar from '../components/EquationToolbar';

const AUTOSAVE_KEY = 'notes-app-draft';

export default function NoteEditor({ onSave, note, loading, error, content, setContent, title, setTitle }) {
  const [history, setHistory] = useState(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef();

  // Restore draft from localStorage on mount (if not editing an existing note)
  useEffect(() => {
    if (!note) {
      const draft = localStorage.getItem(AUTOSAVE_KEY);
      if (draft) {
        try {
          const { title: draftTitle, content: draftContent } = JSON.parse(draft);
          setTitle(draftTitle || '');
          setContent(draftContent || '');
          setHistory([draftContent || '']);
          setHistoryIndex(0);
        } catch {}
      }
    }
  }, [note, setTitle, setContent]);

  // Autosave to localStorage as user types (only for new notes)
  useEffect(() => {
    if (!note) {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ title, content }));
    }
  }, [title, content, note]);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setHistory([note?.content || '']);
    setHistoryIndex(0);
  }, [note, setTitle, setContent]);

  // Update history on content change
  useEffect(() => {
    if (content !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(content);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    // eslint-disable-next-line
  }, [content]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setContent(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setContent(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle('');
    setContent('');
    setHistory(['']);
    setHistoryIndex(0);
    localStorage.removeItem(AUTOSAVE_KEY);
  };

  const insertLatex = (latex) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.slice(0, start);
    const after = content.slice(end);
    const newContent = before + latex + after;
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + latex.length;
    }, 0);
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setHistory(['']);
    setHistoryIndex(0);
    textareaRef.current?.focus();
    localStorage.removeItem(AUTOSAVE_KEY);
  };

  return (
    <form className="flex-1 flex flex-col gap-2" onSubmit={handleSubmit}>
      <label className="font-semibold text-neutral-700 mb-1">Note Editor</label>
      <EquationToolbar onInsert={insertLatex} onClear={handleClear} onUndo={handleUndo} onRedo={handleRedo} />
      <input
        className="border border-neutral-200 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title (e.g., Physics Equations)"
        required
        aria-label="Note Title"
        disabled={loading}
      />
      <textarea
        ref={textareaRef}
        className="border border-neutral-200 rounded px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={"Write Markdown + LaTeX here. Use $$...$$ for equations. Example: $$\\sum_{i=1}^n$$"}
        required
        aria-label="Note Content"
        disabled={loading}
      />
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 bg-neutral-700 text-white py-2 rounded font-semibold hover:bg-neutral-800 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : note ? 'Save Note' : 'Save Note'}
        </button>
        <button
          className="flex-1 bg-neutral-200 text-neutral-700 py-2 rounded font-semibold hover:bg-neutral-300 transition"
          type="button"
          onClick={handleClear}
          disabled={loading}
        >
          New Note
        </button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </form>
  );
}
