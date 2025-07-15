# SerenityAI
*A Mental Health App using AI, DASS-21, and BERT*

Serenity AI is a smart mental health companion that helps users manage depression, anxiety, and stress using CBT-based assessment and AI-driven feedback. It features a DASS-21 test, a fine-tuned BERT model for emotion analysis, and is powered by Firebase and Python backends — all wrapped in a cross-platform React Native app using Expo.

---
## 🚀 How to Run Serenity AI

### 1. React Native App (Expo Frontend)

#### 📦 Install dependencies

npm install
npx expo start

Scan the QR code with Expo Go app on your phone.
Or use Android emulator via Expo Dev Tools.
Make sure your Firebase.js is properly configured with your Firebase project.

2. Backend – Flask API (for DASS + BERT analysis)
✅ Requirements
Python 3.9+

Required packages:
pip install flask transformers pandas

Start the backend:
python Server.py

The API will run locally at:
http://127.0.0.1:5000

You can connect this to your mobile app via local IP in development.

---
##  Firebase Setup
Configure Firebase.js using your Firebase credentials.

Don't commit firebase-service-account.json or google-services.json.

## Features
📋 DASS-21 Self-Assessment (Depression, Anxiety, Stress)

🤖 BERT-based AI Emotion Analysis

🔥 Firebase Auth + Firestore

📈 Mood tracking & visual progress

💬 Conversational interface (planned)

## 🧪 Dataset & Model (Not Pushed)
augmented_dataset.csv is used for fine-tuning the BERT model.

finetuned_bert/ contains trained weights.

These are excluded from Git due to size — store them on Drive or Hugging Face if needed.

## 🛠 Tech Stack
Frontend: React Native (Expo), Firebase

Backend: Flask + Transformers

ML: HuggingFace BERT

Data: DASS-21 Questionnaire
