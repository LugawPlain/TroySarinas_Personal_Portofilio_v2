"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "@/components/DynamicIcon";
import { Icon, addCollection } from "@iconify/react";
import mdiData from "@iconify-json/mdi/icons.json";

let mdiCollectionAdded = false;

function loadMDICollection() {
  if (mdiCollectionAdded) return;
  addCollection(mdiData as any);
  mdiCollectionAdded = true;
}

interface TechItem {
  name: string;
  icon_name?: string;
  icon_url?: string;
  proficiency: number;
}

interface VATechnologiesProps {
  initialTech: TechItem[];
}

interface Tool {
  name: string;
  icon: string;
  icon_url?: string;
}

interface ToolCategory {
  icon: string;
  title: string;
  tools: Tool[];
}

const iconifyMap: Record<string, string> = {
  Notion: "logos:notion-icon",
  Asana: "logos:asana-icon",
  Trello: "logos:trello",
  "Monday.com": "logos:monday-icon",
  Airtable: "simple-icons:airtable",
  ClickUp: "simple-icons:clickup",
  "Google Workspace": "logos:google-icon",
  Gmail: "logos:google-gmail",
  "Google Calendar": "logos:google-calendar",
  "Google Docs": "simple-icons:googledocs",
  "Google Sheets": "simple-icons:googlesheets",
  "Google Slides": "simple-icons:googleslides",
  "Microsoft 365": "logos:microsoft-icon",
  "Microsoft Excel": "simple-icons:microsoftexcel",
  "Microsoft PowerPoint": "simple-icons:microsoftpowerpoint",
  "Microsoft OneNote": "simple-icons:microsoftonenote",
  "Microsoft Outlook": "simple-icons:microsoftoutlook",
  OneDrive: "logos:microsoft-onedrive",
  Canva: "logos:canva-icon",
  ChatGPT: "logos:openai-icon",
  Claude: "simple-icons:claude",
  "Google Gemini": "logos:google-gemini",
  Salesforce: "logos:salesforce",
  HubSpot: "logos:hubspot",
  Slack: "logos:slack-icon",
  Zoom: "logos:zoom-icon",
  "Microsoft Teams": "logos:microsoft-teams",
  RingCentral: "simple-icons:ringcentral",
  Facebook: "logos:facebook",
  Instagram: "logos:instagram-icon",
  LinkedIn: "logos:linkedin-icon",
  Zapier: "logos:zapier",
  Make: "simple-icons:make",
  n8n: "simple-icons:n8n",
  "Looker Studio": "logos:google-looker",
};

const categoryOrder = [
  { icon: "mdi:file-document", title: "Productivity & Documents" },
  { icon: "mdi:account-multiple", title: "Project Management" },
  { icon: "mdi:message-text", title: "Communication & Call Tools" },
  { icon: "mdi:chart-bar", title: "CRM & Business Tools" },
  { icon: "mdi:lightning-bolt", title: "Automation" },
  { icon: "mdi:palette", title: "Design & Content Creation" },
];

const categoryKeywords: Record<string, string[]> = {
  "Project Management": ["notion", "asana", "trello", "monday", "airtable", "clickup"],
  "Productivity & Documents": [
    "google workspace", "microsoft 365", "excel", "sheets", "docs", "slides",
    "gmail", "outlook", "onenote", "onedrive", "google calendar",
  ],
  "Communication & Call Tools": ["slack", "zoom", "teams", "ringcentral"],
  "CRM & Business Tools": ["salesforce", "hubspot", "pipedrive", "looker studio"],
  Automation: ["zapier", "make", "n8n"],
  "Design & Content Creation": ["canva", "chatgpt", "claude", "gemini"],
};

function resolveIcon(name: string, icon_name?: string, icon_url?: string): { icon: string; icon_url?: string } {
  if (icon_url) return { icon: "", icon_url };
  if (icon_name) return { icon: icon_name };
  if (iconifyMap[name]) return { icon: iconifyMap[name] };
  const normalized = name.toLowerCase();
  for (const [key, icon] of Object.entries(iconifyMap)) {
    if (normalized.includes(key.toLowerCase())) return { icon };
  }
  return { icon: "lucide:box" };
}

