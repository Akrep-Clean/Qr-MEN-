// pages/admin/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('Şifre yanlış!');
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
    <form onSubmit={handleLogin} className="bg-ivory-50 p-8 rounded-xl shadow-sm max-w-sm w-full space-y-6 border border-stone-200">
      <h1 className="text-2xl font-medium text-center text-stone-700 tracking-tight">Admin Giriş</h1>
      
      <div className="space-y-3">
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5
                    text-stone-800 placeholder-stone-500 font-normal
                    focus:outline-none focus:ring-1 focus:ring-stone-400
                    bg-stone-50 transition-all"
          required
        />
      </div>

      {error && (
        <p className="text-rose-600 font-normal text-sm text-center tracking-wide">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-stone-700 hover:bg-stone-600 text-stone-100 
                  font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
      >
        Giriş Yap
      </button>
    </form>
  </div>
);
}