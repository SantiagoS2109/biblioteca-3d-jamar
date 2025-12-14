// import { createClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";

// export const getSupabaseServer = () => {
//   const cookieStore = cookies();
//   const supabaseUrl = "https://xadmunjbkvgnhlswupdv.supabase.co";

//   return createClient(supabaseUrl, process.env.SUPABASE_KEY, {
//     cookies: {
//       get(name) {
//         return cookieStore.get(name)?.value;
//       },
//     },
//   });
// };

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const getSupabaseServer = () => {
  const cookieStore = cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
