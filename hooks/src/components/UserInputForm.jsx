"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sparkles, Loader2 } from "lucide-react"
import { generateCharacter } from "../api/api"

const UserInputForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    interests: "",
    personalityType: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call the API function to generate a character
      const characterData = await generateCharacter(formData)

      // Store the character data in localStorage for the profile page to use
      localStorage.setItem("doppelganger", JSON.stringify(characterData))
      navigate("/profile")
    } catch (error) {
      console.error("Error generating doppelgänger:", error)
      setLoading(false)
    }
  }

  const personalityTypes = [
    "Logical",
    "Adventurous",
    "Artistic",
    "Nurturing",
    "Analytical",
    "Visionary",
    "Diplomatic",
    "Assertive",
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-center opacity-5 z-0"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Create Your Doppelgänger</h2>
          <p className="mt-2 text-sm text-gray-300">
            Tell us about yourself so we can generate your parallel universe twin
          </p>
        </div>

        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Your Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-300">
                Your Interests
              </label>
              <div className="mt-1">
                <textarea
                  id="interests"
                  name="interests"
                  required
                  value={formData.interests}
                  onChange={handleChange}
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Technology, music, hiking, cooking..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="personalityType" className="block text-sm font-medium text-gray-300">
                Your Personality Type
              </label>
              <div className="mt-1">
                <select
                  id="personalityType"
                  name="personalityType"
                  required
                  value={formData.personalityType}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="" disabled>
                    Select your personality type
                  </option>
                  {personalityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="-ml-1 mr-2 h-4 w-4" />
                    Generate My Doppelgänger
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserInputForm

