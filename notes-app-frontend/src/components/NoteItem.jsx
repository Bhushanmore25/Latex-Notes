import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function NoteItem({ note, onEdit, onDelete, cardMode }) {
  const date = new Date(note.createdAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  if (cardMode) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-neutral-100 flex flex-col h-full">
        <div className="font-bold text-neutral-800 mb-1 truncate">{note.title}</div>
        <div className="prose max-w-none text-neutral-600 text-sm flex-1 mb-2 line-clamp-2 overflow-hidden">
          <ReactMarkdown
            children={note.content}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          />
        </div>
        <div className="text-xs text-neutral-400 mb-2">{date}</div>
        <div className="flex gap-2 mt-auto">
          <button
            className="px-3 py-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 text-xs font-semibold"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 text-xs font-semibold"
            onClick={() => onDelete(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 bg-gray-50 flex flex-col gap-2">
      <div className="font-bold text-lg">{note.title}</div>
      <div className="text-gray-700 whitespace-pre-line">{note.content}</div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-400 text-white px-3 py-1 rounded"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
} 