"use client";
import { supabase } from "@/lib/supabaseClient";

// CREATE
export async function addWord({
  sourceText,
  targetLang,
  translationText,
  note,
}) {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("words")
    .insert([
      {
        source_lang: "EN",
        target_lang: targetLang,
        source_text: sourceText,
        translation_text: translationText,
        note: note || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// READ
export async function listWords({ targetLang } = {}) {
  const q = supabase
    .from("words")
    .select("*")
    .order("created_at", { ascending: false });
  if (targetLang) q.eq("target_lang", targetLang);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

// DELETE
export async function deleteWord(id) {
  const { error } = await supabase.from("words").delete().eq("id", id);
  if (error) throw error;
}

// TRANSLATE + INSERT
export async function onAddWord({ english, targetLang, note }) {
  const r = await fetch("/ai/ai-languages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: english, source: "EN", target: targetLang }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);

  // 2) Insert into Supabase
  return addWord({
    sourceText: english,
    targetLang,
    translationText: j.text,
    note,
  });
}
