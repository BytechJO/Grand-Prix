import React, { useState, useRef } from "react";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

import ValidationAlert from "../../Popup/ValidationAlert";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);

 const [score, setScore] = useState(null); 

  // ✅ QUESTIONS DATA (من Q7 كما هي)
  const sentences = [
    { id: "a", text: "Ce texte parle de deux garçons." },
    { id: "b", text: "Le premier garçon s’appelle Thomas." },
    { id: "c", text: "Thomas se prépare pour l’école." },
    { id: "d", text: "Il a un cartable bleu." },
    { id: "e", text: "Le deuxième garçon s’appelle Charles." },
    { id: "f", text: "Dans le sac de Thomas, il y a un stylo, un crayon ettrois livres." },
    { id: "g", text: "Carlos se prépare pour aller au cinéma." },
    { id: "h", text: "Les deux sacs à dos sont rouges." },
    { id: "i", text: "Dans le sac de Carlos, il y a un taille-crayon, une équerre et unepaire de ciseaux." },
    { id: "j", text: "Thomas et Carlos ont le même âge." },
  ];

  const correctAnswers = ["b", "c","d","i"];

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
        style={{
          marginLeft: "42%",
          color: "black",
          marginTop: "5%",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        <span className="ex-A" style={{ backgroundColor: "#df4f89" }}>A</span>
        <span className="number-of-q">8</span>{" "}
   Vrai (✔️ ) ou faux (✖️) ?
      </header>


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
