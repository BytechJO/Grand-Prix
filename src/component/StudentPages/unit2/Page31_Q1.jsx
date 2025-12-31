import React, { useState, useRef } from "react";
import imgBackground from "../../../assets/unite2pages/svg/page31Q1.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

/* 🔴 القائمة */
const numbersList = [
  { id: "a", label: "Je suis sud-africain(e)." },
  { id: "b", label: "Je suis canadien(ne)." },
  { id: "c", label: "Je suis indien(ne)." },
  { id: "d", label: "Je suis américain(e)." },
  { id: "e", label: "Je suis finlandais(e)." },
  { id: "f", label: "Je suis australien(ne)." },
  { id: "g", label: "Je suis australien(ne)." },
  { id: "h", label: "Je suis australien(ne)." },
  { id: "i", label: "Je suis australien(ne)." },
  { id: "j", label: "Je suis australien(ne)." },
];

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
  const audioRef = useRef(null);
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrent(0);
    }
  };

  /* 🔴 تحديث الـ input */
  const handleInputChange = (index, value) => {
    if (/^[A-Za-z]?$/.test(value)) {
      setInputs({ ...inputs, [index]: value.toLowerCase() });
    }
  };

  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach((key) => {
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
    resetAudio();
  };

  /* 🔴 مواقع الـ inputs فوق الصورة */
  const inputPositions = [
    { id: 0, top: "30%", left: "16%" },
    { id: 1, top: "45%", left: "22%" },
    { id: 2, top: "69%", left: "33%" },
    { id: 3, top: "30%", left: "47%" },
    { id: 4, top: "42%", left: "43%" },
    { id: 5, top: "76%", left: "47%" },
    { id: 6, top: "75%", left: "70%" },
    { id: 7, top: "50%", left: "70%" },
    { id: 8, top: "52%", left: "58%" },
    { id: 9, top: "30%", left: "75%" },
  ];

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
        <span className="ex-A" style={{ backgroundColor: "#df4f89" }}>
          B
        </span>
        <span className="number-of-q">1</span> Liste les mots masculins et
        féminins de l'exercice 1. Ensuite, mets chaque mot au pluriel.
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise */}
      <div
        className="exercise-container"
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {/* القائمة على اليسار */}
        <div
          className="numbers-list"
          style={{
            width: "25%",
            overflowY: "auto",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "10px",
            }}
          >
            {numbersList.map((item) => {
              // 🔹 أي حرف مطابق لـ item.id يصبح أزرق
              const isUsed = Object.values(inputs).some(
                (val) => val === item.id
              );
              return (
                <li
                  key={item.id}
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    display: "flex",
                    gap: "8px",
                    fontWeight: "bold",
                    color: isUsed ? "blue" : "black",
                  }}
                >
                  <span>{item.id}.</span>
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* الصورة على اليمين */}
        <div
          className="image2-container"
          style={{
            position: "relative",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={imgBackground}
            alt="Exercise"
            style={{
              width: "70%",
              height: "20%",
            }}
          />

          {inputPositions.map((pos) => (
            <input
              key={pos.id}
              type="text"
              maxLength="1"
              className="number-input"
              value={inputs[pos.id] || ""}
              onChange={(e) => handleInputChange(pos.id, e.target.value)}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: "3%",
                height: "5%",
                textAlign: "center",
                fontSize: "18px",
                border: "2px solid #f48684",
                backgroundColor: "white",
              }}
            />
          ))}
        </div>
      </div>

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
