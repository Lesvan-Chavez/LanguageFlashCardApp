'use client'

import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FlashcardContainer from "../components/flashcard-container";
// import DeckPicker from "../components/deck-picker";
// import LanguagePicker from "../components/language-picker";


export default function Dashboard() {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
  if (!session) return <p>Redirecting...</p>;

  return (
    <div>
      <h1>Welcome to your dashboard,{session.user.email}</h1>
      <FlashcardContainer />
      {/* <DeckPicker />
      <LanguagePicker /> */}
    </div>
  );
}

