"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import { useRouter } from "next/navigation";
import FlashcardContainer from "../components/card_components/flashcard-container";

const [profile, setProfile] = useState(null);

useEffect(() => {
  let active = true;
  (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // guard already redirects if not logged in

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (!error && active) setProfile(data);
  })();
  return () => { active = false; };
}, []);



export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let ignore = false;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();

      
        router.replace("/");
        return;
      }

      if (!ignore) {
        setUser(session.user); 
        setReady(true);
      }
    }

    init();

    // Keep page in sync with auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (ignore) return;
      if (!session) {
        router.replace("/");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!ready) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome to your dashboard{user?.email ? `, ${user.email}` : ""}.
      </h1>
      <FlashcardContainer />
    </div>
  );
}

