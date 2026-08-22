"use client";

import { useState } from "react";
import { Activity, Eye, Users, BarChart3, ExternalLink } from "lucide-react";

type RoleAnalyticsData = {
  totalVisits: number;
  uniqueVisitors: number;
  totalEvents: number;
  sectionViews: Record<string, number>;
  recentEvents: Array<{
    event_name: string;
    section?: string;
    created_at: string;
  }>;
};

type Role = {
  slug?: string;
  key?: string;
  title: string;
};

export function RoleAnalytics({
  roles,
  analytics,
}: {
  roles: Role[];
  analytics: Record<string, RoleAnalyticsData>;
}) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Role Analytics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Organic visits and engagement by portfolio role, excluding generated
          gateway links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {roles.map((role) => {
          const roleKey = role.slug || role.key || role.title;
          const data = analytics[roleKey] || {
            totalVisits: 0,
            uniqueVisitors: 0,
            totalEvents: 0,
            sectionViews: {},
            recentEvents: [],
          };
          const isSelected = selectedRole === roleKey;

          return (
            <button
              key={roleKey}
              type="button"
              onClick={() => setSelectedRole(isSelected ? null : roleKey)}
              className={`text-left rounded-xl border p-5 transition-all ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "bg-background hover:border-accent/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold capitalize">{role.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    /portfolio/{roleKey}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <Metric
                  icon={<Eye className="w-3.5 h-3.5" />}
                  value={data.totalVisits}
                  label="Visits"
                />
                <Metric
                  icon={<Users className="w-3.5 h-3.5" />}
                  value={data.uniqueVisitors}
                  label="Visitors"
                />
                <Metric
                  icon={<Activity className="w-3.5 h-3.5" />}
                  value={data.totalEvents}
                  label="Events"
                />
              </div>
            </button>
          );
        })}
      </div>

      {selectedRole && (
        <RoleDetail
          role={roles.find(
            (role) => (role.slug || role.key || role.title) === selectedRole,
          )}
          data={analytics[selectedRole]}
        />
      )}
    </div>
  );
}

function RoleDetail({ role, data }: { role?: Role; data?: RoleAnalyticsData }) {
  if (!role || !data) return null;

  const sections = Object.entries(data.sectionViews).sort(
    ([, a], [, b]) => b - a,
  );

  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-accent" />
        <h3 className="font-semibold capitalize">{role.title} engagement</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Section views
          </h4>
          {sections.length > 0 ? (
            <div className="space-y-2">
              {sections.map(([section, count]) => (
                <div key={section} className="flex justify-between text-sm">
                  <span className="capitalize">
                    {section.replace(/-/g, " ")}
                  </span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No section engagement recorded yet.
            </p>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Recent events
          </h4>
          {data.recentEvents.length > 0 ? (
            <div className="space-y-2">
              {data.recentEvents.map((event, index) => (
                <div
                  key={`${event.created_at}-${index}`}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="capitalize">
                    {event.event_name.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(event.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No events recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[10px] uppercase">{label}</span>
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
