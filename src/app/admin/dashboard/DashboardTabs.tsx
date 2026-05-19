"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Layout,
  Link2,
  TrendingUp,
  ShieldCheck,
  MousePointer2,
  Activity,
} from "lucide-react";
import { PortfolioContentManager } from "./PortfolioManager";
import {
  LinkGeneratorForm,
  LinkActions,
  InteractionFeed,
} from "./DashboardComponents";
import { LinkAnalyticsModal } from "./LinkAnalyticsModal";

type TabId = "overview" | "content" | "links";

interface DashboardTabsProps {
  links: any[];
  linkResumesMap: Map<string, any>;
  resumes: any[];
  roles: any[];
  technologies: any[];
  experience: any[];
  roleTech: any[];
  roleExp: any[];
  roleEducation: any[];
  roleCert: any[];
  roleProj: any[];
  roleBlog: any[];
  projects: any[];
  blogs: any[];
  education: any[];
  certifications: any[];
  stats: {
    totalLinks: number;
    totalVisits: number;
    activeRoles: number;
  };
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "content", label: "Content Manager", icon: <Layout className="w-4 h-4" /> },
  { id: "links", label: "Gateway Links", icon: <Link2 className="w-4 h-4" /> },
];

export function DashboardTabs(props: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Full control over your camouflage links and role-specific content.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Gateway Protocol Active
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="flex items-center gap-1 border-b bg-muted/20 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3.5 border-b-2 transition-all duration-200 text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-accent text-accent bg-accent/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "overview" && <OverviewTab {...props} />}
          {activeTab === "content" && <ContentTab {...props} />}
          {activeTab === "links" && <LinksTab {...props} />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ stats }: DashboardTabsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Links"
          value={stats.totalLinks}
          icon={<Link2 className="w-5 h-5 text-accent" />}
          description="Generated camouflage links"
        />
        <StatCard
          title="Total Visits"
          value={stats.totalVisits}
          icon={<MousePointer2 className="w-5 h-5 text-blue-500" />}
          description="Total clicks across all links"
        />
        <StatCard
          title="Active Roles"
          value={stats.activeRoles}
          icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
          description="Configured portfolio variants"
        />
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-accent" />
          Recent Activity
        </h3>
        <InteractionFeed />
      </div>
    </div>
  );
}

function ContentTab(props: DashboardTabsProps) {
  return (
    <PortfolioContentManager
      roles={props.roles}
      technologies={props.technologies}
      experience={props.experience}
      projects={props.projects}
      blogs={props.blogs}
      education={props.education}
      certifications={props.certifications}
      resumes={props.resumes}
      roleTech={props.roleTech}
      roleExp={props.roleExp}
      roleEducation={props.roleEducation}
      roleCert={props.roleCert}
      roleProj={props.roleProj}
      roleBlog={props.roleBlog}
    />
  );
}

function LinksTab({
  links,
  linkResumesMap,
  roles,
}: DashboardTabsProps) {
  const [analyticsLink, setAnalyticsLink] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <LinkGeneratorForm roles={roles} />
        </div>

        <div className="lg:col-span-3">
          <div className="bg-background rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Gateway Links</h2>
              <span className="text-xs text-muted-foreground">
                {links.length} link{links.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                <thead className="bg-muted/50 text-xs uppercase font-medium text-muted-foreground border-b">
                  <tr>
                    <th className="px-6 py-4">Label & Version</th>
                    <th className="px-6 py-4">Target Role</th>
                    <th className="px-6 py-4 text-center">Clicks</th>
                    <th className="px-6 py-4">Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {links.length > 0 ? (
                    links.map((link) => (
                      <tr
                        key={link.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm">
                            {link.label || "Untitled"}
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                            ver={link.version_slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 capitalize">
                            {link.target_role.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`text-sm font-bold ${link.gateway_visits?.[0]?.count > 0 ? "text-foreground" : "text-muted-foreground opacity-50"}`}
                          >
                            {link.gateway_visits?.[0]?.count || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">
                          {new Date(link.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setAnalyticsLink(link)}
                              className="p-2 hover:bg-muted rounded-md transition-colors relative group"
                              title="View Analytics"
                            >
                              <BarChart3 className="w-4 h-4 text-muted-foreground" />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Analytics
                              </span>
                            </button>
                            <LinkActions
                              linkId={link.id}
                              verSlug={link.version_slug}
                              targetRole={link.target_role}
                              linkResume={
                                linkResumesMap.get(link.id) || null
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-20 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Link2 className="w-8 h-8 opacity-20" />
                          <p>No links generated yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {analyticsLink && (
        <LinkAnalyticsModal
          linkId={analyticsLink.id}
          linkLabel={analyticsLink.label}
          targetRole={analyticsLink.target_role}
          onClose={() => setAnalyticsLink(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="bg-background rounded-xl border p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className="p-2.5 rounded-xl bg-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all" />
      </div>
      <div className="mt-5">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <div className="text-sm font-semibold text-muted-foreground mt-1">
          {title}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
