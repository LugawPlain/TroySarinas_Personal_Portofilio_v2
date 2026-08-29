"use server";

import { createClient } from "@/lib/supabase/server";

export async function getChatConversations(role?: string, limit = 50) {
  const supabase = await createClient();

  let query = supabase
    .from("chat_conversations")
    .select(`
      *,
      gateway_links(label, target_role)
    `)
    .order("started_at", { ascending: false })
    .limit(limit);

  if (role) {
    query = query.eq("role", role);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }

  return data || [];
}

export async function getChatMessages(conversationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data || [];
}

export async function getChatStats() {
  const supabase = await createClient();

  const [
    { count: totalConversations },
    { count: totalMessages },
    { data: conversations },
    { data: recentConversations },
  ] = await Promise.all([
    supabase
      .from("chat_conversations")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("chat_messages")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("chat_conversations")
      .select("role, message_count"),
    supabase
      .from("chat_conversations")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(5),
  ]);

  const roleCounts = (conversations || []).reduce<Record<string, { conversations: number; messages: number }>>(
    (breakdown, conversation) => {
      const role = conversation.role || "standard";
      const current = breakdown[role] || { conversations: 0, messages: 0 };
      breakdown[role] = {
        conversations: current.conversations + 1,
        messages: current.messages + (conversation.message_count || 0),
      };
      return breakdown;
    },
    {},
  );

  return {
    totalConversations: totalConversations || 0,
    totalMessages: totalMessages || 0,
    roleBreakdown: Object.entries(roleCounts)
      .map(([role, values]) => ({ role, ...values }))
      .sort((a, b) => b.conversations - a.conversations),
    recentConversations: recentConversations || [],
  };
}

export async function deleteConversation(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chat_conversations")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
