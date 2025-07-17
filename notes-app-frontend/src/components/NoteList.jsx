import { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { AnimatePresence, motion } from 'framer-motion';

export default function NoteList({ onEdit, onDelete, refresh, loading, error, token, gridMode }) {
  const [notes, setNotes] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLocalLoading(true);
    setLocalError('');
    fetch('/api/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch notes');
        return res.json();
      })
      .then(setNotes)
      .catch(err => setLocalError(err.message))
      .finally(() => setLocalLoading(false));
  }, [refresh, token]);

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading || localLoading) {
    return <div className="text-center text-blue-500">Loading notes...</div>;
  }
  if (error || localError) {
    return <div className="text-center text-red-500">{error || localError}</div>;
  }

  if (gridMode) {
    return (
      <div>
        <input
          className="border p-2 w-full rounded mb-4"
          type="text"
          placeholder="Search notes by title or content..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search notes"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredNotes.map(note => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <NoteItem note={note} onEdit={onEdit} onDelete={onDelete} cardMode />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredNotes.length === 0 && <div className="text-center text-gray-400 mt-4">No notes found.</div>}
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <input
        className="border p-2 w-full rounded mb-4"
        type="text"
        placeholder="Search notes by title or content..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <AnimatePresence>
        {filteredNotes.map(note => (
          <motion.div
            key={note._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <NoteItem note={note} onEdit={onEdit} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
      {filteredNotes.length === 0 && <div className="text-center text-gray-400">No notes found.</div>}
    </div>
  );
} 