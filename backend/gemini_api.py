# This file contains functions to interact with the Google Gemini API
# You'll need to install the Google Generative AI Python package:
# pip install google-generativeai

import os
import google.generativeai as genai

# Set up the API key - you'll need to set this environment variable
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

def setup_gemini():
    """Initialize the Gemini API with your API key"""
    if not GEMINI_API_KEY:
        print("Warning: GEMINI_API_KEY environment variable not set")
        return False
    
    genai.configure(api_key=GEMINI_API_KEY)
    return True

def generate_backstory(name, interests, personality_type):
    """Generate a backstory for the doppelgänger using Gemini API"""
    if not setup_gemini():
        # Fallback to template if API key is not set
        return None
    
    # Create a prompt for the model
    prompt = f"""
    Create a detailed backstory for an alternate universe version of a person named {name}.
    This alternate version has the following traits:
    - Personality type: {personality_type}
    - Interests: {interests}
    
    The backstory should:
    - Explain how this alternate universe differs from ours
    - Describe a pivotal moment that led this version down a different path
    - Include details about their achievements and lifestyle
    - Be written in third person
    - Be 3-4 sentences long
    - Have a sci-fi feel
    """
    
    try:
        # Generate content with Gemini Pro
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating backstory with Gemini: {e}")
        return None

def chat_with_doppelganger(user_message, character_data):
    """Generate a chat response from the doppelgänger using Gemini API"""
    if not setup_gemini():
        # Fallback to template if API key is not set
        return None
    
    # Create a system prompt that defines the character
    system_prompt = f"""
    You are {character_data['name']}, an alternate universe version of {character_data['name'].split('-')[0]}.
    
    Your backstory: {character_data['backstory']}
    
    Your personality type is {character_data['personality_type']}.
    Your interests include {', '.join(character_data['interests'])}.
    
    Respond as this character would, maintaining a sci-fi tone and occasionally referencing 
    differences between your universe and the user's universe. Keep responses concise (2-3 sentences).
    """
    
    try:
        # Create a conversation with the system prompt
        model = genai.GenerativeModel('gemini-pro')
        chat = model.start_chat(history=[
            {"role": "user", "parts": [system_prompt]},
            {"role": "model", "parts": ["I understand. I'll respond as this alternate universe character."]}
        ])
        
        # Get response to the user's message
        response = chat.send_message(user_message)
        return response.text
    except Exception as e:
        print(f"Error chatting with Gemini: {e}")
        return None

