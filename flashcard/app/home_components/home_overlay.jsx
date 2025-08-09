"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HomeOverlay() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return;
    }
    if (data.user) {
      await supabase
        .from("users")
        .insert([{ id: data.user.id, username: email.split("@")[0] }]);
    }
    alert("Check your email for a confirmation link!");
    router.push("/dashboard");
  };
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Signed in!");
    router.push("/dashboard");
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Hello! Hola! привет! 你好! こんにちは!
          </h1>
          <p className="mb-5">
            Welcome to our language learning flash card app! This is our
            capstone project for OK Coders. Created by The Syntax Diplomats
          </p>

          <div className="bg-base-100 p-8 rounded-box shadow-md text-left">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Get Started
            </h2>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <div className="join w-full">
                <span className="join-item btn btn-square bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
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
                  className="input input-bordered join-item w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="join w-full">
                <span className="join-item btn btn-square bg-base-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered join-item w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            <div className="flex justify-between gap-2 mt-6">
              <button className="btn btn-primary w-1/2" onClick={signUp}>
                Sign Up
              </button>
              <button className="btn btn-accent w-1/2" onClick={signIn}>
                Sign In
              </button>
            </div>
          </div>
          <p className="mt-5">Scroll Down for more!</p>
        </div>
      </div>
    </div>
  );
}
