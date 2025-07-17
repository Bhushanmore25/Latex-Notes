import { useState } from 'react';
import NoteList from '../components/NoteList';
import NoteEditor from './NoteEditor';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function Home({ user }) {
  const [editingNote, setEditingNote] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [content, setContent] = useState(editingNote?.content || '');
  const [title, setTitle] = useState(editingNote?.title || '');

  const token = localStorage.getItem('notes-app-token');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSave = async (note) => {
    setLoading(true);
    setError('');
    try {
      if (editingNote) {
        const res = await fetch(`/api/notes/${editingNote._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error('Failed to update note');
        showToast('Note updated!');
      } else {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error('Failed to create note');
        showToast('Note created!');
      }
      setEditingNote(null);
      setRefresh(r => !r);
      setContent('');
      setTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setContent(note.content);
    setTitle(note.title);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete note');
      setRefresh(r => !r);
      showToast('Note deleted!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center py-8 px-2">
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow z-50 transition-all">
          {toast}
        </div>
      )}
      {/* Editor and Preview */}
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white rounded-lg shadow p-6 border border-neutral-100 flex flex-col">
          <NoteEditor
            onSave={handleSave}
            note={editingNote}
            loading={loading}
            error={error}
            content={content}
            setContent={setContent}
            title={title}
            setTitle={setTitle}
          />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow p-6 border border-neutral-100 flex flex-col">
          <label className="font-semibold text-neutral-700 mb-1">Live Preview</label>
          <div className="bg-neutral-50 border border-neutral-200 rounded p-4 min-h-[120px]">
            <div className="prose max-w-none mt-2">
              {content.trim() ? (
                <ReactMarkdown
                  children={content}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                />
              ) : (
                <span className="text-gray-400">Live preview will appear here...</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Saved Notes Section */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2 text-neutral-700">Saved Notes</h2>
        <p className="text-sm text-neutral-500 mb-4">Manage your previously saved notes</p>
        <NoteList onEdit={handleEdit} onDelete={handleDelete} refresh={refresh} loading={loading} error={error} token={token} gridMode />
      </div>
    </div>
  );
} 