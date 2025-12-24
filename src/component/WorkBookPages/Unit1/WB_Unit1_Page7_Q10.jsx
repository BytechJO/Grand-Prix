import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page7_Q10.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const WB_Unit1_Page7_Q10 = () => {
  // الحالة لكل جملة
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
    l: "",
    m: "",
  });
  const [score, setScore] = useState(null);

  // لتخزين ألوان النتائج بعد التحقق
  const [resultColors, setResultColors] = useState({});

  const handleChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setResultColors({ ...resultColors, [key]: "" }); // إعادة اللون عند تعديل الإجابة
  };

  // الإجابات الصحيحة
  const correctAnswers = {
    a: "ai douze ans.",
    b: "avons huit ans.",
    c: "ont quinze ans.",
    d: "ont sept ans.",
    e: "avez dix-huit ans.",
    f: "ont neuf ans.",
    g: "a trois ans",
    h: "a six ans.",
    i: "as onze ans.",
    j: "avez dix-neuf ans.",
    k: "avons cinq ans.",
    l: "ont quatorze ans.",
    m: "ai treize ans.",
  };

// ✅ CHECK ANSWER
const checkAnswer = () => {
  const colors = {};
  let correctCount = 0;
  let incomplete = false;

  const total = Object.keys(correctAnswers).length;

  for (const key in correctAnswers) {
    const val = answers[key]?.trim();
    if (!val) incomplete = true;

    const isCorrect = val?.toLowerCase() === correctAnswers[key].toLowerCase();
    colors[key] = isCorrect ? "green" : "red";

    if (isCorrect) correctCount++;
  }

  setResultColors(colors);

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Please fill in all fields.",
      `${correctCount}/${total}`
    );
    setScore(null); // منع ظهور ScoreCard
    return;
  }

  setScore({ correct: correctCount, total });

  const overallColor =
    correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

  if (correctCount === total) {
    ValidationAlert.success(
      "Excellent!",
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
    ValidationAlert.error(
      "Almost there!",
      `You got ${correctCount} out of ${total} correct.`,
      `${correctCount}/${total}`
    );
  }
};

// ✅ SHOW ANSWER
const showAnswerFunc = () => {
  setAnswers({ ...correctAnswers });

  const colors = {};
  Object.keys(correctAnswers).forEach(key => {
    colors[key] = "green";
  });
  setResultColors(colors);

  const total = Object.keys(correctAnswers).length;
  setScore({ correct: total, total });

  ValidationAlert.success(
    "Answers shown",
    "All correct answers have been filled in.",
    `${total}/${total}`
  );
};

// ✅ RESET
const resetExercise = () => {
  const emptyAnswers = {};
  const emptyColors = {};
  Object.keys(correctAnswers).forEach(key => {
    emptyAnswers[key] = "";
    emptyColors[key] = "";
  });

  setAnswers(emptyAnswers);
  setResultColors(emptyColors);
  setScore(null); // إعادة تعيين ScoreCard
};


  // الجمل النموذجية
  const sentences = [
    { id: "a", text: "J'", placeholder: "..." },
    { id: "b", text: "Nous", placeholder: "..." },
    { id: "c", text: "Mes sœurs", placeholder: "..." },
    { id: "d", text: "Pierre et Jacques", placeholder: "..." },
    { id: "e", text: "Vous", placeholder: "..." },
    { id: "f", text: "Isabelle et Anna", placeholder: "..." },
    { id: "g", text: "Il", placeholder: "..." },
    { id: "h", text: "Mon amie", placeholder: "..." },
    { id: "i", text: "Tu", placeholder: "..." },
    { id: "j", text: "Vivien et toi", placeholder: "..." },
    { id: "k", text: "Natalie et moi", placeholder: "..." },
    { id: "l", text: "Elles", placeholder: "..." },
    { id: "m", text: "J'", placeholder: "..." },
  ];

  const ages = [12, 8, 15, 7, 18, 9, 3, 6, 11, 19, 5, 14, 13];

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">10</span>
 Complète les phrases en utilisant les mots entre parenthèses.

      </header>

      {/* Questions Grid */}
      <div className="questions-grid w-full max-w-3xl">
        {sentences.map((sentence, index) => (
          <div
            key={sentence.id}
            className="sentence-row flex items-center gap-2 mb-4"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="sentencee-label font-medium min-w-[120px]">
                {sentence.text}
              </span>
              <input
                type="text"
                value={answers[sentence.id]}
                onChange={(e) => handleChange(sentence.id, e.target.value)}
                placeholder={sentence.placeholder}
                className="answer-input flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                style={{
                  backgroundColor:
                    resultColors[sentence.id] === "green"
                      ? "#d4f7d4" // أخضر فاتح جدًا
                      : resultColors[sentence.id] === "red"
                      ? "#fddddd" // أحمر فاتح جدًا
                      : "white", // افتراضي
                }}
              />

              <span className="age-info italic">(avoir / {ages[index]})</span>
            </div>
          </div>
        ))}
      </div>

      <div className="spaces"></div>
      {score && <ScoreCardEnhanced score={score} />}

      {/* Action Buttons */}
      <div className="action-buttons-container mt-8">
        <button onClick={resetExercise} className="try-again-button">
         Recommencer ↻
        </button>
        <button
          onClick={showAnswerFunc}
          className="show-answer-btn swal-continue"
        >
         Afficher la réponse
        </button>
        <button onClick={checkAnswer} className="check-button2">
        Vérifier la réponse✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page7_Q10;
