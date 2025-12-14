import { redirect } from "next/navigation";
import { getSupabaseServer } from "../../lib/supabase/server";

export default async function AuthPage() {
  const supabase = getSupabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Session data:", session);

  if (session) {
    redirect("/");
  } else {
    redirect("/auth/login");
  }

  return;
}
