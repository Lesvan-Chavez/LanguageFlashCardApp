import { supabase } from "@/lib/supabaseClient";

export async function upsertOwnProfileFromSession() {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) return { error: userErr || new Error("No user") };

  const uname = user.user_metadata?.username || "";

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, username: uname }, { onConflict: "id" });

  return { error };
}
