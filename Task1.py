# Task 1: Create the Flask API
# 1. Install the required dependencies.
# pip install Flask vaderSentiment

from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize the Flask app
app = Flask(__name__)

# Initialize VADER Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    
    text = data['text']
    sc = analyzer.polarity_scores(text)
    
    if sc['compound'] >= 0.05:
        sentiment = "positive"
    elif sc['compound'] <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"
    
    return jsonify({"sentiment": sentiment })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
