"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatContextType {
  isTypingIndicator: boolean
  setIsTypingIndicator: (typing: boolean) => void
  unreadCount: number
  setUnreadCount: (count: number) => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isTypingIndicator, setIsTypingIndicator] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  return (
    <ChatContext.Provider
      value={{
        isTypingIndicator,
        setIsTypingIndicator,
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
