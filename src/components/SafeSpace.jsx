"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, Send, Smile, Frown, Meh, MessageCircle } from "lucide-react"

const SafeSpace = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Welcome to your Safe Space. I'm here to listen and support you. How are you feeling today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [mood, setMood] = useState(null)

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
      const supportiveResponses = [
        "I understand how challenging that can be. Your feelings are valid, and it's okay to feel this way.",
        "Thank you for sharing that with me. It takes courage to express your emotions.",
        "I'm here for you. Let's work through this together at your own pace.",
        "That sounds difficult. Would it help to explore some coping strategies that have worked for others?",
        "I'm listening and I care about what you're going through. You're not alone in this.",
      ]

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
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

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood)

    // Add mood message
    const moodMessage = {
      id: messages.length + 1,
      type: "mood",
      content: `I'm feeling ${selectedMood}`,
      mood: selectedMood,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, moodMessage])
    setIsTyping(true)

    // Simulate AI response to mood after a delay
    setTimeout(() => {
      let response = ""

      switch (selectedMood) {
        case "stressed":
          response =
            "I notice you're feeling stressed. That's completely understandable. Would you like to talk about what's causing this stress, or would you prefer some relaxation techniques?"
          break
        case "sad":
          response =
            "I'm sorry to hear you're feeling sad. Remember that it's okay to feel this way, and these emotions will pass. Would you like to talk about what's making you feel this way?"
          break
        case "anxious":
          response =
            "Anxiety can be really challenging. Your feelings are valid, and I'm here to support you. Would it help to talk through what's making you feel anxious?"
          break
        case "unmotivated":
          response =
            "Feeling unmotivated happens to everyone. It's okay to take things one small step at a time. Would you like to discuss what might help restore your motivation?"
          break
        default:
          response = "Thank you for sharing how you're feeling. Would you like to talk more about it?"
      }

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const conversationStarters = [
    "I feel stressed about work",
    "I need motivation",
    "I'm feeling anxious today",
    "I can't sleep well lately",
  ]

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center justify-between bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-900 rounded-lg">
            <Heart className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-purple-400">Safe Space</h2>
            <p className="text-sm text-gray-400">AI Therapy & Emotional Support</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } ${message.type === "mood" ? "justify-center" : ""}`}
          >
            {message.type === "mood" ? (
              <div className="bg-gray-800 border border-purple-900/50 rounded-lg p-3 max-w-xs">
                <div className="flex items-center">
                  {message.mood === "stressed" && <Frown className="h-5 w-5 text-yellow-500 mr-2" />}
                  {message.mood === "sad" && <Frown className="h-5 w-5 text-blue-500 mr-2" />}
                  {message.mood === "anxious" && <Meh className="h-5 w-5 text-orange-500 mr-2" />}
                  {message.mood === "unmotivated" && <Meh className="h-5 w-5 text-gray-500 mr-2" />}
                  <span className="text-gray-300">{message.content}</span>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-purple-900 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none border border-purple-900/50"
                }`}
              >
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
            <div className="bg-gray-800 text-white rounded-2xl rounded-bl-none p-4 max-w-[80%] sm:max-w-[70%] border border-purple-900/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mood Selection */}
      {!mood && (
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="text-center mb-3">
            <p className="text-gray-300">How are you feeling today?</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleMoodSelection("stressed")}
              className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Frown className="h-8 w-8 text-yellow-500 mb-1" />
              <span className="text-xs text-gray-300">Stressed</span>
            </button>
            <button
              onClick={() => handleMoodSelection("sad")}
              className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Frown className="h-8 w-8 text-blue-500 mb-1" />
              <span className="text-xs text-gray-300">Sad</span>
            </button>
            <button
              onClick={() => handleMoodSelection("anxious")}
              className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Meh className="h-8 w-8 text-orange-500 mb-1" />
              <span className="text-xs text-gray-300">Anxious</span>
            </button>
            <button
              onClick={() => handleMoodSelection("unmotivated")}
              className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Meh className="h-8 w-8 text-gray-500 mb-1" />
              <span className="text-xs text-gray-300">Unmotivated</span>
            </button>
          </div>
        </div>
      )}

      {/* Conversation Starters */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center mb-3">
          <MessageCircle className="h-4 w-4 text-purple-400 mr-2" />
          <p className="text-sm text-gray-300">Conversation Starters</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {conversationStarters.map((starter, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(starter)
              }}
              className="px-3 py-2 bg-gray-900 text-sm text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
            >
              {starter}
            </button>
          ))}
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
              placeholder="Type your message..."
              className="w-full bg-gray-800 text-gray-100 rounded-full py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-full ${
              input.trim() ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 cursor-not-allowed"
            } transition-colors`}
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SafeSpace

