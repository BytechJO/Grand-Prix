import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import A from "../../../assets/WBU1/Q1/a.svg";
import b from "../../../assets/WBU1/Q1/b.svg";
import c from "../../../assets/WBU1/Q1/c.svg";
import d from "../../../assets/WBU1/Q1/d.svg";
import e from "../../../assets/WBU1/Q1/e.svg";
import f from "../../../assets/WBU1/Q1/f.svg";
import g from "../../../assets/WBU1/Q1/g.svg";
import h from "../../../assets/WBU1/Q1/h.svg";
import "./WB_Unit1_Page4_Q1.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه


const Page5_Q1_CleanAudio = () => {
  const [answers, setAnswers] = useState({
    je: "",
    tu: "",
    il: "",
    elle: "",
    nous: "",
    vous: "",
    ils: "",
    elles: ""
  });
const [feedback, setFeedback] = useState({}); // { je: true/false, tu: true/false, ... }

  const [score, setScore] = useState(null); // لتخزين النتائج

  const correctAnswers = {
    je: "elles",
    tu: "Il",
    il: "tu",
    elle: "nous",
    nous: "elle",
    vous: "Ils",
    ils: "vous",
    elles: "Je"
  };

  // ✅ HANDLE INPUT CHANGE
  const handleInputChange = (pronoun, value) => {
    setAnswers(prev => ({
      ...prev,
      [pronoun]: value
    }));
  };

  // ✅ CHECK ANSWERS
// ✅ CHECK ANSWER
const checkAnswer = () => {
  const blanks = Object.keys(correctAnswers);
  let correctCount = 0;
  let incomplete = false;

  const newFeedback = {};

  blanks.forEach(blank => {
    const val = answers[blank]?.trim();
    if (!val) incomplete = true;

    const isCorrect = val?.toLowerCase() === correctAnswers[blank].toLowerCase();
    newFeedback[blank] = isCorrect;

    if (isCorrect) correctCount++;
  });

  setFeedback(newFeedback); // تحديث feedback لتلوين الحقول

  const total = blanks.length;

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Please fill in all fields.",
      `${correctCount}/${total}`
    );
    setScore(null);
  } else {
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(
        "Excellent!",
        "You got all answers right!",
        `${correctCount}/${total}`
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        "Try Again!",
        "All answers are incorrect.",
        `${correctCount}/${total}`
      );
    } else {
      ValidationAlert.error(
        "Almost there!",
        `You got ${correctCount} out of ${total} correct.`,
        `${correctCount}/${total}`
      );
    }
  }
};


// ✅ SHOW ANSWER
const showAnswerFunc = () => {
  setAnswers(correctAnswers);

  const blanks = Object.keys(correctAnswers);
  const total = blanks.length;

  const newFeedback = {};
  blanks.forEach(blank => {
    newFeedback[blank] = true;
  });
  setFeedback(newFeedback);

  setScore({ correct: total, total });

  ValidationAlert.success(
    "Answers shown",
    "All correct answers have been filled in.",
    `${total}/${total}`
  );
};


// ✅ RESET
const resetExercise = () => {
  const emptyAnswers = {};
  Object.keys(correctAnswers).forEach(blank => {
    emptyAnswers[blank] = "";
  });

  setAnswers(emptyAnswers);
  setScore(null); // إعادة تعيين ScoreCard
};


  // Image mapping
  const imageMap = { je: A, tu: b, il: c, elle: d, nous: e, vous: f, ils: g, elles: h };

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
      <header
     className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span>{" "}
        <span style={{color:"black"}} className="number-of-q">1</span>
        Écris les pronoms sujets.
      </header>

      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" style={{ maxWidth: "800px", width: "100%" }}>
          {Object.keys(answers).map(pronoun => (
            <div 
              key={pronoun}
              className="flex flex-col items-center justify-center p-4"
              style={{
                backgroundColor: "#bfe0f5",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                border: "2px solid #e0e0e0"
              }}
            >
              <img 
                src={imageMap[pronoun]} 
                alt={pronoun} 
                className="mb-4" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            <input
  type="text"
  value={answers[pronoun]}
  onChange={(e) => handleInputChange(pronoun, e.target.value)}

  style={{
    width: "100%",
    maxWidth: "200px",
    padding: "10px 15px",
    border: "2px solid",
    borderColor: feedback[pronoun] === undefined ? "#ccc" : feedback[pronoun] ? "#4a90e2" : "#f5a1a1",
    borderRadius: "8px",
    fontSize: "16px",
    textAlign: "center",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    outline: "none"
  }}
  onFocus={(e) => {
    e.target.style.boxShadow = "0 0 0 2px rgba(74, 144, 226, 0.2)";
  }}
  onBlur={(e) => {
    e.target.style.boxShadow = "none";
  }}
/>

            
            </div>
          ))}
        </div>
      </div>

      <div className="spaces"></div>

      <div className="action-buttons-container" style={{ marginTop: "30px" }}>
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>

          {score && <ScoreCardEnhanced score={score} />}

    </div>
  );
};

export default Page5_Q1_CleanAudio;
