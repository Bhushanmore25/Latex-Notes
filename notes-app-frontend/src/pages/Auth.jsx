import { useState } from 'react';

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      if (isLogin) {
        localStorage.setItem('notes-app-token', data.token);
        localStorage.setItem('notes-app-user', JSON.stringify(data.user));
        onAuth(data.user);
      } else {
        setIsLogin(true);
        setForm({ username: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg border border-neutral-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
        {isLogin ? 'Login to Your Account' : 'Create an Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <input
            className="border border-neutral-200 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 text-lg"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        )}
        <input
          className="border border-neutral-200 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 text-lg"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="border border-neutral-200 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 text-lg"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          className="bg-indigo-600 text-white px-4 py-3 rounded w-full font-semibold text-lg shadow hover:bg-indigo-700 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="text-center mt-6">
        <button
          className="text-indigo-600 hover:underline text-base font-medium"
          onClick={() => setIsLogin(l => !l)}
          disabled={loading}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
} 