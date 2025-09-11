'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import FlashcardContainer from '@/app/components/card_components/flashcard-container';

export default function Dashboard() {
  const [ready, setReady] = useState(false); 
  const [user, setUser] = useState(null);    
  const [profile, setProfile] = useState(null); 
  const router = useRouter();

  // 1) Session gate + auth subscription
  useEffect(() => {
    let ignore = false;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!ignore && !session) {
        router.replace('/pages/signin');
        return;
      }

      if (!ignore && session) {
        setUser(session.user);
        setReady(true);
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (ignore) return;
      if (!session) {
        router.replace('/signin');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [router]);

  // 2) Ensure we have a profile row with username
  useEffect(() => {
    if (!user) return;
    let active = true;

    (async () => {
      // Try to read existing profile
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      // If profile exists, use it
      if (!error && data && active) {
        setProfile(data);
        return;
      }

      // If it doesn't exist yet, create one from user metadata (if available)
      const noRow = status === 406 || (error && /0 rows/.test(error.message || ''));
      if (noRow) {
        const uname = user.user_metadata?.username?.trim();
        if (uname) {
          const { error: upsertErr } = await supabase
            .from('profiles')
            .upsert({ id: user.id, username: uname }, { onConflict: 'id' });

          if (!upsertErr && active) {
            setProfile({ username: uname });
            return;
          }
        }
      }
      if (active && !profile) {
        setProfile(null);
      }
    })();

    return () => { active = false; };
  }, [user]);

  const displayName = profile?.username ?? '…';

  if (!ready) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center">
        Welcome to your dashboard, {displayName}
      </h1>
      <FlashcardContainer />
    </div>
  );
}
