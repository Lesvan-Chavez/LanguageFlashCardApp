'use client'

import { useAuth } from "../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard() {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);
  if (!session) return <p>Redirecting...</p>;
  return <h1>Welcome to your dashboard, 
{session.user.email}</h1>;
}