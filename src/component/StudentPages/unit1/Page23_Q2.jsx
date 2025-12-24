import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";
import "./Page23_Q2.css";
import img1 from "../../../assets/unit1/sectionD/P23Q2.svg";

const Page5_Q1_CleanAudio = () => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null
  });

  const [score, setScore] = useState(null);

  // ✅ Correct answers
  const correctAnswers = {
    q1: true,
    q2: false,
    q3: false,
    q4: true,
    q5: true,
    q6: true
  };

  const handleSelect = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value
    }));
  };

  const checkAnswer = () => {
    if (Object.values(answers).includes(null)) {
      ValidationAlert.info(
        "Attention !",
        "Veuillez répondre à toutes les questions."
      );
      return;
    }

    let correctCount = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        correctCount++;
      }
    });

    setScore({ correct: correctCount, total: 3 });

    if (correctCount === 3) {
      ValidationAlert.success("Excellent!", "Toutes les réponses sont correctes.", "3/3");
    } else {
      ValidationAlert.error(
        "Résultat",
        `Vous avez ${correctCount} bonnes réponses.`,
        `${correctCount}/3`
      );
    }
  };

  const showAnswerFunc = () => {
    setAnswers(correctAnswers);
    setScore({ correct: 3, total: 3 });

    ValidationAlert.success(
      "Réponses affichées",
      "Les bonnes réponses sont maintenant visibles.",
      "3/3"
    );
  };

  const resetExercise = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setScore(null);
  };

  const getClass = (question, value) => {
    if (answers[question] === null) return "";
    if (!score) return answers[question] === value ? "selected" : "";
    return correctAnswers[question] === value ? "correct" : "wrong";
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#eaaa52", color: "#3fadb7" }} className="ex-A">DELF </span>
        <span style={{ color: "black" }} className="number-of-q">1</span>
Lis le petit message, puis indique si les affirmations sont vraies ou fausses. <br />
Chaque réponse correcte vaut 2 points.
      </header>

       <div className="tf-layout">
        {/* الصورة */}
        <div className="image-side">
          <img src={img1} alt="illustration" />

        </div>

        {/* الأسئلة */}
        <div className="questions-side">
          <div className="tf-question">
            <p>1.C’est une fille.</p>
            <button
              className={getClass("q1", true)}
              onClick={() => handleSelect("q1", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q1", false)}
              onClick={() => handleSelect("q1", false)}
            >
              Faux
            </button>
          </div>

          <div className="tf-question">
            <p>2.Elle s’appelle Lucie.</p>
            <button
              className={getClass("q2", true)}
              onClick={() => handleSelect("q2", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q2", false)}
              onClick={() => handleSelect("q2", false)}
            >
              Faux
            </button>
          </div>

          <div className="tf-question">
            <p>3.Ses parents s’appellent Gobbie.</p>
            <button
              className={getClass("q3", true)}
              onClick={() => handleSelect("q3", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q3", false)}
              onClick={() => handleSelect("q3", false)}
            >
              Faux
            </button>
          </div>
          <div className="tf-question">
            <p>4.Ses amis s’appellent Gobbie.</p>
            <button
              className={getClass("q4", true)}
              onClick={() => handleSelect("q4", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q4", false)}
              onClick={() => handleSelect("q4", false)}
            >
              Faux
            </button>
          </div>
          <div className="tf-question">
            <p>5.Gabriel est portugaise.</p>
            <button
              className={getClass("q5", true)}
              onClick={() => handleSelect("q5", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q5", false)}
              onClick={() => handleSelect("q5", false)}
            >
              Faux
            </button>
          </div>
          <div className="tf-question">
            <p>6.Elle dit « au revoir ».</p>
            <button
              className={getClass("q6", true)}
              onClick={() => handleSelect("q6", true)}
            >
              Vrai
            </button>
            <button
              className={getClass("q6", false)}
              onClick={() => handleSelect("q6", false)}
            >
              Faux
            </button>
          </div>
        </div>
      </div>
  

      {score && <ScoreCardEnhanced score={score} />}

     
<div className="spaces"></div>
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
          Recommencer ↻
        </button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">
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
