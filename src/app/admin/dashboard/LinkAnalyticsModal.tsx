"use client";

import { useState, useEffect } from "react";
import { getLinkAnalytics } from "./actions";
import {
  X,
  BarChart3,
  Eye,
  Users,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  Activity,
  MousePointer2,
  TrendingUp,
  Globe,
  Loader2,
} from "lucide-react";

interface LinkAnalyticsModalProps {
  linkId: string;
  linkLabel: string;
  targetRole: string;
  onClose: () => void;
}

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  visitsByDay: Record<string, number>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
    unknown: number;
  };
  browserBreakdown: Record<string, number>;
  sectionViews: Record<string, number>;
  eventTypes: Record<string, number>;
  hourlyDistribution: number[];
  recentEvents: any[];
  recentVisits: any[];
}

export function LinkAnalyticsModal({
  linkId,
  linkLabel,
  targetRole,
  onClose,
}: LinkAnalyticsModalProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [linkId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const data = await getLinkAnalytics(linkId);
    setAnalytics(data as AnalyticsData | null);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b flex items-center justify-between bg-muted/30">
            <h2 className="text-xl font-bold">Link Analytics</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-12 text-center text-muted-foreground">
            Failed to load analytics.
          </div>
        </div>
      </div>
    );
  }

  const {
    totalVisits,
    uniqueVisitors,
    visitsByDay,
    deviceBreakdown,
    browserBreakdown,
    sectionViews,
    eventTypes,
    hourlyDistribution,
    recentEvents,
  } = analytics;

  const dayValues = Object.values(visitsByDay) as number[];
  const maxDayVisits = Math.max(...dayValues, 1);
  const maxHourVisits = Math.max(...hourlyDistribution, 1);
  const sectionViewValues = Object.values(sectionViews) as number[];
  const totalSectionViews = sectionViewValues.reduce((a, b) => a + b, 0);
  const eventTypeValues = Object.values(eventTypes) as number[];
  const totalEvents = eventTypeValues.reduce((a, b) => a + b, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card border shadow-2xl rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-muted/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold">Link Analytics</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {linkLabel || "Untitled Link"} {" "}
              <span className="text-accent font-medium capitalize">
                • {targetRole.replace("-", " ")}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Eye className="w-5 h-5 text-blue-500" />}
              label="Total Visits"
              value={totalVisits}
            />
            <StatCard
              icon={<Users className="w-5 h-5 text-green-500" />}
              label="Unique Visitors"
              value={uniqueVisitors}
            />
            <StatCard
              icon={<MousePointer2 className="w-5 h-5 text-purple-500" />}
              label="Interactions"
              value={totalEvents}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5 text-orange-500" />}
              label="Section Views"
              value={totalSectionViews}
            />
          </div>

          {/* Visit Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Visit Timeline (Last 30 Days)
            </h3>
            <div className="bg-muted/30 rounded-xl p-4 border">
              <div className="flex items-end gap-1 h-40">
                {Object.entries(visitsByDay).map(([day, count]) => {
                  const countNum = count as number;
                  return (
                    <div
                      key={day}
                      className="flex-1 flex flex-col items-center gap-1 group relative"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {day}: {countNum} visits
                      </div>
                      <div
                        className="w-full bg-accent/20 hover:bg-accent/40 rounded-t transition-all duration-300"
                        style={{
                          height: `${(countNum / maxDayVisits) * 100}%`,
                          minHeight: countNum > 0 ? "4px" : "0",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>{Object.keys(visitsByDay)[0]}</span>
                <span>{Object.keys(visitsByDay)[Object.keys(visitsByDay).length - 1]}</span>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Device Breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Device Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(deviceBreakdown).map(([device, count]) => {
                  const countNum = count as number;
                  if (countNum === 0) return null;
                  const pct = totalVisits > 0 ? (countNum / totalVisits) * 100 : 0;
                  return (
                    <div key={device} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2 capitalize">
                          {device === "desktop" && <Monitor className="w-4 h-4" />}
                          {device === "mobile" && <Smartphone className="w-4 h-4" />}
                          {device === "tablet" && <Tablet className="w-4 h-4" />}
                          {device === "unknown" && <Globe className="w-4 h-4" />}
                          {device}
                        </span>
                        <span className="font-bold">
                          {countNum} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browser Breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Browser Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(browserBreakdown).map(([browser, count]) => {
                  const countNum = count as number;
                  const pct =
                    totalVisits > 0 ? (countNum / totalVisits) * 100 : 0;
                  return (
                    <div key={browser} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{browser}</span>
                        <span className="font-bold">
                          {countNum} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hourly Distribution */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Visits by Hour of Day
            </h3>
            <div className="bg-muted/30 rounded-xl p-4 border">
              <div className="flex items-end gap-1 h-32">
                {hourlyDistribution.map((count, hour) => (
                  <div
                    key={hour}
                    className="flex-1 flex flex-col items-center gap-1 group relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {hour}:00 - {count} visits
                    </div>
                    <div
                      className="w-full bg-purple-500/20 hover:bg-purple-500/40 rounded-t transition-all duration-300"
                      style={{
                        height: `${(count / maxHourVisits) * 100}%`,
                        minHeight: count > 0 ? "4px" : "0",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>11 PM</span>
              </div>
            </div>
          </div>

          {/* Section Engagement */}
          {Object.keys(sectionViews).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Section Engagement
              </h3>
              <div className="space-y-3">
                {Object.entries(sectionViews)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([section, count]) => {
                    const countNum = count as number;
                    const pct =
                      totalSectionViews > 0
                        ? (countNum / totalSectionViews) * 100
                        : 0;
                    return (
                      <div key={section} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium capitalize">
                            {section.replace(/-/g, " ")}
                          </span>
                          <span className="font-bold">
                            {countNum} views ({pct.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Event Types */}
          {Object.keys(eventTypes).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Event Breakdown
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(eventTypes).map(([event, count]) => {
                  const countNum = count as number;
                  return (
                    <div
                      key={event}
                      className="bg-muted/30 rounded-lg p-3 border"
                    >
                      <div className="text-2xl font-bold">{countNum}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {event.replace(/_/g, " ")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Events
            </h3>
            <div className="space-y-2">
              {recentEvents.length > 0 ? (
                recentEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          event.event_name === "section_view"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      />
                      <span className="font-medium capitalize">
                        {event.event_name.replace(/_/g, " ")}
                      </span>
                      {event.section && (
                        <span className="text-xs text-muted-foreground capitalize">
                          • {event.section.replace(/-/g, " ")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No events recorded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-muted/30 rounded-xl border p-4 flex items-center gap-3">
      <div className="p-2 bg-background rounded-lg">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
