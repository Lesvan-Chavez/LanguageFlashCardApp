'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function HomeOverlay() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto-dismiss alerts
  useEffect(() => {
    if (!errorMsg && !successMsg) return;
    const t = setTimeout(() => {
      setErrorMsg('');
      setSuccessMsg('');
    }, 5000);
    return () => clearTimeout(t);
  }, [errorMsg, successMsg]);

  const signUp = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      // username validation
      if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
        setErrorMsg('Username must be 3–20 chars: letters, numbers, underscore.');
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }, // saved in user_metadata
      });

      if (error) {
        setErrorMsg(error.message || 'Sign-up failed. Please try again.');
        return;
      }
      setSuccessMsg('Check your email for the confirmation link.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg('Invalid email or password. Please try again.');
        return;
      }

      setSuccessMsg('Signed in!');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello! Hola! привет! 你好! こんにちは!</h1>
          <p className="mb-5">
            Welcome to our language learning flash card app! This is our capstone project for OK
            Coders. Created by Lesvan Chavez
          </p>

          {/* ALERTS */}
          {errorMsg && (
            <div role="alert" className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMsg}</span>
              <button className="btn btn-ghost btn-sm ml-auto" onClick={() => setErrorMsg('')}>
                Dismiss
              </button>
            </div>
          )}

          {successMsg && (
            <div role="alert" className="alert alert-success mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
              <button className="btn btn-ghost btn-sm ml-auto" onClick={() => setSuccessMsg('')}>
                Dismiss
              </button>
            </div>
          )}

          <div className="rounded-box bg-base-100 p-8 text-left shadow-md">
            <h2 className="mb-4 text-center text-2xl font-semibold">Get Started</h2>

            {/* Email */}
            <label className="form-control mb-4 w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <div className="join w-full">
                <span className="btn btn-square join-item bg-base-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                    <g
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </g>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input join-item input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            {/* Username */}
            <label className="form-control mb-4 w-full">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                placeholder="Enter a username"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            {/* Password */}
            <label className="form-control mb-4 w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="join w-full">
                <span className="btn btn-square join-item bg-base-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                    <g
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input join-item input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            {/* Actions */}
            <div className="mt-6 flex justify-between gap-2">
              <button
                type="button"
                className={`btn btn-primary w-1/2 ${loading ? 'btn-disabled loading' : ''}`}
                onClick={signUp}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              <button
                type="button"
                className={`btn btn-accent w-1/2 ${loading ? 'btn-disabled loading' : ''}`}
                onClick={signIn}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
