"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon, addCollection } from "@iconify/react";
import { Search, X, Check } from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  onClose: () => void;
}

/**
 * MASTER ALLOW-LIST — this is the only place icons get added or removed.
 * Nothing renders in the picker unless its slug is in here.
 *
 * Slugs are matched case-insensitively against whatever the current
 * source's collection (logos / simple-icons) actually contains, so it's
 * safe to list a slug that only exists in one of the two sources —
 * it just won't render anything on the other tab.
 *
 * If a tile shows up blank, the slug is wrong for that source — search
 * for the tool by name in that tab to find the correct slug, then swap
 * it in here.
 */
const POPULAR_CATEGORIES: Record<string, string[]> = {
  Microsoft: [
    "microsoft",
    "microsoft-icon",
    "microsoftexcel",
    "microsoftoutlook",
    "microsoftteams",
    "microsoft-teams",
    "microsoftword",
    "microsoftpowerpoint",
    "microsoftonenote",
    "microsoftonedrive",
    "microsoft-365",
    "microsoftazure",
    "microsoftsharepoint",
    "poweredbyclaude",
  ],
  Google: [
    "google",
    "google-icon",
    "googlegmail",
    "google-gmail",
    "googlecalendar",
    "google-calendar",
    "googledocs",
    "google-docs",
    "googlesheets",
    "google-sheets",
    "googleslides",
    "google-slides",
    "googledrive",
    "google-drive",
    "googlemeet",
    "google-meet",
    "googleanalytics",
    "googleads",
    "googlecloud",
    "googletagmanager",
  ],
  "Project Management": [
    "notion",
    "notion-icon",
    "asana",
    "asana-icon",
    "trello",
    "trello-icon",
    "mondaydotcom",
    "monday-icon",
    "airtable",
    "airtable-icon",
    "clickup",
    "clickup-icon",
    "jira",
    "linear",
    "basecamp",
    "wrike",
    "smartsheet",
    "todoist",
  ],
  Communication: [
    "slack",
    "slack-icon",
    "zoom",
    "zoom-icon",
    "discord",
    "discord-icon",
    "telegram",
    "telegram-icon",
    "whatsapp",
    "whatsapp-icon",
    "googlemeet",
    "calendly",
    "loom",
    "cal-dot-com",
    "webex",
    "gotomeeting",
    "ringcentral",
  ],
  "CRM & Sales": [
    "salesforce",
    "salesforce-icon",
    "hubspot",
    "hubspot-icon",
    "pipedrive",
    "zoho",
    "zohocrm",
    "freshworks",
    "gohighlevel",
    "close",
    "copper",
    "keap",
    "activecampaign",
    "intercom",
    "zendesk",
    "drift",
  ],
  "Marketing & Email": [
    "mailchimp",
    "mailchimp-icon",
    "constantcontact",
    "klaviyo",
    "convertkit",
    "sendgrid",
    "hootsuite",
    "buffer",
    "sproutsocial",
    "semrush",
    "ahrefs",
    "surveymonkey",
    "typeform",
  ],
  Automation: [
    "zapier",
    "zapier-icon",
    "make",
    "n8n",
    "ifttt",
    "workato",
    "integromat",
  ],
  "Design & AI": [
    "figma",
    "figma-icon",
    "canva",
    "canva-icon",
    "adobe",
    "adobephotoshop",
    "adobeillustrator",
    "adobexd",
    "sketch",
    "invision",
    "framer",
    "openai",
    "openai-icon",
    "claude",
    "anthropic",
    "googlegemini",
    "midjourney",
    "elevenlabs",
    "perplexity",
  ],
  "Dev & Cloud": [
    "github",
    "github-icon",
    "gitlab",
    "bitbucket",
    "docker",
    "docker-icon",
    "kubernetes",
    "vercel",
    "netlify",
    "aws",
    "amazonwebservices",
    "digitalocean",
    "cloudflare",
    "postman",
    "npm",
    "supabase",
    "firebase",
    "mongodb",
    "postgresql",
  ],
  "Payments & Finance": [
    "stripe",
    "stripe-icon",
    "paypal",
    "paypal-icon",
    "square",
    "quickbooks",
    "xero",
    "wise",
    "plaid",
    "gusto",
    "bill-dot-com",
  ],
  "E-commerce & Web": [
    "shopify",
    "shopify-icon",
    "wordpress",
    "wordpress-icon",
    "webflow",
    "squarespace",
    "wix",
    "bigcommerce",
    "woocommerce",
    "clickfunnels",
  ],
  "Storage & Docs": [
    "dropbox",
    "dropbox-icon",
    "box",
    "onedrive",
    "docusign",
    "adobeacrobatreader",
  ],
};

