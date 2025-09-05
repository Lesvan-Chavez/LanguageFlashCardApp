'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import FlashcardContainer from '../components/card_components/flashcard-container';

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  // 1) Session gate + auth subscription
  useEffect(() => {
    let ignore = false;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!ignore && !session) {
        router.replace('/');
        return;
      }

      if (!ignore && session) {
        setUser(session.user);
        setReady(true);
      }
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (ignore) return;
      if (!session) {
        router.replace('/');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [router]);

  // 2) Load profile after we know the user
  useEffect(() => {
    if (!user) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (!error && active) setProfile(data);
    })();

    return () => {
      active = false;
    };
  }, [user]);

  if (!ready) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome to your dashboard
        {profile?.username ? `, ${profile.username}` : user?.email ? `, ${user.email}` : ''}.
      </h1>
      <FlashcardContainer />
    </div>
  );
}
