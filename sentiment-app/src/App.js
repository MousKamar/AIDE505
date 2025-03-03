import React, { useState } from "react";
import axios from "axios";

function App() {
    const [text, setText] = useState("");
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeSentiment = async () => {
        if (!text.trim()) return;
        
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/analyze-sentiment", { text });
            setSentiment(response.data);
        } catch (error) {
            console.error("Error analyzing sentiment:", error);
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Sentiment Analysis</h2>
            <textarea 
                rows="4" 
                cols="50"
                placeholder="Enter your text here:"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button onClick={analyzeSentiment} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>

            {sentiment && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Result: {sentiment.sentiment}</h3>
                </div>
            )}
        </div>
    );
}

export default App;
