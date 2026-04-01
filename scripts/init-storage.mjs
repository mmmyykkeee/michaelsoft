import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setup() {
  console.log('--- Initializing Supabase Storage ---');
  
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error('Error listing buckets:', listError);
    return;
  }

  const exists = buckets.find(b => b.name === 'thumbnails');
  
  if (exists) {
    console.log('✅ Bucket "thumbnails" already exists.');
  } else {
    console.log('Creating "thumbnails" bucket...');
    const { error: createError } = await supabase.storage.createBucket('thumbnails', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (createError) {
      console.error('Error creating bucket:', createError);
    } else {
      console.log('✅ Bucket "thumbnails" created successfully.');
    }
  }

  console.log('\n--- Checking RLS Policies ---');
  console.log('Note: To allow public uploads from the admin panel, you need to set up RLS policies in the Supabase Dashboard.');
  console.log('1. Go to Storage > Buckets > thumbnails');
  console.log('2. Click "Policies"');
  console.log('3. Add an "INSERT" policy for "anon" and "authenticated" roles (or specify as needed).');
  console.log('4. Ensure "SELECT" is public for "anon".');
}

setup();
