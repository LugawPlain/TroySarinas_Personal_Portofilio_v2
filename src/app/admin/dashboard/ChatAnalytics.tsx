"use client";

import React, { useState, useEffect } from "react";
import {
  getChatConversations,
  getChatMessages,
  getChatStats,
  deleteConversation,
} from "./chat-actions";
import {
  MessageSquare,
  Trash2,
  Eye,
  X,
  Bot,
  User,
  BarChart3,
  Clock,
  Hash,
  UsersRound,
} from "lucide-react";
import { ProviderDiagnostics } from "./ProviderDiagnostics";

interface Conversation {
  id: string;
  session_id: string;
  role: string;
  message_count: number;
  started_at: string;
  last_activity_at: string;
  gateway_links?: { label: string; target_role: string } | null;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  created_at: string;
}

export function ChatAnalytics() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<string>("");

  useEffect(() => {
    loadData();
  }, [filterRole]);

  const loadData = async () => {
    setIsLoading(true);
    const [convData, statsData] = await Promise.all([
      getChatConversations(filterRole || undefined),
      getChatStats(),
    ]);
    setConversations(convData);
    setStats(statsData);
    setIsLoading(false);
  };

  const viewConversation = async (id: string) => {
    const msgs = await getChatMessages(id);
    setMessages(msgs);
    setSelectedConversation(id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this conversation?")) return;
    await deleteConversation(id);
    loadData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProviderDiagnostics />

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<MessageSquare className="w-5 h-5 text-accent" />}
            value={stats.totalConversations}
            label="Total Conversations"
          />
          <StatCard
            icon={<Hash className="w-5 h-5 text-blue-500" />}
            value={stats.totalMessages}
            label="Total Messages"
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-green-500" />}
            value={stats.totalConversations > 0 ? (stats.totalMessages / stats.totalConversations).toFixed(1) : "0"}
            label="Avg Messages/Chat"
          />
        </div>
      )}

      {stats?.roleBreakdown?.length > 0 && (
        <div className="rounded-xl border bg-background p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <UsersRound className="w-4 h-4 text-accent" />
                Conversations by role
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Where visitors are asking for help.</p>
            </div>
            <span className="text-xs text-muted-foreground">{stats.totalConversations} total</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stats.roleBreakdown.map((item: { role: string; conversations: number; messages: number }) => {
              const percentage = stats.totalConversations
                ? Math.round((item.conversations / stats.totalConversations) * 100)
                : 0;
              return (
                <div key={item.role} className="rounded-lg border bg-muted/20 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium capitalize">{item.role.replace(/-/g, " ")}</span>
                    <span className="font-bold tabular-nums">{item.conversations} / {percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${percentage}%` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">{item.messages} messages</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border bg-muted/20">
        <label className="text-sm font-medium" htmlFor="chat-role-filter">
          Filter by role
        </label>
        <select
          id="chat-role-filter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-background text-sm"
        >
          <option value="">All Roles</option>
          <option value="software-engineer">Software Engineer</option>
          <option value="gtm-engineer">GTM Engineer</option>
          <option value="ecommerce-developer">E-Commerce Developer</option>
          <option value="standard">Standard</option>
        </select>
        <span className="text-sm text-muted-foreground sm:ml-auto">
          {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Conversations Table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="md:hidden divide-y">
          {conversations.length > 0 ? conversations.map((conv) => (
            <div key={conv.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold capitalize">{conv.role.replace(/-/g, " ")}</span>
                  <p className="text-xs text-muted-foreground mt-1">{conv.gateway_links?.label || "Organic"}</p>
                </div>
                <span className="text-xs text-muted-foreground">{conv.message_count} messages</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{new Date(conv.started_at).toLocaleString()}</span>
                <div className="flex gap-2">
                  <button onClick={() => viewConversation(conv.id)} className="p-2 hover:bg-muted rounded-md" title="View Messages"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(conv.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-md" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          )) : <p className="p-8 text-center text-sm text-muted-foreground">No conversations yet.</p>}
        </div>
        <div className="hidden md:block overflow-x-auto max-h-[28rem] overflow-y-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-xs uppercase font-medium text-muted-foreground border-b">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Messages</th>
              <th className="px-4 py-3">Started</th>
              <th className="px-4 py-3">Link</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent capitalize">
                      {conv.role.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{conv.message_count}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(conv.started_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {conv.gateway_links?.label || "Organic"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => viewConversation(conv.id)}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title="View Messages"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(conv.id)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-8 h-8 opacity-20" />
                    <p>No conversations yet.</p>
                    <p className="text-xs opacity-50">Conversations from tracked visitors will appear here.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Message Viewer Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border shadow-2xl rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-muted/30">
              <h3 className="font-bold">Conversation</h3>
              <button
                onClick={() => setSelectedConversation(null)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {msg.sender === "user" ? (
                        <>
                          <User className="w-3 h-3" />
                          <span className="text-[10px] font-bold">Visitor</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-3 h-3" />
                          <span className="text-[10px] font-bold">AI</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                    <div className="text-[10px] opacity-50 mt-1">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number | string; label: string }) {
  return (
    <div className="bg-background rounded-xl border p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
