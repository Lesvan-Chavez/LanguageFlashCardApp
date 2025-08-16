export async function listWords({ targetLang } = {}) {
  const q = supabase.from("words").select("*").order("created_at", { ascending: false });
  if (targetLang) q.eq("target_lang", targetLang);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}
