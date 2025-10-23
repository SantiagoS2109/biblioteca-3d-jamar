import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const getSupabaseServer = () => {
  const cookieStore = cookies();
  const supabaseUrl = "https://xadmunjbkvgnhlswupdv.supabase.co";

  return createClient(supabaseUrl, process.env.SUPABASE_KEY, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};