function categorizeTools(tech: TechItem[]): ToolCategory[] {
  const buckets: Record<string, Tool[]> = {};

  for (const item of tech) {
    const normalized = item.name.toLowerCase();
    let matched = false;
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((kw) => normalized.includes(kw))) {
        buckets[cat] = buckets[cat] || [];
        const resolved = resolveIcon(item.name, item.icon_name, item.icon_url);
        buckets[cat].push({ name: item.name, ...resolved });
        matched = true;
        break;
      }
    }
    if (!matched) {
      buckets["Other Tools"] = buckets["Other Tools"] || [];
      const resolved = resolveIcon(item.name, item.icon_name, item.icon_url);
      buckets["Other Tools"].push({ name: item.name, ...resolved });
    }
  }

  const result: ToolCategory[] = [];
  for (const { icon, title } of categoryOrder) {
    if (buckets[title]?.length) {
      result.push({ icon, title, tools: buckets[title] });
    }
  }
  if (buckets["Other Tools"]?.length) {
    result.push({ icon: "mdi:cpu-64-bit", title: "Other Tools", tools: buckets["Other Tools"] });
  }
  return result;
}

const valueProps = [
  { icon: "mdi:target", title: "Efficient", desc: "Smart tools, better results." },
  { icon: "mdi:shield-check", title: "Reliable", desc: "You can count on me." },
  { icon: "mdi:trending-up", title: "Impactful", desc: "Focused on helping your business grow." },
];

const VATechnologies = ({ initialTech }: VATechnologiesProps) => {
  useEffect(() => {
    loadMDICollection();
  }, []);

  const toolCategories = categorizeTools(initialTech);

  return (
    <section
      id="technologies"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-[#f0fdfa] to-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0d9488]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#14b8a6]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[85rem] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-[#0d9488]/20 shadow-sm">
            <Icon icon="mdi:lightning-bolt" className="w-4 h-4 text-[#0d9488]" />
            <span className="text-sm font-bold text-[#0d9488] uppercase tracking-widest">My Toolkit</span>
          </div>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 font-fraunces mb-6 leading-[1.1]">
            Skills &{" "}
            <span className="bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#0f766e] bg-clip-text text-transparent">
              Tools I Use
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            I leverage the right tools and technology to stay organized, communicate effectively, 
            and deliver high-quality support.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-lg shadow-[#0d9488]/5 hover:shadow-2xl hover:shadow-[#0d9488]/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500" />

              <div className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center shadow-lg">
                    <Icon icon={category.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] rounded-full mt-2" />
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-4">
                  {category.tools.map((tool, i) => (
                    <motion.div
                      key={`${category.title}-${tool.name}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 + i * 0.03 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#f0fdfa] hover:bg-[#ccfbf1]/50 border border-transparent hover:border-[#0d9488]/20 transition-all duration-300 min-w-[84px]"
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        <DynamicIcon
                          name={tool.icon}
                          iconUrl={tool.icon_url}
                          size={28}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 text-center">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 p-6 sm:p-8 shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #2dd4bf 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center shadow-lg shrink-0">
                  <Icon icon="mdi:lightning-bolt" className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
                  I adapt quickly, learn continuously, and use the best tools to support businesses,{" "}
                  <span className="text-[#2dd4bf] font-bold">save time</span>
                  , and create{" "}
                  <span className="text-[#2dd4bf] font-bold">great experiences</span>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {valueProps.map((prop) => (
                  <div key={prop.title} className="text-center">
                    <Icon icon={prop.icon} className="w-6 h-6 text-[#2dd4bf] mx-auto mb-2" />
                    <h4 className="text-white font-bold text-sm">{prop.title}</h4>
                    <p className="text-slate-400 text-xs mt-1">{prop.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VATechnologies;
