import React, { useState } from "react";
import styles from "./Home.module.scss";
import PredictionComponent from "./Prediction/Prediction";

const Home = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!text) {
        throw new Error("Text is not defined");
      }

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.homeContainer}>
      <div>
        <h1 className={styles.titleContainer}>Detect the AI content in your text</h1>
      </div>
      <div className={styles.textAreaContainer}>
        <textarea
          className={styles.formControl}
          rows="25"
          value={text}
          onChange={handleTextChange}
          placeholder="Write your text here..."
        />
        <div className={styles.wordCounter}>Word Count: {wordCount}</div>
        <button className={styles.uploadButton} onClick={handleUpload}>
          Upload
        </button>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {prediction !== null && <PredictionComponent prediction={prediction} />}
    </div>
  );
};

export default Home;
