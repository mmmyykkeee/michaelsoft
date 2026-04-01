const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function main() {
  console.log("Creating user...");
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@michaelsoft.co.ke',
    password: 'Arsenal123*',
    email_confirm: true
  });

  if (error) {
    console.error("Error creating user:", error);
  } else {
    console.log("User created successfully:", data);
  }
}

main();
