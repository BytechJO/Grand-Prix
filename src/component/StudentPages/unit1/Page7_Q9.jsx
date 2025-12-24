import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/1.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Check } from "lucide-react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./CSSPAGE/P6U1.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  // ✅ QUESTIONS DATA (من Q7 كما هي)
  const sentences = [
    { id: 'a', text: 'Il y a cinq garçons sur la rampe.' },
    { id: 'b', text: 'Ils se disent « Salut ».' },
    { id: 'c', text: 'Un garçon tombe.' },
    { id: 'd', text: 'Un autre garçon dit que son saut est horrible.' },
    { id: 'e', text: 'Il lui demande son nom.' },
    { id: 'f', text: 'Les noms des deux garçons sont Éric et Daniel' }
  ];

  const correctAnswers = ['e', 'b', 'f'];

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
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ✅ CHECK ANSWER
const checkAnswer = () => {
  let correctCount = 0;

  sentences.forEach(s => {
    if (
      (checked[s.id] && correctAnswers.includes(s.id)) ||
      (!checked[s.id] && !correctAnswers.includes(s.id))
    ) {
      correctCount++;
    }
  });

  setShowFeedback(true);

  const total = sentences.length;

  // ✅ تحديث ScoreCardEnhanced
  setScore({ correct: correctCount, total });

  // التنبيهات
  if (correctCount === total) {
    ValidationAlert.success(
      `You got all answers right! (${correctCount}/${total})`,
      "Excellent work!"
    );
  } else if (correctCount === 0) {
    ValidationAlert.error(
      `All answers are incorrect. (${correctCount}/${total})`,
      "Try again!"
    );
  } else {
    ValidationAlert.info(
      `You got ${correctCount} out of ${total} correct.`,
      "Almost there!"
    );
  }
};


  // ✅ SHOW ANSWER
 const showAnswerFunc = () => {
  const correctMap = {};
  sentences.forEach(s => {
    correctMap[s.id] = correctAnswers.includes(s.id);
  });
  setChecked(correctMap);
  setShowFeedback(true);

  // تحديث ScoreCard بعد عرض الإجابات الصحيحة
  const total = sentences.length;
  const correctCount = total;
  setScore({ correct: correctCount, total });

  ValidationAlert.success(
    "Réponses affichées",
    "Les phrases correctes sont cochées.",
    `${correctCount}/${total}`
  );
};


  // ✅ RESET
 const resetExercise = () => {
  setChecked({});
  setShowFeedback(false);
  setScore(null); // إعادة تعيين ScoreCard
  resetAudio();

  if (ValidationAlert && typeof ValidationAlert.close === 'function') {
    ValidationAlert.close();
  }
};


  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">

     
      {/* Question Header */}
 <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">9</span>Trouve les trois phrases correctes (✔️ ).
      </header>

      {/* ✅ QUESTIONS LIST */}
      <div className="q7-card">
     <div className="q7-sentences-list">
  {sentences.map(sentence => {
    const isCorrect = correctAnswers.includes(sentence.id);
    const userChecked = !!checked[sentence.id];

    return (
      <div
        key={sentence.id}
        className={`q7-sentence-item ${userChecked ? 'selected' : ''} ${
          showFeedback ? (userChecked === isCorrect ? 'correct' : 'incorrect') : ''
        }`}
        onClick={() => toggleCheck(sentence.id)}
      >
        <div className="q7-check-button">
          <Check className="q7-check-icon" strokeWidth={3} />
        </div>
        <div className="q7-sentence-text">
          <span className="q7-sentence-id">{sentence.id})</span>
          <span className="q7-sentence-content">{sentence.text}</span>
        </div>
      </div>
    );
  })}
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
