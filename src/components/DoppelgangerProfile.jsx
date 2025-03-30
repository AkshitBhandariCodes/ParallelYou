"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MessageSquare, RefreshCw, Volume2, Pause, Send } from "lucide-react"
import { chatWithDoppelganger, generateCharacter } from "../api/api"

const DoppelgangerProfile = () => {
  const navigate = useNavigate()
  const [userFormData, setUserFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  // Mock doppelgänger data (in a real app, this would come from your Flask backend)
  const [doppelganger, setDoppelganger] = useState(null)

  useEffect(() => {
    // Get the user form data from localStorage
    const storedData = localStorage.getItem("doppelganger")
    if (!storedData) {
      navigate("/create")
      return
    }

    // Parse the doppelganger data
    const doppelgangerData = JSON.parse(storedData)
    setDoppelganger(doppelgangerData)
    setLoading(false)
  }, [navigate])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", text: message }])
    const userMessage = message
    setMessage("")

    try {
      // Call the API to get a response from the doppelgänger
      const response = await chatWithDoppelganger(userMessage, doppelganger.id)

      setChatHistory((prev) => [...prev, { sender: "ai", text: response.response }])
    } catch (error) {
      console.error("Error chatting with doppelgänger:", error)
      // Add a fallback message if the API call fails
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm having trouble connecting across dimensions. Let's try again later.",
        },
      ])
    }
  }

  const toggleVoice = () => {
    // In a real app, this would play/pause the AI-generated voice
    setPlaying(!playing)

    // Simulate voice playback
    if (!playing) {
      console.log("Playing voice...")
      // In a real app: new Audio(doppelganger.voiceUrl).play();
    } else {
      console.log("Pausing voice...")
      // In a real app: pause the audio
    }
  }

  const regenerateDoppelganger = async () => {
    setLoading(true)
    setChatHistory([])

    try {
      // Get the user form data from localStorage
      const storedUserData = localStorage.getItem("userFormData")
      if (!storedUserData) {
        navigate("/create")
        return
      }

      const userData = JSON.parse(storedUserData)

      // Call the API to generate a new character
      const characterData = await generateCharacter(userData)

      // Store the new character data
      localStorage.setItem("doppelganger", JSON.stringify(characterData))
      setDoppelganger(characterData)
      setLoading(false)
    } catch (error) {
      console.error("Error regenerating doppelgänger:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-xl font-medium text-gray-300">Generating your parallel self...</p>
          <p className="mt-2 text-sm text-gray-400">Scanning the multiverse for your doppelgänger</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-center opacity-5 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Your Parallel Universe Self</h2>
          <p className="mt-2 text-sm text-gray-300">Meet your doppelgänger from another dimension</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                  <img
                    src={doppelganger?.image || "/placeholder.svg"}
                    alt="AI Generated Doppelgänger"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">{doppelganger?.name}</h3>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 mb-4">
                    Parallel Universe #E-{Math.floor(Math.random() * 9000) + 1000}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300">
                      {userFormData?.personalityType}
                    </span>
                    {userFormData?.interests
                      .split(",")
                      .slice(0, 3)
                      .map((interest, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                        >
                          {interest.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-2">Backstory</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{doppelganger?.backstory}</p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-2">Voice Message</h4>
                <button
                  onClick={toggleVoice}
                  className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {playing ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause Voice
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Play Voice
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={regenerateDoppelganger}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Another Parallel Self
                </button>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <h3 className="text-lg font-medium text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-cyan-400" />
                Chat with Your Doppelgänger
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 mb-4">
                    <MessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-400">Start a conversation with your parallel self</p>
                </div>
              ) : (
                chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        chat.sender === "user"
                          ? "bg-purple-600 text-white rounded-tr-none"
                          : "bg-gray-700 text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoppelgangerProfile

