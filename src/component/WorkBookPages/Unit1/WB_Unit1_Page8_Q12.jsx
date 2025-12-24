import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page8_Q12.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q1_CleanAudio = () => {
  // ✅ الحالة لتخزين إجابات التمرين الجديد
  const [answers, setAnswers] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: "",
    i: "",
    j: "",
    k: "",
    l: ""
  });
  const [score, setScore] = useState(null);

  // ✅ الإجابات الصحيحة
  const correctAnswers = {
    a: "être",
    b: "avoir",
    c: "être",
    d: "avoir",
    e: "avoir",
    f: "être",
    g: "avoir",
    h: "avoir",
    i: "être",
    j: "être",
    k: "avoir",
    l: "avoir"
  };
const [answerStatus, setAnswerStatus] = useState({});

  // ✅ تحديث الإجابة
  const handleAnswerChange = (question, value) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value.trim()
    }));
  };

  // ✅ التحقق من الإجابات
 // ✅ CHECK ANSWER
const checkAnswer = () => {
  const newStatus = {};
  let correctCount = 0;
  let incomplete = false;

  const totalQuestions = Object.keys(correctAnswers).length;

  // التحقق من كل الإجابات وحساب النتيجة
  Object.keys(correctAnswers).forEach(key => {
    const val = answers[key]?.trim();
    if (!val) incomplete = true;

    const isCorrect = val?.toLowerCase() === correctAnswers[key].toLowerCase();
    newStatus[key] = isCorrect ? "correct" : "wrong";

    if (isCorrect) correctCount++;
  });

  setAnswerStatus(newStatus);

  if (incomplete) {
    ValidationAlert.info(
      "Attention!",
      "Veuillez remplir tous les champs.",
      `${correctCount}/${totalQuestions}`
    );
    setScore(null); // منع ظهور ScoreCard
    return;
  }

  setScore({ correct: correctCount, total: totalQuestions });

  const color =
    correctCount === totalQuestions ? "green" :
    correctCount === 0 ? "red" : "orange";

  const msg = `
    <div style="font-size:20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${totalQuestions}
      </span>
    </div>
  `;

  if (correctCount === totalQuestions) ValidationAlert.success(msg);
  else if (correctCount === 0) ValidationAlert.error(msg);
  else ValidationAlert.warning(msg);
};

// ✅ SHOW ANSWER
const showAnswerFunc = () => {
  setAnswers({ ...correctAnswers });

  const newStatus = {};
  Object.keys(correctAnswers).forEach(key => {
    newStatus[key] = "correct";
  });
  setAnswerStatus(newStatus);

  const totalQuestions = Object.keys(correctAnswers).length;
  setScore({ correct: totalQuestions, total: totalQuestions });

  ValidationAlert.info(
    "Réponses affichées",
    "Toutes les réponses correctes ont été remplies.",
    `${totalQuestions}/${totalQuestions}`
  );
};

// ✅ RESET EXERCISE
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


  return (
   <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">12</span>
Écris l’infinitif du verbe « avoir » ou « être ».

      </header>

      {/* ✅ QUESTIONS CONTAINER */}
<div className="questions-container">
  {/* الصف الأول */}
  <div className="question-row1">
    <div className="question-item">
      <p className="sentence">a. Vous êtes brésiliens ?</p>
      <input
        type="text"
        className="answer-input"
        value={answers.a}
        onChange={(e) => handleAnswerChange('a', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['a'] === "correct" ? "#d4edda" :
            answerStatus['a'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">b. Nous avons dix ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.b}
        onChange={(e) => handleAnswerChange('b', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['b'] === "correct" ? "#d4edda" :
            answerStatus['b'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">c. Elles sont américaines.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.c}
        onChange={(e) => handleAnswerChange('c', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['c'] === "correct" ? "#d4edda" :
            answerStatus['c'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
  </div>

  {/* الصف الثاني */}
  <div className="question-row1">
    <div className="question-item">
      <p className="sentence">d. Elles ont onze ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.d}
        onChange={(e) => handleAnswerChange('d', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['d'] === "correct" ? "#d4edda" :
            answerStatus['d'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">e. J'ai douze ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.e}
        onChange={(e) => handleAnswerChange('e', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['e'] === "correct" ? "#d4edda" :
            answerStatus['e'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">f. Nous sommes russes.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.f}
        onChange={(e) => handleAnswerChange('f', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['f'] === "correct" ? "#d4edda" :
            answerStatus['f'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
  </div>

  {/* الصف الثالث */}
  <div className="question-row1">
    <div className="question-item">
      <p className="sentence">g. Tu as treize ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.g}
        onChange={(e) => handleAnswerChange('g', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['g'] === "correct" ? "#d4edda" :
            answerStatus['g'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">h. Pierre a seize ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.h}
        onChange={(e) => handleAnswerChange('h', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['h'] === "correct" ? "#d4edda" :
            answerStatus['h'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">i. Pierre est anglais.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.i}
        onChange={(e) => handleAnswerChange('i', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['i'] === "correct" ? "#d4edda" :
            answerStatus['i'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
  </div>

  {/* الصف الرابع */}
  <div className="question-row1">
    <div className="question-item">
      <p className="sentence">j. Ils sont belges.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.j}
        onChange={(e) => handleAnswerChange('j', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['j'] === "correct" ? "#d4edda" :
            answerStatus['j'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">k. Ils ont vingt ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.k}
        onChange={(e) => handleAnswerChange('k', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['k'] === "correct" ? "#d4edda" :
            answerStatus['k'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
    
    <div className="question-item">
      <p className="sentence">l. J'ai deux ans.</p>
      <input
        type="text"
        className="answer-input"
        value={answers.l}
        onChange={(e) => handleAnswerChange('l', e.target.value)}
        placeholder="écris ici..."
        style={{
          backgroundColor:
            answerStatus['l'] === "correct" ? "#d4edda" :
            answerStatus['l'] === "wrong" ? "#f8d7da" :
            "white"
        }}
      />
    </div>
  </div>
</div>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;