import { createClient } from "@supabase/supabase-js";
import * as fs from 'fs';
import * as path from 'path';

// Load env vars from .env.local
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch {
  console.log('Could not load .env.local');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

async function inspect() {
  const { data, error } = await supabase.from('projects').select('*').limit(1);
  if (error) {
    fs.writeFileSync('src/lib/project_schema.json', JSON.stringify({ error }, null, 2));
  } else {
    fs.writeFileSync('src/lib/project_schema.json', JSON.stringify(data, null, 2));
  }
}

inspect();
