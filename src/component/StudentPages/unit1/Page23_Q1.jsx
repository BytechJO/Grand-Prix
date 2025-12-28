import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page23_Q1.css";
import img1 from "../../../assets/unit1/sectionD/P23Q1.svg";
import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(null);

  // ✅ MCQ Answers
  const [mcqAnswers, setMcqAnswers] = useState({
    a: "",
    b: "",
    c: ""
  });

  // ✅ Correct MCQ Answers
  const correctAnswers = {
    a: "Lucas",
    b: "Salut à tous !",
    c: "Allemand"
  };

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

  // ✅ Handle MCQ select
  const handleSelect = (question, value) => {
    setMcqAnswers((prev) => ({
      ...prev,
      [question]: value
    }));
  };

  const checkAnswer = () => {
    let correctCount = 0;

    Object.keys(correctAnswers).forEach((key) => {
      if (mcqAnswers[key] === correctAnswers[key]) {
        correctCount++;
      }
    });

    setScore({ correct: correctCount, total: 3 });

    if (correctCount === 3) {
      ValidationAlert.success(
        "Excellent!",
        "All answers are correct!",
        "3/3"
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        "Incorrect!",
        "Try again!",
        "0/3"
      );
    } else {
      ValidationAlert.error(
        "Almost there!",
        `You got ${correctCount} out of 3 correct.`,
        `${correctCount}/3`
      );
    }
  };

  const showAnswerFunc = () => {
    setMcqAnswers({ ...correctAnswers });
    setScore({ correct: 3, total: 3 });

    ValidationAlert.success(
      "Answers shown",
      "The correct answers have been placed.",
      "3/3"
    );
  };

  const resetExercise = () => {
    setMcqAnswers({ a: "", b: "", c: "" });
    setScore(null);
    resetAudio();
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#eaaa52", color: "#3fadb7" }} className="ex-A">DELF </span>
        <span style={{ color: "black" }} className="number-of-q">1</span>
       Écoute le message et réponds aux questions. Coche la bonne réponse. <br /> Chaque réponse
correcte vaut 3 points.
      </header>

      {/* Audio */}
      <audio ref={audioRef} src={CD6_Pg8_Instruction1_AdultLady} />

      {score && <ScoreCardEnhanced score={score} />}

      <div className="question-container">
        <div className="image-box1">
          <img src={img1} alt="Question illustration" />
        </div>

        <div className="mcq-box">
          {/* A */}
          <div className="question-block">
            <p>a. Comment s’appelle-t-il ?</p>
            {["Tom", "Théo", "Lucas"].map((opt,index) => (
              <label key={opt} className="option">
                <input
                  type="radio"
                  name="a"
                  checked={mcqAnswers.a === opt}
                  onChange={() => handleSelect("a", opt)}
                />
                <span className="option-number">{index + 1}.</span> {opt}
                 
              </label>
            ))}
          </div>

          {/* B */}
          <div className="question-block">
            <p>b. Il dit :</p>
            {["Bonjour à tous !", "Salut à tous !", "Merci à tous !"].map((opt,index) => (
              <label key={opt} className="option">
                <input
                  type="radio"
                  name="b"
                  checked={mcqAnswers.b === opt}
                  onChange={() => handleSelect("b", opt)}
                />
              <span className="option-number">{index + 1}.</span> {opt}
              </label>
            ))}
          </div>

          {/* C */}
          <div className="question-block">
            <p>c. Quelle est sa nationalité ?</p>
            {["Américain", "Anglais", "Allemand"].map((opt,index) => (
              <label key={opt} className="option">
                <input
                  type="radio"
                  name="c"
                  checked={mcqAnswers.c === opt}
                  onChange={() => handleSelect("c", opt)}
                />
                 <span className="option-number">{index + 1}.</span> {opt}
              </label>
            ))}
          </div>
        </div>
      </div>
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
