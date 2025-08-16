import { cookies } from "next/headers";
import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// export const createServerSupabase = () =>
//   createServerComponentClient({ cookies });

export const createRouteSupabase = (cookieStore) =>
  createRouteHandlerClient({ cookies: () => cookieStore });
