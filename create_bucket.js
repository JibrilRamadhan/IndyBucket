import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Helper to manually parse .env values
function loadEnv() {
  const env: Record<string, string> = {};
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = match[2] || '';
          if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
          if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
          env[key] = val.trim();
        }
      }
    }
  } catch (e) {
    // Ignore reading errors
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = env['VITE_SUPABASE_URL'] || process.env.VITE_SUPABASE_URL;
const supabaseSecret = env['SUPABASE_SECRET'] || process.env.SUPABASE_SECRET;

if (!supabaseUrl || !supabaseSecret) {
  console.error('Error: VITE_SUPABASE_URL and SUPABASE_SECRET must be configured in your environment or .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecret, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error } = await supabase.storage.createBucket('products', {
    public: true,
    fileSizeLimit: 52428800, // 50MB
  });

  if (error && error.message !== 'The resource already exists') {
    console.error('Error creating bucket:', error.message);
  } else {
    console.log('Bucket "products" is ready!');
  }
}

run();
