/**
 * API integration for the Parallel You application
 * Connects the React frontend to the Flask backend
 */

// Base URL for the Flask backend
const API_URL = "http://127.0.0.1:5000/"

/**
 * Generate a character based on user input
 * @param {Object} userData - User data containing name, interests, and personalityType
 * @returns {Promise<Object>} The generated character data
 */
export const generateCharacter = async (userData) => {
  try {
    // Make API request to the backend
    const response = await fetch(`${API_URL}/generate_character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to generate character")
    }

    // Return the character data
    return await response.json()
  } catch (error) {
    console.error("Error generating character:", error)

    // For development: return a mock response if the backend is unavailable
    // In production, you might want to show an error message instead
    return {
      id: Date.now().toString(),
      name: `${userData.name.split(" ")[0]}-${Math.floor(Math.random() * 9000) + 1000}`,
      backstory: `In a parallel universe where technology evolved differently, ${userData.name.split(" ")[0]} is a renowned ${userData.personalityType.toLowerCase()} explorer of quantum realities.`,
      personality_type: userData.personalityType,
      interests: userData.interests.split(",").map((i) => i.trim()),
      image_url: "/placeholder.svg?height=400&width=400",
      created_at: new Date().toISOString(),
    }
  }
}

/**
 * Generate an image for a character
 * @param {Object} characterData - Character data
 * @returns {Promise<Object>} The image URL
 */
export const generateImage = async (characterData) => {
  try {
    const response = await fetch(`${API_URL}/generate_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to generate image")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      image_url: "/placeholder.svg?height=400&width=400",
    }
  }
}

/**
 * Generate voice for a character
 * @param {string} text - Text to convert to speech
 * @returns {Promise<Object>} The audio URL
 */
export const generateVoice = async (text) => {
  try {
    const response = await fetch(`${API_URL}/generate_voice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to generate voice")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating voice:", error)
    return {
      audio_url: null,
    }
  }
}

/**
 * Chat with a doppelgänger
 * @param {string} message - User message
 * @param {string} characterId - Character ID
 * @returns {Promise<Object>} The AI response
 */
export const chatWithDoppelganger = async (message, characterId) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, characterId }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to chat with doppelgänger")
    }

    return await response.json()
  } catch (error) {
    console.error("Error chatting with doppelgänger:", error)

    // Fallback response for development
    const fallbackResponses = [
      "I'm having trouble connecting across dimensions. Let's try again later.",
      "The quantum link between our universes is unstable right now.",
      "My reality seems to be experiencing some interference. Can we try again?",
      "The interdimensional communication channel is experiencing difficulties.",
    ]

    return {
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
    }
  }
}

/**
 * Get the history of generated characters
 * @returns {Promise<Array>} The history items
 */
export const getHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to get history")
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting history:", error)

    // Mock data for development
    return [
      {
        id: "1",
        name: "Alex-7291",
        date: "2 days ago",
        preview: "In a parallel universe where technology evolved differently...",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "Sam-4056",
        date: "3 days ago",
        preview: "Coming from a world where historical events unfolded differently...",
        image: "/placeholder.svg?height=100&width=100",
      },
    ]
  }
}

/**
 * Delete a history item
 * @param {string} id - History item ID
 * @returns {Promise<Object>} Success status
 */
export const checkServerAvailability = async () => {
  try {
      const response = await fetch("http://your-backend-url/health-check");
      return response.ok;
  } catch (error) {
      console.error("Server check failed:", error);
      return false;
  }
};

export const deleteHistoryItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/history/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to delete history item")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting history item:", error)
    return { success: true }
  }
}

