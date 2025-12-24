import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./CSSPAGE/Q5U1.css";
import img1 from "../../../assets/unit1/sectionD/P22Q3-01.svg";
import img2 from "../../../assets/unit1/sectionD/P22Q3-02.svg";
import img3 from "../../../assets/unit1/sectionD/P22Q3-03.svg";
import img4 from "../../../assets/unit1/sectionD/P22Q3-04.svg";
import img5 from "../../../assets/unit1/sectionD/P22Q3-05.svg";
import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null);

  // ✅ INPUT STATES
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  // ✅ CORRECT ANSWERS
  const correctAnswers = [
    "J’ai quinze ans.",
    "Nous avons dix-sept ans.",
    "Elle a quatorze ans.",
    "Il a seize ans.",
    "Elles ont dix-neuf ans."
  ];

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

  const checkAnswer = () => {
    let correctCount = 0;
    answers.forEach((ans, i) => {
      if (ans.trim() === correctAnswers[i]) correctCount++;
    });

    setScore({ correct: correctCount, total: correctAnswers.length });

    if (correctCount === correctAnswers.length) {
      ValidationAlert.success(
        `Excellent! (${correctCount}/${correctAnswers.length})`,
        "All answers are correct!"
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        `All answers are incorrect. (${correctCount}/${correctAnswers.length})`,
        "Try again!"
      );
    } else {
      ValidationAlert.error(
        `You got ${correctCount} out of ${correctAnswers.length} correct.`,
        "Almost there!"
      );
    }
  };

  const showAnswerFunc = () => {
    setAnswers([...correctAnswers]);
    setScore({ correct: correctAnswers.length, total: correctAnswers.length });
    ValidationAlert.success(
      "Answers shown",
      "The correct answers have been placed.",
      `${correctAnswers.length}/${correctAnswers.length}`
    );
  };

  const resetExercise = () => {
    setAnswers(["", "", "", "", ""]);
    setScore(null);
    resetAudio();
  };

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
    <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#eaaa52", color: "#3fadb7" }} className="ex-A">Grammaire </span>
        <span style={{ color: "black" }} className="number-of-q">3</span>
       Écris l’âge de chaque personne. Utilise le verbe « avoir »
      </header>

   
      {score && <ScoreCardEnhanced score={score} />}

      {/* Questions */}
      <div className="q6-body">
        {[img1, img2, img3, img4, img5].map((img, i) => (
          <div key={i} className="q5-character-group">
            <img src={img} alt={`Character ${i + 1}`} className="q5-character-img" style={{ height: "50%", width: "70%" }} />
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => handleInputChange(i, e.target.value)}
              className="q5-input"
              style={{ height: "50%", width: "70%" }}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
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
