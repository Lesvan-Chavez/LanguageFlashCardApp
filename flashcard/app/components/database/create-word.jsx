import { supabase } from "@/lib/supabaseClient";

export async function addWord({ sourceText, targetLang, translationText, note }) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("words")
    .insert([{
      user_id: user.id,             // policy checks this === auth.uid()
      source_lang: "EN",
      target_lang: targetLang,       // e.g., "ES" or "EN-US"
      source_text: sourceText,
      translation_text: translationText,
      note: note || null,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
