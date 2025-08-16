export async function deleteWord(id) {
  const { error } = await supabase.from("words").delete().eq("id", id);
  if (error) throw error;
}
