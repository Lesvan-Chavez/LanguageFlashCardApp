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
          <div style={{ padding: 20 }}>
            <h2>Get Started</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signIn}>Sign In</button>
          </div>
          <p>Scroll Down for more!</p>
        </div>
      </div>
    </div>
  );
}
