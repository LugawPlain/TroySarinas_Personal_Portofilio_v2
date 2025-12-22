# Spec: AI Chat Widget Implementation

## 1. Overview
This specification details the implementation of an interactive AI Chat Widget for the personal portfolio website. The widget will provide real-time conversational capabilities, manage persistent chat sessions, and incorporate rate-limiting to ensure optimal performance and prevent abuse. This feature aims to enhance user engagement by offering an AI assistant that can answer questions about the portfolio owner's skills, experience, and projects.

## 2. Functional Requirements

### 2.1 Real-time Conversations
- The chat widget shall provide an intuitive user interface for real-time text-based conversations.
- Users shall be able to send messages to the AI assistant.
- The AI assistant shall respond to user queries in a conversational manner.
- Typing indicators shall be displayed when the AI assistant is generating a response.
- The chat interface shall automatically scroll to the latest message.

### 2.2 Session Management
- Chat sessions shall be persistent, allowing users to continue conversations across page navigations or browser sessions.
- User chat history shall be stored locally (e.g., using `localStorage`).
- Users shall be able to restart a conversation at any time, clearing the current session history.

### 2.3 Rate Limiting
- The chat system shall implement rate limiting to prevent excessive message requests from a single user or session.
- A message cooldown period shall be enforced between consecutive user messages.
- A session limit shall be enforced, restricting the total number of messages or duration of a chat session.
- Users shall receive clear feedback when rate limits are approached or exceeded.

## 3. Non-Functional Requirements

### 3.1 Performance
- The chat widget should load efficiently without significantly impacting the overall page load time.
- AI responses should be generated and displayed with minimal latency.

### 3.2 Scalability
- The backend AI service should be capable of handling multiple concurrent chat sessions.

### 3.3 Security
- The chat system shall prevent the exposure of sensitive information.
- Input validation shall be implemented to mitigate common web vulnerabilities.

### 3.4 Accessibility
- The chat widget shall be navigable using keyboard controls.
- Content within the chat widget shall be accessible to screen readers.

## 4. Technical Details

### 4.1 Frontend (Next.js, TypeScript, Tailwind CSS)
- **Components:**
    - `ChatWidget.tsx`: Main container for the chat interface.
    - `MessageDisplay.tsx`: Component to render individual messages and conversation flow.
    - `ChatInput.tsx`: Component for user message input.
    - `RestartButton.tsx`: Component to initiate a new chat session.
- **State Management:** Utilize React's `useState` and `useEffect` or a context API for managing chat messages, loading states, and session data.
- **API Interaction:** Use `fetch` or `axios` to interact with the backend AI API endpoint (`/api/chat`).
- **Local Storage:** `localStorage` for persisting chat sessions.

### 4.2 Backend (Next.js API Routes)
- **API Endpoint:** `/api/chat/route.ts`
- **AI Integration:** Integrate with a large language model (LLM) to generate responses (e.g., Gemini API, OpenAI API).
- **Rate Limiting Middleware:** Implement middleware (`lib/rate-limit.ts`) to handle message cooldowns and session limits.
- **Error Handling:** Graceful error handling for API failures and invalid inputs.

### 4.3 Data Model
- **Chat Message:**
    - `id: string` (unique identifier)
    - `sender: 'user' | 'ai'`
    - `text: string`
    - `timestamp: Date`
- **Chat Session:**
    - `id: string` (unique session identifier)
    - `messages: ChatMessage[]`
    - `last_message_time: Date` (for rate limiting)
    - `message_count: number` (for rate limiting)

## 5. Open Questions
- Which specific LLM API will be used (e.g., Google Gemini, OpenAI GPT)? (Currently inferred as AI Assistant from README.md)
- What are the exact parameters for rate limiting (e.g., cooldown duration, messages per session)?
- What is the desired tone and persona for the AI assistant?
