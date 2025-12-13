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

async function debugSlugs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug, title');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Blog slugs:');
    data.forEach((post: any) => {
      console.log('Slug:', post.slug);
      console.log('  Type:', typeof post.slug);
      console.log('  Is string?', typeof post.slug === 'string');
      console.log('  Value:', JSON.stringify(post.slug));
      console.log('  Title:', post.title);
      console.log('---');
    });
  }
}

debugSlugs();
