"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, User, Trash2 } from "lucide-react"
import { getHistory, deleteHistoryItem } from "../api/api"

const ChatHistory = () => {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch history from the API
    const fetchHistory = async () => {
      try {
        const historyData = await getHistory()
        setHistory(historyData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching history:", error)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id)
      // Update the local state after successful deletion
      setHistory(history.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting history item:", error)
    }
  }

  const handleViewProfile = async (id) => {
    try {
      // In a real app, you would fetch the full profile data for this ID
      // For now, we'll just navigate to the profile page
      // The profile page would need to be updated to accept an ID parameter
      navigate("/profile")
    } catch (error) {
      console.error("Error viewing profile:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2 text-gray-300">Loading history...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-center opacity-5 z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Your Doppelgänger History</h2>
          <p className="mt-2 text-sm text-gray-300">Previous parallel selves you've discovered</p>
        </div>

        {history.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 mb-4">
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No History Yet</h3>
            <p className="text-gray-400 mb-6">You haven't generated any doppelgängers yet. Create your first one!</p>
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <User className="mr-2 h-4 w-4" />
              Create Doppelgänger
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <div className="text-xs text-gray-400 flex items-center mt-1 sm:mt-0 justify-center sm:justify-start">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{item.preview}</p>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => handleViewProfile(item.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-700 rounded-md shadow-sm text-xs font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-700 rounded-md shadow-sm text-xs font-medium text-red-300 bg-gray-800 hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatHistory

