import React, { useState } from "react";
import styles from "./Home.module.scss";
import PredictionComponent from "./Prediction/Prediction";

const Home = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleTextChange1 = (e) => {
    setText1(e.target.value);
  };
  const handleTextChange2 = (e) => {
    setText2(e.target.value);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (!text1 || !text2) {
        throw new Error("Text is not defined");
      }

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text1,text2 }),
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

  const wordCount1 = text1.trim().split(/\s+/).filter(Boolean).length;
  const wordCount2 = text2.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.homeContainer}>
      <div>
        <h1 className={styles.titleContainer}>
          Detect the AI content in your text
        </h1>
      </div>
      <div className={styles.textAreaContainer} style={{display:'flex',flexDirection:'row',gap:'20px',justifyContent:'space-around'}}>
        <div className="one" style={{width:'100%'}}>
            <div className={styles.textLabel}>Text 1</div>
          <textarea 
            className={styles.formControl}
            rows="25"
            value={text1}
            onChange={handleTextChange1}
            placeholder="Write your text here..."
          />
          <div className={styles.wordCounter}>Word Count: {wordCount1}</div>
        </div>
        <div className="two" style={{width:'100%'}}>
        <div className={styles.textLabel}>Text 2</div>
          <textarea
            className={styles.formControl}
            rows="25"
            value={text2}
            onChange={handleTextChange2}
            placeholder="Write your text here..."
          />
          <div className={styles.wordCounter}>Word Count: {wordCount2}</div>
        </div>
      </div>
      <button className={styles.uploadButton} onClick={handleUpload}>
        Upload
      </button>
      <br />
      {loading && <div className={styles.loading}>Loading...</div>}
      {prediction !== null && <PredictionComponent prediction={prediction} />}
    </div>
  );
};

export default Home;
