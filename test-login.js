require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@michaelsoft.co.ke',
    password: 'Arsenal123*'
  });
  console.log("Error:", error);
  console.log("Data session id:", data?.session?.access_token?.substring(0,10));
}
test();
