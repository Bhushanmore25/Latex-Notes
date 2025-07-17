import { useState } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';

function getInitialUser() {
  const user = localStorage.getItem('notes-app-user');
  return user ? JSON.parse(user) : null;
}

export default function App() {
  const [user, setUser] = useState(getInitialUser);

  const handleLogout = () => {
    localStorage.removeItem('notes-app-token');
    localStorage.removeItem('notes-app-user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Header Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <span className="text-lg font-semibold text-neutral-800">Notes with Live LaTeX</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Optional: Add dark mode and settings icons here */}
          {user && (
            <button
              className="px-3 py-1 rounded bg-neutral-200 text-neutral-700 shadow hover:bg-neutral-300 focus:outline-none text-sm"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          {user ? <Home user={user} /> : <Auth onAuth={setUser} />}
        </div>
      </main>
    </div>
  );
}
