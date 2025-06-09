"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Search, MoreVertical, Phone, Video, Info, ImageIcon, Paperclip, Smile } from "lucide-react"
import { useChat } from "@/components/chat-provider"

interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "image" | "product"
  productId?: string
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  lastSeen: string
  isOnline: boolean
  unreadCount: number
}

const mockChats: ChatUser[] = [
  {
    id: "1",
    name: "Lakshita",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Online",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Madhav",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "5 min ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Emma Liu",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "1 hour ago",
    isOnline: false,
    unreadCount: 1,
  },
]

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "1",
    content: "Hi! I'm interested in your MacBook Pro. Is it still available?",
    timestamp: new Date(Date.now() - 3600000),
    type: "text",
  },
  {
    id: "2",
    senderId: "me",
    content: "Yes, it's still available! Would you like to see it in person?",
    timestamp: new Date(Date.now() - 3500000),
    type: "text",
  },
  {
    id: "3",
    senderId: "1",
    content: "That would be great! When would be a good time?",
    timestamp: new Date(Date.now() - 3400000),
    type: "text",
  },
  {
    id: "4",
    senderId: "me",
    content: "How about tomorrow afternoon? I'm free after 2 PM.",
    timestamp: new Date(Date.now() - 3300000),
    type: "text",
  },
  {
    id: "5",
    senderId: "1",
    content: "Perfect! I can meet at 3 PM. Where should we meet?",
    timestamp: new Date(Date.now() - 120000),
    type: "text",
  },
  {
    id: "6",
    senderId: "1",
    content: "Also, would you consider ₹60,000?",
    timestamp: new Date(Date.now() - 60000),
    type: "text",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string>("1")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isTypingIndicator, setIsTypingIndicator } = useChat()

  const selectedUser = mockChats.find((chat) => chat.id === selectedChat)
  const filteredChats = mockChats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: "me",
      content: message,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate response
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-16 h-screen flex">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 ${
                  selectedChat === chat.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs">{chat.unreadCount}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.isOnline ? "Online" : `Last seen ${chat.lastSeen}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedUser.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{selectedUser.name}</h2>
                      <p className="text-sm text-gray-500">
                        {selectedUser.isOnline ? "Online" : `Last seen ${selectedUser.lastSeen}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === "me"
                  const showDate =
                    index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(msg.timestamp)

                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="text-center my-4">
                          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${isMe ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isMe
                                ? "bg-blue-500 text-white rounded-br-md"
                                : "bg-gray-100 dark:bg-gray-800 rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${isMe ? "text-right" : "text-left"}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>

                        {!isMe && (
                          <Avatar className="w-8 h-8 order-1 mr-2">
                            <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    </div>
                  )
                })}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-md">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="w-4 h-4" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-gray-600 dark:text-gray-300">Choose a chat from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
