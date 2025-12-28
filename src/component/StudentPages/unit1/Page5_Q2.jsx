import React, { useState, } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/1.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert"; // <--- هنا
import "./CSSPAGE/Q5U1.css";
import img1 from '../../../assets/unit1/imgs/QU1/Q1/10.svg';
import img2 from '../../../assets/unit1/imgs/QU1/Q1/11.svg';
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

// ====== البيانات ======
const initialSituations = [
    { id: 1, text: 'À un(e) ami(e)', correct: 'La bise', userGuess: null, isCorrect: null },
    { id: 2, text: 'À ma soeur / mon frère', correct: 'La bise', userGuess: null, isCorrect: null },
    { id: 3, text: 'À un(e) inconnu(e)', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 4, text: 'À un professeur', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 5, text: 'À un(e) vendeur(euse)', correct: 'La main', userGuess: null, isCorrect: null },
    { id: 6, text: 'À ma mère', correct: 'La bise', userGuess: null, isCorrect: null },
];


const PageWithAudioAndQuestions = () => {
  // ====== Audio ======


  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة



  // ====== Questions ======
  const [situations, setSituations] = useState(initialSituations);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (id, greeting) => {
    if (showFeedback) return;

    setSituations(prev =>
      prev.map(s => s.id === id ? { ...s, userGuess: greeting } : s)
    );
  };

const checkAnswers = () => {
  // تحقق من كل إجابة
  const checked = situations.map(s => ({
    ...s,
    isCorrect: s.userGuess === s.correct
  }));
  setSituations(checked);
  setShowFeedback(true);

  const correctCount = checked.filter(s => s.isCorrect).length;
  const total = situations.length;

  // تحديث ScoreCardEnhanced
  setScore({ correct: correctCount, total });

  // عرض التنبيهات
  if (correctCount === total) {
    ValidationAlert.success(
      `You got all answers right! (${total})`,
      "Excellent work!",
      `${correctCount}/${total}`
    );
  } else if (correctCount === 0) {
    ValidationAlert.info(
      `All answers are incorrect. Try again.`,
      "تحذير ⚠️"
    );
  } else {
    ValidationAlert.error(
      `You answered ${correctCount} out of ${total} correctly.`,
      `${correctCount}/${total}`
    );
  }
};

const showCorrectAnswer = () => {
  const corrected = situations.map(s => ({ ...s, userGuess: s.correct }));
  setSituations(corrected);
  setShowFeedback(true);
};

const resetExercise = () => {
  setSituations(initialSituations);
  setShowFeedback(false);
  setScore(null); // إعادة تعيين الـ ScoreCard
};



  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
 
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">2</span>Je serre la main ou je fais la bise ?
      </header>

      {/* Questions Section */}
   <div className="exercise1-content">
  <div className="situations-list">
    {situations.map(situation => (
      <div key={situation.id} className="situation-card">
        <div className="situation-text">{situation.text}</div>

        <div className="greeting-options">
          <select
            value={situation.userGuess || ''}
            onChange={(e) => handleSelect(situation.id, e.target.value)}
            disabled={showFeedback}
          >
            <option value="" disabled>Select</option>
            <option value="La main">La main</option>
            <option value="La bise">La bise</option>
          </select>
        </div>

        {showFeedback && situation.isCorrect !== null && (
          <div className={`feedback-icon ${situation.isCorrect ? 'correct' : 'incorrect'}`}>
            {situation.isCorrect ? '✓' : '✕'}
          </div>
        )}
      </div>
    ))}
  </div>

  <div className="Q2U1">
    <img style={{width:"100%",height:"100%"}} src={img1} alt="" />
    <img style={{width:"100%",height:"100%"}} src={img2} alt="" />
  </div>
  
</div>
<div className="spaces"></div>
   <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showCorrectAnswer} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswers} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default PageWithAudioAndQuestions;
