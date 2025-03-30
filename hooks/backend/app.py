from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import time
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simulated database (in a real app, use a proper database)
HISTORY_FILE = 'history.json'

def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_history(history):
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f)

# Initialize history file if it doesn't exist
if not os.path.exists(HISTORY_FILE):
    save_history([])

@app.route('/generate_character', methods=['POST'])
def generate_character():
    data = request.json
    
    # In a real app, you would call the Google Gemini API here
    # For demo purposes, we'll simulate a response
    
    name = data.get('name', '').split(' ')[0]
    interests = data.get('interests', '').split(',')
    personality_type = data.get('personalityType', '')
    
    # Generate a random ID for the character
    character_id = f"{int(time.time())}"
    
    # Create a simulated backstory
    backstory_templates = [
        f"In a parallel universe where technology evolved differently, {name}-{random.randint(1000, 9999)} is a renowned {personality_type.lower()} explorer of quantum realities. Their passion for {interests[0].strip().lower()} led them to discover methods of cross-dimensional communication.",
        f"Coming from a world where historical events unfolded differently, {name}-{random.randint(1000, 9999)} became a celebrated {personality_type.lower()} figure in the field of {interests[0].strip().lower()}. They pioneered revolutionary approaches that changed how people think about {interests[1].strip().lower() if len(interests) > 1 else 'the world'}.",
        f"In the alternate timeline of Earth-{random.randint(1000, 9999)}, {name}-{random.randint(1000, 9999)} chose a different path after a pivotal moment in their teenage years. Their {personality_type.lower()} nature led them to excel in {interests[0].strip().lower()}, becoming a figure of significant influence in their world."
    ]
    
    backstory = random.choice(backstory_templates)
    
    # Create character data
    character = {
        'id': character_id,
        'name': f"{name}-{random.randint(1000, 9999)}",
        'backstory': backstory,
        'personality_type': personality_type,
        'interests': interests,
        'created_at': datetime.now().isoformat()
    }
    
    # Save to history
    history = load_history()
    history.append(character)
    save_history(history)
    
    # In a real app, you would generate an image URL here
    # For demo purposes, we'll use a placeholder
    character['image_url'] = f"/placeholder.svg?height=400&width=400"
    
    return jsonify(character)

@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.json
    
    # In a real app, you would call Stable Diffusion API here
    # For demo purposes, we'll simulate a response
    
    # Return a placeholder image URL
    return jsonify({
        'image_url': f"/placeholder.svg?height=400&width=400"
    })

@app.route('/generate_voice', methods=['POST'])
def generate_voice():
    data = request.json
    text = data.get('text', '')
    
    # In a real app, you would call Gemini's TTS API here
    # For demo purposes, we'll simulate a response
    
    # Return a placeholder audio URL
    return jsonify({
        'audio_url': f"https://example.com/audio/{int(time.time())}.mp3"
    })

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    character_id = data.get('characterId', '')
    
    # In a real app, you would call Gemini API here
    # For demo purposes, we'll simulate a response
    
    responses = [
        "That's fascinating! In my universe, things evolved quite differently.",
        "I've often wondered how my life would have been in your reality.",
        "My interests took me down a completely different path than yours.",
        "The multiverse theory suggests infinite versions of us exist. I'm just one possibility.",
        "Being who I am in my universe led me to some incredible adventures.",
        "Would you make the same choices I did if you were in my position?",
        "The differences between our universes are subtle but profound.",
        "I'd love to know more about your world. It sounds so different from mine."
    ]
    
    # Simulate a delay for realism
    time.sleep(1)
    
    return jsonify({
        'response': random.choice(responses)
    })

@app.route('/history', methods=['GET'])
def get_history():
    history = load_history()
    
    # Format for frontend display
    formatted_history = []
    for item in history:
        time_diff = (datetime.now() - datetime.fromisoformat(item['created_at'])).total_seconds()
        
        if time_diff < 3600:
            time_ago = f"{int(time_diff / 60)} minutes ago"
        elif time_diff < 86400:
            time_ago = f"{int(time_diff / 3600)} hours ago"
        else:
            time_ago = f"{int(time_diff / 86400)} days ago"
        
        formatted_history.append({
            'id': item['id'],
            'name': item['name'],
            'date': time_ago,
            'preview': item['backstory'][:100] + '...',
            'image': item.get('image_url', f"/placeholder.svg?height=100&width=100")
        })
    
    return jsonify(formatted_history)

@app.route('/history/<id>', methods=['DELETE'])
def delete_history_item(id):
    history = load_history()
    history = [item for item in history if item['id'] != id]
    save_history(history)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)

