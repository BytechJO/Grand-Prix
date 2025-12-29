import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page22_Q4.css";
import flag1 from "../../../assets/unit1/Unit1page22Q4/flag1.svg";
import flag2 from "../../../assets/unit1/Unit1page22Q4/flag2.svg";
import flag3 from "../../../assets/unit1/Unit1page22Q4/flag3.svg";
import flag4 from "../../../assets/unit1/Unit1page22Q4/flag4.svg";
import flag5 from "../../../assets/unit1/Unit1page22Q4/flag5.svg";
import flag6 from "../../../assets/unit1/Unit1page22Q4/flag6.svg";
import flag7 from "../../../assets/unit1/Unit1page22Q4/flag7.svg";
import flag8 from "../../../assets/unit1/Unit1page22Q4/flag8.svg";
import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
const [wrongIndexes, setWrongIndexes] = useState([]);

  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState(["", "", "", "", "","",""]);

  const correctAnswers = [
    "est anglaise",
    "sommes italiens",
    "amis sont japonais.",
    "suis français",
    "sont argentins",
    "est canadienne",
    "est allemand",
    "sont suédoises"
  ];

const checkAnswer = () => {
  let correctCount = 0;
  let wrongs = [];

  answers.forEach((ans, i) => {
    if (ans.trim() === correctAnswers[i]) {
      correctCount++;
    } else {
      wrongs.push(i);
    }
  });

  setWrongIndexes(wrongs);
  setScore({ correct: correctCount, total: correctAnswers.length });

  if (correctCount === correctAnswers.length) {
    ValidationAlert.success(
      `Excellent! (${correctCount}/${correctAnswers.length})`,
      "All answers are correct!"
    );
  } else {
    ValidationAlert.error(
      `You got ${correctCount} out of ${correctAnswers.length}`,
      "Try again!"
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
    setAnswers(["", "", "", "", "","","",""]);
    setScore(null);
  };

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="page-wrapper4 flex flex-col items-center justify-start gap-8 p-4">

      {/* العنوان */}
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#eaaa52", color: "#3fadb7" }} className="ex-A">
          Grammaire
        </span>
        <span className="number-of-q"> 3</span>
        Écris l’âge de chaque personne. Utilise le verbe « avoir »
      </header>

      {/* الأسئلة */}
      <div className="questions-container4">
        {[
          { label: "a", text: "Elle", flag: flag1 },
          { label: "b", text: "Nous", flag: flag2 },
          { label: "c", text: "Mes amis", flag: flag3 },
          { label: "d", text: "Je", flag: flag4 },
          { label: "e", text: "Ils", flag: flag5 },
          { label: "f", text: "Lea", flag: flag6 },
          { label: "g", text: "Il", flag: flag7 },
          { label: "h", text: "Elles", flag: flag8 },
        ].map((item, index) => (
          <div key={index} className="question-row1">
            <div className="left-part4">
              <span className="question-letter4">{item.label}</span>
              <span className="question-text4">{item.text}</span>
            <input
  type="text"
  className={`answer-input4 ${
    wrongIndexes.includes(index) ? "wrong-input" : ""
  }`}
  value={answers[index]}
  onChange={(e) => handleInputChange(index, e.target.value)}
/>

            </div>
            <img src={item.flag} alt="flag" className="flag-img" />
          </div>
        ))}
      </div>
<div className="spaces"></div>
      {score && <ScoreCardEnhanced score={score} />}

      {/* الأزرار */}
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
