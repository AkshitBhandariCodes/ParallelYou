"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { getHistory, deleteHistoryItem, checkServerAvailability } from "../api/api"

const ChatHistory = () => {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [serverStatus, setServerStatus] = useState({ checked: false, available: true })
  const [error, setError] = useState("")
  const [deletingIds, setDeletingIds] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Check server availability first
        const isAvailable = await checkServerAvailability()
        setServerStatus({ checked: true, available: isAvailable })

        if (!isAvailable) {
          setError("Backend server is not available. Showing mock history data.")
        }

        const historyData = await getHistory()
        setHistory(historyData)
      } catch (error) {
        console.error("Error fetching history:", error)
        setError("Failed to load history. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleDelete = async (id) => {
    try {
      setDeletingIds((prev) => [...prev, id])

      // Check if server is available before attempting to delete
      if (!serverStatus.available) {
        // For mock data, just remove from local state
        setHistory((prev) => prev.filter((item) => item.id !== id))
        return
      }

      const result = await deleteHistoryItem(id)

      if (result.success) {
        setHistory((prev) => prev.filter((item) => item.id !== id))
      } else {
        throw new Error("Failed to delete item")
      }
    } catch (error) {
      console.error("Error deleting history item:", error)
      setError(`Failed to delete item. ${serverStatus.available ? "Please try again." : "Server is unavailable."}`)
    } finally {
      setDeletingIds((prev) => prev.filter((itemId) => itemId !== id))
    }
  }

  const handleViewProfile = (item) => {
    // In a real app, you would fetch the full character data
    // For now, we'll create a simplified version
    const doppelganger = {
      id: item.id,
      name: item.name,
      backstory: item.preview.endsWith("...")
        ? item.preview.slice(0, -3) + "... (Full backstory would be loaded from the server)"
        : item.preview,
      image: item.image,
    }

    // Store in localStorage
    localStorage.setItem("doppelganger", JSON.stringify(doppelganger))

    // Navigate to profile
    navigate("/profile")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-xl font-medium text-gray-300">Loading history...</p>
        </div>
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
          <h2 className="text-3xl font-extrabold text-white">Your Multiverse History</h2>
          <p className="mt-2 text-sm text-gray-300">All the parallel selves you've discovered</p>
        </div>

        {!serverStatus.available && (
          <div className="mb-8 p-4 bg-yellow-900/50 border border-yellow-700 rounded-md text-yellow-200 text-sm flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Backend server is not available. Showing mock history data for demonstration purposes.</span>
          </div>
        )}

        {error && error !== "Backend server is not available. Showing mock history data." && (
          <div className="mb-8 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200 text-sm flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No History Yet</h3>
            <p className="text-gray-400 mb-6">You haven't generated any parallel selves yet.</p>
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create Your First Doppelgänger
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden"
              >
                <div className="p-6 flex items-center">
                  <div className="h-16 w-16 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">{item.name}</h3>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-300 line-clamp-2">{item.preview}</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 px-6 py-3 flex justify-between">
                  <button
                    onClick={() => handleViewProfile(item)}
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingIds.includes(item.id)}
                    className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center disabled:opacity-50"
                  >
                    {deletingIds.includes(item.id) ? (
                      <>
                        <Loader2 className="animate-spin h-3 w-3 mr-1" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </>
                    )}
                  </button>
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