const CATEGORY_ICON_SETS = {
  logos: "Brand Logos",
  "simple-icons": "Simple Icons",
};

export default function IconPicker({
  value,
  onChange,
  onClose,
}: IconPickerProps) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"logos" | "simple-icons">(() =>
    value?.startsWith("simple-icons:") ? "simple-icons" : "logos",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [collections, setCollections] = useState<{
    logos: any | null;
    "simple-icons": any | null;
  }>({ logos: null, "simple-icons": null });
  const [loading, setLoading] = useState(true);

  // Lazy-load both icon sets only when the picker actually opens, instead of
  // shipping ~4,900 icons' worth of path data in the main app bundle.
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("@iconify-json/logos/icons.json"),
      import("@iconify-json/simple-icons/icons.json"),
    ]).then(([logos, simple]) => {
      if (cancelled) return;
      addCollection(logos.default as any);
      addCollection(simple.default as any);
      setCollections({ logos: logos.default, "simple-icons": simple.default });
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Every slug in POPULAR_CATEGORIES, lowercased, deduped. This is the
  // single gate everything passes through — there is no "raw library" view.
  const ALLOWED_SLUGS = useMemo(
    () =>
      new Set(
        Object.values(POPULAR_CATEGORIES)
          .flat()
          .map((s) => s.toLowerCase()),
      ),
    [],
  );

  const allIcons = useMemo(() => {
    const data = collections[source];
    if (!data) return [];
    const names = Object.keys(data.icons || {});
    return names.filter((name) => ALLOWED_SLUGS.has(name.toLowerCase()));
  }, [collections, source, ALLOWED_SLUGS]);

  const filteredIcons = useMemo(() => {
    let list = allIcons;

    if (selectedCategory) {
      const categoryIcons = new Set(
        POPULAR_CATEGORIES[selectedCategory]?.map((n) => n.toLowerCase()) || [],
      );
      list = list.filter((name) => categoryIcons.has(name.toLowerCase()));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((name) => name.toLowerCase().includes(q));
    }

    return list;
  }, [allIcons, query, selectedCategory]);

  const handleSelect = (name: string) => {
    onChange(`${source}:${name}`);
    onClose();
  };

  const currentName = value.includes(":") ? value.split(":")[1] : value;
  const currentSource = value.includes(":") ? value.split(":")[0] : "logos";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-lg font-bold">Choose Tool Icon</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Software & SaaS tool logos only
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source tabs */}
        <div className="flex border-b">
          {(
            Object.keys(CATEGORY_ICON_SETS) as Array<
              keyof typeof CATEGORY_ICON_SETS
            >
          ).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSource(key);
                setSelectedCategory(null);
              }}
              className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                source === key
                  ? "bg-accent/10 text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {CATEGORY_ICON_SETS[key]}
            </button>
          ))}
        </div>

        {/* Search + Categories */}
        <div className="p-4 border-b space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCategory(null);
              }}
              placeholder="Search tools..."
              className="w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setQuery("");
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === null && !query
                  ? "bg-accent text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {Object.keys(POPULAR_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setQuery("");
                }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Loading icons…
            </div>
          ) : filteredIcons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No tools found. Try the other tab, or add this tool's slug to the
              allow-list.
            </div>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {filteredIcons.map((name) => {
                const fullName = `${source}:${name}`;
                const isSelected =
                  currentSource === source && currentName === name;
                return (
                  <button
                    key={fullName}
                    type="button"
                    onClick={() => handleSelect(name)}
                    title={name}
                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 p-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-accent bg-accent/10 ring-1 ring-accent"
                        : "bg-background border-border hover:border-accent/50 hover:bg-muted/50"
                    }`}
                  >
                    <Icon icon={fullName} width={24} height={24} />
                    <span className="text-[9px] text-center leading-tight line-clamp-2 break-all text-muted-foreground">
                      {name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Selected:{" "}
            <span className="font-mono text-foreground">{value || "none"}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-muted rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
