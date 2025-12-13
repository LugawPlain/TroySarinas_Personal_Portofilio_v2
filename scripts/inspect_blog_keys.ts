import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) process.env[key] = value;
        }
      });
    }
  } catch (e) {
    console.error('Failed to load .env.local', e);
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectBlog() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else {
    if (data && data.length > 0) {
        console.log('Keys:', Object.keys(data[0]));
        // Check content specifically
        console.log('Has content:', 'content' in data[0]);
        console.log('Has description:', 'description' in data[0]);
        console.log('Has excerpt:', 'excerpt' in data[0]);
        console.log('Has tags:', 'tags' in data[0]);
    } else {
        console.log('No data found in blogs table.');
    }
  }
}

inspectBlog();
