import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";


import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);

  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  // ✅ ANSWERS
  const [] = useState("");
  const [] = useState("");



  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    const correctBoyName = "Antoine";
    const correctGirlName = "Emma";

    if (!boyName.trim() || !girlName.trim()) {
      ValidationAlert.info("Attention!", "Veuillez remplir les deux champs.");
      return;
    }

    const isBoyCorrect =
      boyName.trim().toLowerCase() === correctBoyName.toLowerCase();
    const isGirlCorrect =
      girlName.trim().toLowerCase() === correctGirlName.toLowerCase();

    const correctCount = (isBoyCorrect ? 1 : 0) + (isGirlCorrect ? 1 : 0);
    const total = 2;

    // ✅ تحديث ScoreCardEnhanced
    setScore({ correct: correctCount, total });

    // التنبيهات
    if (correctCount === total) {
      ValidationAlert.success(
        `Excellent! (${correctCount}/${total})`,
        "All answers are correct!"
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        `All answers are incorrect. (${correctCount}/${total})`,
        "Try again!"
      );
    } else {
      ValidationAlert.error(
        `You got ${correctCount} out of ${total} correct.`,
        "Almost there!"
      );
    }
  };

  // ✅ SHOW ANSWER
  const showAnswerFunc = () => {
    setBoyName("Antoine");
    setGirlName("Emma");

    // جميع الإجابات صحيحة بعد العرض
    const total = 2;
    const correctCount = 2;
    setScore({ correct: correctCount, total });

    ValidationAlert.success(
      "Answers shown",
      "The correct names have been placed.",
      `${correctCount}/${total}`
    );
  };

  // ✅ RESET
  const resetExercise = () => {
    setBoyName("");
    setGirlName("");
    setScore(null); // إعادة تعيين ScoreCard
    resetAudio();
  };

  // === Captions state ===
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // === Captions array ===
  const captions = [
    { start: 5, end: 6.9, text: "Grand Prix A1" },
    { start: 7.3, end: 8.2, text: "unité 1" },
    { start: 8.7, end: 9.5, text: " se présenter. " },
    { start: 10.2, end: 11.2, text: "Section A." },
    { start: 11.9, end: 12.3, text: "Salut." },
    { start: 12.9, end: 14.3, text: "Exercice 5" },
    { start: 15.23, end: 16.77, text: "Écoute et réponds." },
    { start: 18.78, end: 20.31, text: "Je m'appelle Antoine." },
    { start: 21.39, end: 22.51, text: "Je m'appelle Emma." },
  ];
  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      {/* Question Header */}
      <header
 className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">
          A
        </span>{" "}
        <span style={{ color: "black" }} className="number-of-q">
          5
        </span>
        Écoute et réponds.
      </header>
}

      {score && <ScoreCardEnhanced score={score} />}

      {/* ✅ QUESTIONS */}


      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
          Start Again ↻
        </button>
        <button
          onClick={showAnswerFunc}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswer} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
