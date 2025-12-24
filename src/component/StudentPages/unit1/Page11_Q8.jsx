import React, { useState, useRef } from "react";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

import ValidationAlert from "../../Popup/ValidationAlert";
import "./CSSPAGE/P6U1.css";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
 const [score, setScore] = useState(null); 

  // ✅ QUESTIONS DATA (من Q7 كما هي)
  const sentences = [
    { id: "a", text: "L’image montre trois garçons." },
    { id: "b", text: "Antoine ne se sent pas très bien." },
    { id: "c", text: "Antoine le remercie pour son aide." },
    { id: "d", text: "Le deuxième garçon s’appelle Éric." },
    { id: "e", text: "Henri lui répond « Je t’en prie »." },
  ];

  const correctAnswers = ["b", "c"];

  const [checked, setChecked] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrent(0);
    }
  };

  // ✅ TOGGLE CHECK
  const toggleCheck = (id) => {
    if (showFeedback) return;
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ CHECK ANSWER
 // ✅ CHECK ANSWER (موحد مع نفس الفاليديشن)
const checkAnswer = () => {
  let correctCount = 0;
  let incomplete = false;

  sentences.forEach((s) => {
    // ⛔ لم يتم اختيار إجابة
    if (checked[s.id] === undefined) {
      incomplete = true;
      return;
    }

    const isCorrect = correctAnswers.includes(s.id);

    if (
      (checked[s.id] && isCorrect) ||
      (!checked[s.id] && !isCorrect)
    ) {
      correctCount++;
    }
  });

  setShowFeedback(true);

  const total = sentences.length;

  // ✅ تحديث السكور (نفس الكارد)
  setScore({ correct: correctCount, total });

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Some answers are missing.",
      `${correctCount}/${total}`
    );
  } 
  else if (correctCount === total) {
    ValidationAlert.success(
      "Good Job!",
      "You got all answers right!",
      `${correctCount}/${total}`
    );
  } 
  else if (correctCount === 0) {
    ValidationAlert.info(
      "Try Again!",
      "All answers are incorrect.",
      `${correctCount}/${total}`
    );
  } 
  else {
    ValidationAlert.error(
      "Almost There!",
      "Some answers are incorrect.",
      `${correctCount}/${total}`
    );
  }
};


  // ✅ SHOW ANSWER
const showCorrectAnswer = () => {
  const correctMap = {};

  sentences.forEach((s) => {
    correctMap[s.id] = correctAnswers.includes(s.id);
  });

  setChecked(correctMap);
  setShowFeedback(true);

  ValidationAlert.info(
    "Answers Shown",
    "Correct sentences are checked.",
    ""
  );
};


  // ✅ RESET
const resetExercise = () => {
  setChecked({});
  setShowFeedback(false);
  resetAudio();

  if (ValidationAlert && typeof ValidationAlert.close === "function") {
    ValidationAlert.close();
  }
};


  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
 <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">B</span> <span style={{color:"black"}} className="number-of-q">8</span> Vrai (✔️ ) ou faux ( ✖️) ?
      </header>
      <div className="q7-card">
        <h5>
         
          <span style={{ color: "#26CCC2" }}>Henri </span> : Salut ! Comment ça
          va ?
        </h5>
        <h5>
        
          <span style={{ color: "#FF6C0C" }}>Antoine </span>: Salut ! Comme ci,
          comme ça ! Et toi ?
        </h5>
        <h5>
        
          <span style={{ color: "#26CCC2" }}>Henri </span>Bien !
        </h5>
        <h5>
         
          <span style={{ color: "#FF6C0C" }}>Antoine </span>: Je m’appelle
          Antoine. Et toi ?
        </h5>
        <h5>
          
          <span style={{ color: "#26CCC2" }}>Henri </span>Je m’appelle Henri.
        </h5>
        <h5>
          
          <span style={{ color: "#FF6C0C" }}>Antoine </span>: Merci pour ton
          aide.
        </h5>
        <h5>
          
          <span style={{ color: "#26CCC2" }}>Henri </span>De rien.
        </h5>
      </div>

      {/* ✅ QUESTIONS LIST */}
{/* ✅ QUESTIONS LIST - Vrai / Faux */}
<div className="q7-card">
  <div className="q7-sentences-list">
    {sentences.map((sentence) => {
      const correct = correctAnswers.includes(sentence.id);
      const userAnswer = checked[sentence.id]; // true = Vrai, false = Faux

      return (
        <div
          key={sentence.id}
          className={`q7-sentence-item ${showFeedback ? (userAnswer === correct ? "correct" : "incorrect") : ""}`}
        >
          <div className="q7-sentence-text">
            <span className="q7-sentence-id">{sentence.id})</span>
            <span className="q7-sentence-content">{sentence.text}</span>
          </div>

          {/* Vrai / Faux Buttons */}
          <div className="vrai-faux-buttons">
            <button
              className={`vrai-btn ${userAnswer === true ? "selected" : ""}`}
              onClick={() => !showFeedback && setChecked(prev => ({ ...prev, [sentence.id]: true }))}
            >
             ✔️
            </button>
            <button
              className={`faux-btn ${userAnswer === false ? "selected" : ""}`}
              onClick={() => !showFeedback && setChecked(prev => ({ ...prev, [sentence.id]: false }))}
            >
             ✖️
            </button>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <span className="feedback-icon">
          
            </span>
          )}
        </div>
      );
    })}
  </div>
</div>

{score && <ScoreCardEnhanced score={score} />}

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
        Recommencer ↻
        </button>
        <button
          onClick={showCorrectAnswer}
          className="show-answer-btn swal-continue"
        >
        Afficher la réponse
        </button>
        <button onClick={checkAnswer} className="check-button2">
        Vérifier la réponse✓
        </button>
      </div>
      <div className="spaces"></div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
