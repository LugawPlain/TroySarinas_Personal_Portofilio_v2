import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv(path) {
  const env = {};
  try {
    const content = readFileSync(path, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      env[key] = value;
    }
  } catch (err) {
    console.error('Failed to read env file:', err.message);
    process.exit(1);
  }
  return env;
}

const env = loadEnv(resolve('.env.local'));

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const vaSkills = [
  // Project Management
  { name: 'Notion', icon_name: 'logos:notion-icon', proficiency: 90 },
  { name: 'Asana', icon_name: 'logos:asana-icon', proficiency: 85 },
  { name: 'Trello', icon_name: 'logos:trello', proficiency: 85 },
  { name: 'Monday.com', icon_name: 'logos:monday-icon', proficiency: 80 },
  { name: 'Airtable', icon_name: 'simple-icons:airtable', proficiency: 80 },
  { name: 'ClickUp', icon_name: 'simple-icons:clickup', proficiency: 75 },
  // Productivity & Documents
  { name: 'Google Workspace', icon_name: 'logos:google-icon', proficiency: 90 },
  { name: 'Microsoft 365', icon_name: 'logos:microsoft-icon', proficiency: 85 },
  { name: 'Microsoft Excel', icon_name: 'simple-icons:microsoftexcel', proficiency: 85 },
  { name: 'Google Sheets', icon_name: 'simple-icons:googlesheets', proficiency: 85 },
  // Communication
  { name: 'Slack', icon_name: 'logos:slack-icon', proficiency: 90 },
  { name: 'Zoom', icon_name: 'logos:zoom-icon', proficiency: 85 },
  { name: 'Microsoft Teams', icon_name: 'logos:microsoft-teams', proficiency: 80 },
  { name: 'Gmail', icon_name: 'logos:google-gmail', proficiency: 90 },
  { name: 'Microsoft Outlook', icon_name: 'simple-icons:microsoftoutlook', proficiency: 80 },
  // Automation & CRM
  { name: 'Zapier', icon_name: 'logos:zapier', proficiency: 85 },
  { name: 'Make', icon_name: 'simple-icons:make', proficiency: 75 },
  { name: 'n8n', icon_name: 'simple-icons:n8n', proficiency: 70 },
  { name: 'HubSpot', icon_name: 'logos:hubspot', proficiency: 75 },
  { name: 'Salesforce', icon_name: 'logos:salesforce', proficiency: 70 },
  { name: 'Pipedrive', icon_name: 'logos:pipedrive', proficiency: 70 },
  // Content & Reports
  { name: 'Canva', icon_name: 'logos:canva-icon', proficiency: 80 },
  { name: 'ChatGPT', icon_name: 'logos:openai-icon', proficiency: 85 },
  { name: 'Claude', icon_name: 'simple-icons:claude', proficiency: 80 },
  { name: 'Looker Studio', icon_name: 'logos:google-looker', proficiency: 75 },
];

async function main() {
  const { data: role, error: roleError } = await supabase
    .from('job_roles')
    .select('id, slug')
    .eq('slug', 'virtual-assistant')
    .single();

  if (roleError || !role) {
    console.error('Could not find virtual-assistant role:', roleError?.message);
    process.exit(1);
  }

  console.log(`Found role: ${role.slug} (${role.id})`);

  const { data: existingTech, error: techError } = await supabase
    .from('technologies')
    .select('id, name');

  if (techError) {
    console.error('Could not fetch technologies:', techError.message);
    process.exit(1);
  }

  const existingNames = new Set(existingTech.map(t => t.name.toLowerCase()));
  const existingByName = new Map(existingTech.map(t => [t.name.toLowerCase(), t.id]));

  const { data: existingLinks, error: linkError } = await supabase
    .from('role_technologies')
    .select('tech_id')
    .eq('role_id', role.id);

  if (linkError) {
    console.error('Could not fetch role links:', linkError.message);
    process.exit(1);
  }

  const linkedTechIds = new Set(existingLinks.map(l => l.tech_id));

  for (const skill of vaSkills) {
    let techId;

    if (existingNames.has(skill.name.toLowerCase())) {
      techId = existingByName.get(skill.name.toLowerCase());
      console.log(`Exists: ${skill.name}`);
      // Update icon_name and proficiency to keep records in sync
      const { error: updateError } = await supabase
        .from('technologies')
        .update({ icon_name: skill.icon_name, proficiency: skill.proficiency })
        .eq('id', techId);
      if (updateError) {
        console.error(`Failed to update ${skill.name}:`, updateError.message);
      } else {
        console.log(`Updated: ${skill.name}`);
      }
    } else {
      const { data: newTech, error: insertError } = await supabase
        .from('technologies')
        .insert({
          name: skill.name,
          icon_name: skill.icon_name,
          proficiency: skill.proficiency,
        })
        .select('id')
        .single();

      if (insertError) {
        console.error(`Failed to insert ${skill.name}:`, insertError.message);
        continue;
      }

      techId = newTech.id;
      console.log(`Added: ${skill.name}`);
    }

    if (!linkedTechIds.has(techId)) {
      const { error: linkInsertError } = await supabase
        .from('role_technologies')
        .insert({ role_id: role.id, tech_id: techId });

      if (linkInsertError) {
        console.error(`Failed to link ${skill.name}:`, linkInsertError.message);
      } else {
        console.log(`Linked: ${skill.name}`);
      }
    } else {
      console.log(`Already linked: ${skill.name}`);
    }
  }

  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
