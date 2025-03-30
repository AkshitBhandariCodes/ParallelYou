"use client"

import { useState, useRef, useEffect } from "react"
import { Brain, Send, Sparkles, Clock, Bookmark } from "lucide-react"

const MentorMode = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "I'm your AI doppelgänger mentor. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [reflection, setReflection] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Based on your past patterns, I'd suggest approaching this differently. Consider how your future self would want you to act.",
        "I've analyzed your progress, and you're making significant strides. Keep focusing on small daily improvements.",
        "This is similar to challenges you've overcome before. Remember the strategies that worked then and adapt them.",
        "Your digital twin suggests taking a step back to gain perspective. Sometimes the solution becomes clear with distance.",
        "I've simulated multiple outcomes based on your personality profile. The most promising path involves breaking this down into smaller steps.",
      ]

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReflectionSubmit = () => {
    if (!reflection.trim()) return

    // Add reflection to messages
    const reflectionMessage = {
      id: messages.length + 1,
      type: "reflection",
      content: reflection,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, reflectionMessage])
    setReflection("")
    setIsTyping(true)

    // Simulate AI insight after a delay
    setTimeout(() => {
      const insightMessage = {
        id: messages.length + 2,
        type: "ai",
        content:
          "I notice patterns of self-reflection in your entry. Your digital twin suggests focusing on your strengths while acknowledging areas for growth. Remember that progress isn't linear.",
        timestamp: new Date().toISOString(),
        isInsight: true,
      }

      setMessages((prev) => [...prev, insightMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center justify-between bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-900 rounded-lg">
            <Brain className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-indigo-400">Mentor Mode</h2>
            <p className="text-sm text-gray-400">Your AI doppelgänger advisor</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Clock className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Bookmark className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } ${message.type === "reflection" ? "justify-center" : ""}`}
          >
            {message.type === "reflection" ? (
              <div className="bg-gray-800 border border-indigo-900 rounded-lg p-4 max-w-3xl w-full">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-indigo-400 mr-2" />
                  <span className="text-sm text-indigo-400 font-medium">Daily Reflection</span>
                </div>
                <p className="text-gray-300 italic">{message.content}</p>
              </div>
            ) : (
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-indigo-900 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none border border-indigo-900/50"
                } ${message.isInsight ? "border-2 border-indigo-500" : ""}`}
              >
                {message.isInsight && (
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-sm text-indigo-400 font-medium">AI Insight</span>
                  </div>
                )}
                <p className="text-sm sm:text-base">{message.content}</p>
                <div className="mt-1 text-right">
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-white rounded-2xl rounded-bl-none p-4 max-w-[80%] sm:max-w-[70%] border border-indigo-900/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Daily Reflection Card */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="bg-gray-900 rounded-lg p-4 border border-indigo-900/50">
          <h3 className="text-lg font-medium text-indigo-400 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Daily Reflection
          </h3>
          <p className="text-sm text-gray-400 mt-1 mb-3">
            Share your thoughts and receive insights from your AI doppelgänger
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 rounded-lg border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder="What's on your mind today? How are you feeling?"
            rows={3}
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleReflectionSubmit}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get Insights
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI doppelgänger for advice..."
              className="w-full bg-gray-800 text-gray-100 rounded-full py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-full ${
              input.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-700 cursor-not-allowed"
            } transition-colors`}
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MentorMode

