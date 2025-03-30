// API endpoints for connecting to the Flask backend
const API_URL = "http://localhost:5000" // Flask backend URL

export const generateCharacter = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/generate_character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error("Failed to generate character")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating character:", error)
    throw error
  }
}

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
      throw new Error("Failed to generate image")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating image:", error)
    throw error
  }
}

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
      throw new Error("Failed to generate voice")
    }

    return await response.json()
  } catch (error) {
    console.error("Error generating voice:", error)
    throw error
  }
}

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
      throw new Error("Failed to chat with doppelgänger")
    }

    return await response.json()
  } catch (error) {
    console.error("Error chatting with doppelgänger:", error)
    throw error
  }
}

export const getHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`)

    if (!response.ok) {
      throw new Error("Failed to get history")
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting history:", error)
    throw error
  }
}

export const deleteHistoryItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/history/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete history item")
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting history item:", error)
    throw error
  }
}

