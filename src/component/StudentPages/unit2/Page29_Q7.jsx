import React, { useState} from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; 



/* 🔴 الإجابات الصحيحة */
const correctAnswers = {
  0: "b",
  1: "d",
  2: "h",
  3: "e",
  4: "g",
  5: "a",
  6: "f",
  7: "j",
  8: "c",
  9: "i",
};

const Page5_Q1_CleanAudio = () => {
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);






  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (inputs[key] === correctAnswers[key]) correctCount++;
    });

    const total = Object.keys(correctAnswers).length;
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(
        `Excellent! (${correctCount}/${total})`,
        "All answers correct!"
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        `All answers incorrect (${correctCount}/${total})`,
        "Try again!"
      );
    } else {
      ValidationAlert.error(
        `You got ${correctCount} out of ${total} correct.`,
        "Almost there!"
      );
    }
  };

  const showAnswerFunc = () => setInputs(correctAnswers);

  const resetExercise = () => {
    setInputs({});
    setScore(null);

  };



  /* 🔴 مواقع الـ inputs فوق الصورة */

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">

      {/* Header */}
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
        <span className="number-of-q">1</span>{" "}
        Écoute, répète et place dans l’ordre.
      </header>

  

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise */}


      {/* Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
         Recommencer ↻
        </button>
        <button onClick={showAnswerFunc} className="show-answer-btn">
         Afficher la réponse
        </button>
        <button onClick={checkAnswer} className="check-button2">
          Vérifier la réponse✓
        </button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
