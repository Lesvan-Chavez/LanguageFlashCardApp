'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!msg.text) return;
    const t = setTimeout(() => setMsg({ type: '', text: '' }), 5000);
    return () => clearTimeout(t);
  }, [msg]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMsg({ type: '', text: '' });

      // basic username validation (3–20, letters/numbers/_)
      if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
        setMsg({ type: 'error', text: 'Username must be 3–20 chars: letters, numbers, underscore.' });
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }, // stored in user_metadata
      });

      if (error) {
        setMsg({ type: 'error', text: error.message || 'Sign-up failed. Please try again.' });
        return;
      }

      // If email confirmation is enabled, user isn’t signed in yet.
      setMsg({ type: 'success', text: 'Check your email for the confirmation link.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content w-full max-w-xl">
        <div className="w-full">
          <h1 className="text-center text-4xl font-bold mb-6">Create an account</h1>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {msg.text && (
                <div
                  role="alert"
                  className={`alert mb-4 ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`}
                >
                  <span>{msg.text}</span>
                  <button
                    type="button"
                    className="btn btn-xs btn-ghost ml-auto"
                    onClick={() => setMsg({ type: '', text: '' })}
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <form className="form-control gap-3" onSubmit={handleSignUp}>
                <label className="input input-bordered flex items-center gap-2">
                  <span className="opacity-70">Email</span>
                  
                         {/* <span className="btn btn-square join-item bg-base-200">
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
                </span> */}


                  <input
                    className="grow"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

{/* <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
  <input
    type="text"
    required
    placeholder="Username"
    pattern="[A-Za-z][A-Za-z0-9\-]*"
    minlength="3"
    maxlength="30"
    title="Only letters, numbers or dash"
  />
</label>
<p className="validator-hint">
  Must be 3 to 30 characters
  <br />containing only letters, numbers or dash
</p> */}


                <label className="input input-bordered flex items-center gap-2">
                  <span className="opacity-70">Username</span>
                  <input
                    className="grow"
                    type="text"
                    placeholder="3–20 chars (letters/numbers/_)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <span className="opacity-70">Password</span>
                  
            {/* <span className="btn btn-square join-item bg-base-200">
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
                </span> */}

                  <input
                    className="grow"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>

                <button
                  type="submit"
                  className={`btn btn-primary mt-2 ${loading ? 'btn-disabled loading' : ''}`}
                >
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
              </form>

              <p className="mt-4 text-sm">
                Already have an account?{' '}
                <Link href="/pages/signin" className="link link-primary">
                  Sign in instead
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="text-center mt-6 opacity-80">
            By continuing, you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
