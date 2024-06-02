import React from "react";
import styles from "./Prediction.module.scss";

const PredictionComponent = ({ prediction }) => {
  const nonAiPercentage = prediction ? prediction * 100 : 0;
  const aiPercentage = prediction ? (1 - prediction) * 100 : 100;
  const totalRadius = 100;
  const strokeWidth = 10;
  const calculateCirclePath = (percentage, color) => {
    const circumference = 2 * Math.PI * totalRadius;

    return (
      <circle
        cx={totalRadius}
        cy={totalRadius}
        r={totalRadius - strokeWidth / 2}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={`${((100 - percentage) / 100) * circumference}`}
      />
    );
  };

  return (
    <div className={styles.predictionContainer}>
      {/* <svg width={totalRadius * 2} height={totalRadius * 2}>
        {calculateCirclePath(100, "darkblue")} 
        {calculateCirclePath(nonAiPercentage, "grey")}
      </svg>
      <div className={styles.legend}>
        <span className={styles.aiLabel}>AI Content: {aiPercentage.toFixed(1)}%</span>
        <span className={styles.nonAiLabel}>
          Non-AI Content: {nonAiPercentage.toFixed(1)}%
        </span>
      </div> */}

      {prediction > 0.5 && <div style={{ color: "black" }}>Text 1 is AI</div>}
      {prediction === 0.5 && (
        <div style={{ color: "black" }}>Cannot Decide</div>
      )}
      {prediction < 0.5 && <div style={{ color: "black" }}>Text 2 is AI</div>}
      {<div style={{ color: "navy" }}>{prediction}</div>}
    </div>
  );
};

export default PredictionComponent;
