from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import google.generativeai as genai
from transformers import BertTokenizer, BertForSequenceClassification
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load BERT Model
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained("finetuned_bert")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# Initialize Gemini API
genai.configure(api_key="AIzaSyBkdWxWRNt93OyfUHjSlUtcf72t6nTXLy4")
gemini_model = genai.GenerativeModel("gemini-1.5-pro")

# Cognitive Distortion Labels
DISTORTION_LABELS = [
    "All-or-Nothing Thinking", "Overgeneralization", "Catastrophizing", "Fortune Telling", 
    "Mind Reading", "Magnification", "Emotional Reasoning", "Should Statements", "Labeling", 
    "Personalization", "Filtering (Ignoring the Positive)"
]

def generate_cbt_response(distortion, thoughts):
    """Generate a short, natural CBT response using Gemini 1.5"""
    prompt = f"""
    A user has written a journal entry, and their thought pattern has been detected as '{distortion}'.
    Their journal entry: "{thoughts}"
    
    As a CBT therapist, provide a short, natural, and encouraging response to help them reframe their thinking.
    Keep it under 50 words.
    """
    response = gemini_model.generate_content(prompt)
    return response.text if response and response.text else "I understand how you're feeling. Try to reframe this thought more positively."

@app.route("/analyze", methods=["POST"])
def analyze_entry():
    try:
        data = request.get_json()
        print("Received Data:", data) 

        entry_id = data.get("entry_id") or data.get("id")
        thoughts = data.get("thoughts")
        
        if not entry_id or not thoughts:
            return jsonify({"error": "Missing entry_id or thoughts."}), 400
        
        # Detect cognitive distortion using BERT
        inputs = tokenizer(thoughts, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)
        with torch.no_grad():
            outputs = model(**inputs)
            prediction = torch.argmax(outputs.logits, dim=1).item()

        detected_distortion = DISTORTION_LABELS[prediction]

        # Generate a short CBT response using Gemini
        cbt_response = generate_cbt_response(detected_distortion, thoughts)

        # Update Firestore with detected distortion & CBT response
        journal_ref = db.collection("journalEntries").document(entry_id)
        journal_ref.update({
            "cognitive_distortion": detected_distortion,
            "cbt_response": cbt_response
        })

        return jsonify({
            "message": "Entry analyzed successfully.",
            "cognitive_distortion": detected_distortion,
            "cbt_response": cbt_response
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
