import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه
import "./Page22_Q1.css"
const Page5_Q2_SAppeler = () => {
  // === STATE ===
  const [answers, setAnswers] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: ""
  });
  const [score, setScore] = useState(null);

  // ✅ حالة لون الإجابات
  const [answerStatus, setAnswerStatus] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: ""
  });

  // === الإجابات النموذجية ===
  const correctAnswers = {
    a: "s’appelle",
    b: "s’appellent",
    c: "appelles",
    d: "nous appelons",
    e: "s’appellent",
    f: "appelez",
    g: "s’appelle",
    h: "s’appellent",
    i: "s’appelle"
  };

  // === النصوص الأصلية للأسئلة مع الفراغات ____
  const questions = {
    a: "Il ____ Quentin",
    b: "Elles ____ Camille et Ana.",
    c: "Comment t’ ____ -tu ?",
    d: "Nous ____Théo et Robert",
    e: "Les garçons ____Éric et Lucas.",
    f: "Comment vous ____-vous ?",
    g: "Mon amie ____Nina.",
    h: "Ils____Mathis et Tom.",
    i: "Mon professeur____monsieur Dupois."
  };

  // ✅ HANDLE CHANGE
  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // إعادة ضبط اللون عند الكتابة
    setAnswerStatus(prev => ({ ...prev, [key]: "" }));
  };

  // ✅ CHECK ANSWER
const checkAnswer = () => {
  const newStatus = {};
  let correctCount = 0;
  let incomplete = false;

  Object.keys(correctAnswers).forEach(key => {
    const val = answers[key]?.trim();
    if (!val) incomplete = true;

    const isCorrect = val === correctAnswers[key];
    newStatus[key] = isCorrect ? "correct" : "wrong";

    if (isCorrect) correctCount++;
  });

  setAnswerStatus(newStatus);

  const total = Object.keys(correctAnswers).length;

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Please fill in all fields.",
      `${correctCount}/${total}`
    );
    setScore(null); // منع ظهور ScoreCard
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
  setAnswers({ ...correctAnswers });

  const newStatus = {};
  Object.keys(correctAnswers).forEach(key => {
    newStatus[key] = "correct";
  });
  setAnswerStatus(newStatus);

  const total = Object.keys(correctAnswers).length;
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
  const emptyStatus = {};
  Object.keys(correctAnswers).forEach(key => {
    emptyAnswers[key] = "";
    emptyStatus[key] = "";
  });

  setAnswers(emptyAnswers);
  setAnswerStatus(emptyStatus);
  setScore(null); // إعادة تعيين ScoreCard
};


  // ✅ دالة لتحديد لون الخلفية حسب الحالة
  const getInputStyle = (key) => {
    if (answerStatus[key] === "correct") return { backgroundColor: "#d4f4dd" }; // أخضر فاتح
    if (answerStatus[key] === "wrong") return { backgroundColor: "#f8d7da" }; // أحمر فاتح
    return {};
  };

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#eaaa52",color:"#3fadb7", }} className="ex-A">Grammaire </span> <span style={{color:"black"}} className="number-of-q">1</span>
Complète les phrases avec le verbe « s’appeler ».

      </header>

      {/* ✅ QUESTIONS */}
        <div className="page22Q1" style={{marginLeft:"13%"}}>
        <div className="inputs-column">
          {Object.keys(questions).map((key, index) => (
            <div className="input-group" key={key}>
              <label>
                <strong style={{fontSize:"20px"}}>{String.fromCharCode(97 + index)} </strong>
                {questions[key].split("____")[0]}
                <input
                  type="text"
                  value={answers[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{ width: "180px", margin: "0 5px", ...getInputStyle(key) }}
                />
                {questions[key].split("____")[1]}
              </label>
            </div>
          ))}
        </div>
      </div>
      {score && <ScoreCardEnhanced score={score} />}
<div className="spaces"></div>
      {/* Action Buttons */}
      <div className="action-buttons-container flex gap-4">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q2_SAppeler;
