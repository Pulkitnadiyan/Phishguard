from flask import Flask, request, jsonify
from flask_cors import CORS
import random

import joblib
import pandas as pd
from feature_extraction import extract_features

app = Flask(__name__)
CORS(app)

# Load the trained model at startup
try:
    model = joblib.load('model.pkl')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "running", "message": "PhishGuard ML Service is active. Use POST /predict to analyze URLs."})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    
    if model is None:
        return jsonify({'error': 'Prediction model not available'}), 500

    # Extract features from the URL
    features = extract_features(url)
    
    # Predict using the loaded model
    # Model expects a 2D array, so we wrap features in a list
    prediction = model.predict([features])[0]
    
    # Map the numerical prediction back to a string result
    result = "phishing" if prediction == 1 else "safe"
        
    return jsonify({'result': result, 'url': url})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
