import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page17_Q3.css";
import background from "../../../assets/unit1/sectionD/P17Q3.svg";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

const Page5_Q1_CleanAudio = () => {
  const TOTAL_ROWS = 7;

  // 🟦 القيم المدخلة
  const [col1, setCol1] = useState(Array(TOTAL_ROWS).fill(""));
  const [col2, setCol2] = useState(Array(TOTAL_ROWS).fill(""));

  const [score, setScore] = useState(null);

  // 🟩 الإجابات الصحيحة
  const correctCol1 = ["Masculin", "Suédois", "Espagnol", "Italien", "Belge", "Coréen", "Turc"];
  const correctCol2 = ["Féminin", "Suédoise", "Espagnole", "Italienne", "Belge", "Coréenne", "Turque"];

  // 🟨 القيم الثابتة لكل خانة (يمكنك تعديلها كما تحب)
  const fixedValuesCol1 = ["Masculin", "Suédois", "Espagnol", null, "Belge", "Coréen", null];
  const fixedValuesCol2 = ["Féminin", null, null, "Italienne", null, null, "Turque"];

  // 🔄 RESET
  const resetExercise = () => {
    setCol1(Array(TOTAL_ROWS).fill(""));
    setCol2(Array(TOTAL_ROWS).fill(""));
    setScore(null);
  };

  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    const allValues = [...col1, ...col2];

    if (allValues.some((v) => !v.trim())) {
      ValidationAlert.info("Attention!", "Veuillez remplir toutes les cases.");
      return;
    }

    let correctCount = 0;

    col1.forEach((val, i) => {
      if (val.trim().toLowerCase() === correctCol1[i].toLowerCase()) {
        correctCount++;
      }
    });

    col2.forEach((val, i) => {
      if (val.trim().toLowerCase() === correctCol2[i].toLowerCase()) {
        correctCount++;
      }
    });

    const total = TOTAL_ROWS * 2;
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(`Excellent! (${correctCount}/${total})`, "All answers are correct!");
    } else if (correctCount === 0) {
      ValidationAlert.error(`All answers are incorrect. (${correctCount}/${total})`, "Try again!");
    } else {
      ValidationAlert.error(`You got ${correctCount} out of ${total} correct.`, "Almost there!");
    }
  };

  // 👁 SHOW ANSWER
  const showAnswerFunc = () => {
    setCol1(correctCol1);
    setCol2(correctCol2);

    const total = TOTAL_ROWS * 2;
    setScore({ correct: total, total });

    ValidationAlert.success(
      "Answers shown",
      "The correct answers have been placed.",
      `${total}/${total}`
    );
  };

  return (
 <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
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
        <span className="ex-A" style={{ backgroundColor: "#73C8D2" }}>D</span>{" "}
        <span className="number-of-q">3</span>{" "}
       Complète le tableau.
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* 🟨 TABLE */}
      <div
        className="table-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* العمود الأيسر */}
        <div className="table-column1">
          {col1.map((value, index) => {
            const isFixed = fixedValuesCol1[index] !== null;

            return (
              <input
                key={index}
                className="table-input1"
                value={isFixed ? fixedValuesCol1[index] : value}
                readOnly={isFixed}
                onChange={(e) => {
                  if (!isFixed) {
                    const updated = [...col1];
                    updated[index] = e.target.value;
                    setCol1(updated);
                  }
                }}
              />
            );
          })}
        </div>

        {/* العمود الأيمن */}
        <div className="table-column1">
          {col2.map((value, index) => {
            const isFixed = fixedValuesCol2[index] !== null;

            return (
              <input
                key={index}
                className="table-input1"
                value={isFixed ? fixedValuesCol2[index] : value}
                readOnly={isFixed}
                onChange={(e) => {
                  if (!isFixed) {
                    const updated = [...col2];
                    updated[index] = e.target.value;
                    setCol2(updated);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
<div className="spaces"></div>
      {/* Buttons */}
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
