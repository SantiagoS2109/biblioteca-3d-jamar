import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xadmunjbkvgnhlswupdv.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey || "");

export const supabaseServer =
  typeof process !== "undefined" && process.env.SUPABASE_KEY
    ? createClient(supabaseUrl, process.env.SUPABASE_KEY)
    : null;
