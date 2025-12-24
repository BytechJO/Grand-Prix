import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./CSSPAGE/Q11.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه
import img1 from "../../../assets/unit1/page10svg/SAP8.svg"
const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);

  // ✅ Q11 STATE
  const [answers, setAnswers] = useState({
    blank1: '',
    blank2: '',
    blank3: '',
    blank4: '',
    blank5: ''
  });

  const inputRefs = {
    blank1: useRef(null),
    blank2: useRef(null),
    blank3: useRef(null),
    blank4: useRef(null),
    blank5: useRef(null),
  };

  const correctAnswers = {
    blank1: 'Monsieur Antoine',
    blank2: 'm’appelle',
    blank3: 'je',
    blank4: 'comment',
    blank5: 'Marie'
  };
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (blank, value) => {
    setAnswers(prev => ({
      ...prev,
      [blank]: value
    }));
  };

  // ✅ CHECK (Q11)
  const checkAnswer = () => {
  const blanks = Object.keys(correctAnswers);
  let correctCount = 0;
  let incomplete = false;

  blanks.forEach(blank => {
    const val = answers[blank]?.trim();
    if (!val) incomplete = true;
    if (val?.toLowerCase() === correctAnswers[blank].toLowerCase()) {
      correctCount++;
    }
  });

  const total = blanks.length;

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Some answers are missing.",
      `${correctCount}/${total}`
    );
  } else {
    // تحديث ScoreCardEnhanced
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(
        "Good Job!",
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
      ValidationAlert.warning(
        "Some answers are incorrect.",
        `You got ${correctCount} out of ${total} correct.`,
        `${correctCount}/${total}`
      );
    }
  }

  setShowResults(true);
};


  // ✅ SHOW ANSWER
 const showAnswerFunc = () => {
  setAnswers(correctAnswers);
  setShowResults(true);

  const total = Object.keys(correctAnswers).length;
  const correctCount = total;

  // تحديث ScoreCard بعد عرض الإجابات الصحيحة
  setScore({ correct: correctCount, total });

  ValidationAlert.success(
    "Answers shown",
    "All correct answers have been filled in.",
    `${correctCount}/${total}`
  );
};


  // ✅ RESET
const resetExercise = () => {
  const emptyAnswers = {};
  Object.keys(correctAnswers).forEach(blank => {
    emptyAnswers[blank] = "";
  });

  setAnswers(emptyAnswers);
  setShowResults(false);
  setScore(null); // إعادة تعيين ScoreCard
};


  const isCorrect = (blank) => {
    if (!showResults) return null;
    return answers[blank].trim().toLowerCase() === correctAnswers[blank].toLowerCase();
  };

  const getInputClass = (blank) => {
    if (!showResults) return 'q11-input-default';
    return isCorrect(blank) ? 'q11-input-correct' : 'q11-input-incorrect';
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">

      {/* Question Header */}
 <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">11</span>Lis et écris l’information manquante.
      </header>

      {/* ✅ Q11 WORD BANK */}
      <div className="q11-word-bank">
        <div className="q11-word-list">
          {Object.values(correctAnswers).map((word, index) => (
            <span key={index} className="q11-word">{word}</span>
          ))}
        </div>
      </div>

      
{/* ✅ Q11 QUESTIONS */}

<div className="q11-questions-container">
  <div className="imgexrsize">
    <img src={img1} alt="" />
  </div>

  <div className="q11-question-lines-wrapper">
    <div className="q11-question-line">
      <span className="q11-text">- Bonjour à tous, je m'appelle</span>
      <input
        ref={inputRefs.blank1}
        type="text"
        value={answers.blank1}
        onChange={(e) => handleInputChange('blank1', e.target.value)}
        className={`q11-input ${getInputClass('blank1')}`}
        disabled={showResults}
      />
      <span className="q11-text">.</span>
    </div>

    <div className="q11-question-line">
      <span className="q11-text">- Bonjour, je</span>
      <input
        ref={inputRefs.blank2}
        type="text"
        value={answers.blank2}
        onChange={(e) => handleInputChange('blank2', e.target.value)}
        className={`q11-input ${getInputClass('blank2')}`}
        disabled={showResults}
      />
      <span className="q11-text">Mark.</span>
    </div>

    <div className="q11-question-line">
      <span className="q11-text">- Bonjour, monsieur Antoine,</span>
      <input
        ref={inputRefs.blank3}
        type="text"
        value={answers.blank3}
        onChange={(e) => handleInputChange('blank3', e.target.value)}
        className={`q11-input ${getInputClass('blank3')}`}
        disabled={showResults}
      />
      <span className="q11-text">m'appelle Claire.</span>
    </div>

    <div className="q11-question-line">
      <span className="q11-text">- Bonjour, Claire. Et vous,</span>
      <input
        ref={inputRefs.blank4}
        type="text"
        value={answers.blank4}
        onChange={(e) => handleInputChange('blank4', e.target.value)}
        className={`q11-input ${getInputClass('blank4')}`}
        disabled={showResults}
      />
      <span className="q11-text">vous appelez-vous ?</span>
    </div>

    <div className="q11-question-line">
      <span className="q11-text">- Je m'appelle</span>
      <input
        ref={inputRefs.blank5}
        type="text"
        value={answers.blank5}
        onChange={(e) => handleInputChange('blank5', e.target.value)}
        className={`q11-input ${getInputClass('blank5')}`}
        disabled={showResults}
      />
      <span className="q11-text">.</span>
    </div>
  </div>
</div>



      
<div className="spaces"></div>
     {score && <ScoreCardEnhanced score={score} />}

      {/* ✅ ACTION BUTTONS (كما هي تمامًا) */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>

    </div>
  );
};

export default Page5_Q1_CleanAudio;
