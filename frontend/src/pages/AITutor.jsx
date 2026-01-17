"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, Loader2, Send, UserIcon } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion"

const createMessage = (role, content, extras = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
  createdAt: new Date().toISOString(),
  ...extras,
})

const formatTimestamp = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const messageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const AITutor = () => {
  const { user, token } = useAuth()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [messages, setMessages] = useState(() => [
    createMessage(
      "assistant",
      "Hey there! I'm CodeQuest's AI Tutor. Ask me for hints, strategy tips, or quick explanations about anything you're working on.",
    ),
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const endOfChatRef = useRef(null)
  const textareaRef = useRef(null)

  const userId = useMemo(() => user?.id || user?._id, [user])

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || sending) return

    const userMessage = createMessage("user", trimmed)
    const optimisticHistory = [...messages, userMessage]

    setMessages(optimisticHistory)
    setInput("")
    setError("")
    setSending(true)

    try {
      const payload = optimisticHistory.map(({ role, content }) => ({ role, content }))
      const response = await axios.post(
        "/api/ai-tutor/chat",
        { userId, messages: payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const replyContent = response.data?.reply?.trim() || "I need a moment; please try again."
      setMessages((prev) => [...prev, createMessage("assistant", replyContent)])
    } catch (err) {
      const fallback = err.response?.data?.error || "Something went wrong, please try again."
      setMessages((prev) => [...prev, createMessage("assistant", fallback, { isError: true })])
      setError(fallback)
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2">AI Tutor</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Chat with a coach that knows your competitive journey. Share code, ask for hints, or get strategy tips—all
          tailored to your skill level.
        </p>
      </motion.div>

      <section className="glass flex-1 rounded-3xl p-6 flex flex-col overflow-hidden shadow-glass">
        <div className="flex flex-col h-full gap-4">
          {/* Messages Area - Dominant space */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isUser = message.role === "user"
                const bubbleStyles = isUser
                  ? "bg-primary/20 border border-primary/40 text-primary text-right"
                  : message.isError
                    ? "bg-red-500/10 border border-red-500/40 text-red-200"
                    : "bg-dark-700 border border-dark-600 text-gray-100"

                return (
                  <motion.div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex max-w-[85%] flex-col">
                      <div className={`px-5 py-3 rounded-2xl ${bubbleStyles}`}>
                        <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wide text-gray-400">
                          {isUser ? <UserIcon size={14} /> : <Bot size={14} />}
                          <span>{isUser ? "You" : "AI Coach"}</span>
                        </div>
                        <p className="whitespace-pre-wrap leading-relaxed text-base">{message.content}</p>
                        <span className="block text-[0.65rem] text-gray-400 mt-2 opacity-70">
                          {formatTimestamp(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {sending && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-gray-400"
              >
                <div className="bg-dark-700 border border-dark-600 rounded-2xl px-5 py-3 flex items-center">
                  <div className="ai-thinking-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <span className="text-sm">Coach is thinking...</span>
              </motion.div>
            )}

            <div ref={endOfChatRef} />
          </div>

          {/* Input Area - Fixed at bottom */}
          <form onSubmit={handleSubmit} className="flex flex-col border-t border-dark-700 pt-4 gap-3">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <div className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                className="flex-1 bg-dark-900 border border-dark-700 rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none min-h-[56px] max-h-36 transition"
                placeholder="Ask for a hint, code explanation, or study plan... (Shift+Enter for newline)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sending}
              />
              <motion.button
                type="submit"
                disabled={sending || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 w-14 rounded-xl bg-primary text-dark-900 flex items-center justify-center shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-cyan-400"
              >
                {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </motion.button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AITutor
