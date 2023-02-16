import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    setLoading(true);
    const response = await openai.createImage({
      n: 1,
      size: "1024x1024",
      prompt: prompt,
    });
    setResult(response.data.data[0].url);
    setLoading(false);
  };
  return (
    <div className="app-main">
      <h1>Generate Image Using OpenApi</h1>
      <input
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
        className="app-input"
        placeholder="Enter prompt to generate image"
      />
      <button onClick={generateImage} className="app-btn">
        Generate
      </button>
      {loading ? <p>Loading...</p> : <></>}
      {result.length > 0 ? (
        <img src={result} alt="" className="result-image" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
