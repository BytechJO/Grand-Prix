import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";
import "./Page22_Q2.css"
const Page5_Q2_SAppeler = () => {
  // === STATE ===
  const [tableAnswers, setTableAnswers] = useState({
    // العمود الأول: Pour se présenter
    col1_row1: "", col1_row2: "", col1_row3: "", col1_row4: "", col1_row5: "",
    // العمود الثاني: Pour saluer quelqu'un
    col2_row1: "", col2_row2: "", col2_row3: "", col2_row4: "", col2_row5: ""
  });

  const [score, setScore] = useState(null);
  const [answerStatus, setAnswerStatus] = useState({});

  // === الكلمات/الجمل في المربع العلوي ===
  const wordBank = [
    "Bonjour, madame Blanc.",
    "Je m’appelle Camille.",
    "Au revoir, monsieur Robert.",
    "Et moi, je m’appelle Lucas",
    "Les amies, c’est Michelle.",
    "Au revoir, les enfants.",
  
  ];

  // === الإجابات الصحيحة ===
  const correctAnswers = {
    // Pour se présenter
    col1_row1: "Bonjour, Madame Blanc.",
    col1_row2: "Je m’appelle Camille.",
    col1_row3: "Et moi, je m’appelle Lucas.",
    col1_row4: "Les amies, c’est Michelle.",
    col1_row5: "", // يمكن ترك بعض الصفوف فارغة

    // Pour saluer quelqu'un
    col2_row1: "Au revoir, Monsieur Robert.",
    col2_row2: "Au revoir, les enfants.",
    col2_row3: "",
    col2_row4: "",
    col2_row5: ""
  };

  // ✅ HANDLE CHANGE للجدول
  const handleTableChange = (cellId, value) => {
    setTableAnswers(prev => ({ ...prev, [cellId]: value }));
    // إعادة ضبط اللون عند الكتابة
    setAnswerStatus(prev => ({ ...prev, [cellId]: "" }));
  };

  // ✅ CHECK ANSWER
// ✅ CHECK ANSWER بدون ترتيب
const checkAnswer = () => {
  const newStatus = {};
  let correctCount = 0;
  let incomplete = false;

  // الإجابات الصحيحة لكل عمود
  const correctCol1 = Object.entries(correctAnswers)
    .filter(([k, v]) => k.startsWith("col1") && v.trim() !== "")
    .map(([, v]) => v.trim());

  const correctCol2 = Object.entries(correctAnswers)
    .filter(([k, v]) => k.startsWith("col2") && v.trim() !== "")
    .map(([, v]) => v.trim());

  Object.keys(correctAnswers).forEach(key => {
    const correctVal = correctAnswers[key];
    const userVal = tableAnswers[key]?.trim();

    // ⛔ تجاهل الصفوف المعطّلة
    if (!correctVal || correctVal.trim() === "") {
      newStatus[key] = "";
      return;
    }

    // ⛔ خلية مطلوبة لكنها فارغة
    if (!userVal) {
      incomplete = true;
      newStatus[key] = "";
      return;
    }

    // ✅ تحقق حسب العمود فقط
    if (key.startsWith("col1")) {
      if (correctCol1.includes(userVal)) {
        newStatus[key] = "correct";
        correctCount++;
      } else {
        newStatus[key] = "wrong";
      }
    }

    if (key.startsWith("col2")) {
      if (correctCol2.includes(userVal)) {
        newStatus[key] = "correct";
        correctCount++;
      } else {
        newStatus[key] = "wrong";
      }
    }
  });

  setAnswerStatus(newStatus);

  const total = correctCol1.length + correctCol2.length;

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Please fill in all required fields.",
      `${correctCount}/${total}`
    );
    setScore(null);
    return;
  }

  setScore({ correct: correctCount, total });

  if (correctCount === total) {
    ValidationAlert.success(
      "Excellent!",
      "You classified all sentences correctly!",
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
    setTableAnswers({ ...correctAnswers });
    
    const newStatus = {};
    Object.keys(correctAnswers).forEach(key => {
      if (correctAnswers[key].trim() !== "") {
        newStatus[key] = "correct";
      }
    });
    setAnswerStatus(newStatus);
    
    const totalCellsWithAnswers = Object.values(correctAnswers).filter(answer => answer.trim() !== "").length;
    setScore({ correct: totalCellsWithAnswers, total: totalCellsWithAnswers });

    ValidationAlert.success(
      "Answers shown",
      "All correct answers have been filled in.",
      `${totalCellsWithAnswers}/${totalCellsWithAnswers}`
    );
  };

  // ✅ RESET
  const resetExercise = () => {
    const emptyAnswers = {};
    Object.keys(correctAnswers).forEach(key => {
      emptyAnswers[key] = "";
    });
    
    setTableAnswers(emptyAnswers);
    setAnswerStatus({});
    setScore(null);
  };

  // ✅ دالة لتحديد لون الخلفية
  const getInputStyle = (cellId) => {
    if (answerStatus[cellId] === "correct") return { backgroundColor: "#d4f4dd", borderColor: "#28a745" };
    if (answerStatus[cellId] === "wrong") return { backgroundColor: "#f8d7da", borderColor: "#dc3545" };
    return {};
  };

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#eaaa52", color: "#3fadb7" }} className="ex-A">Grammaire </span>
        <span style={{ color: "black" }} className="number-of-q">2</span>
        Classe les phrases dans le tableau.
      </header>

 <div className="w-full max-w-6xl">
  {/* المربع العلوي يحتوي على الكلمات/الجمل */}
  <div className="word-bank-container">
    <h3>Phrases à classer :</h3>
    <div className="word-bank-grid">
      {wordBank.map((word, index) => (
        <div key={index} className="word-item">
          <span>{String.fromCharCode(97 + index)}.</span>
          <span>{word}</span>
        </div>
      ))}
    </div>
  </div>

  {/* الجدول - 2 أعمدة × 5 صفوف */}
 <div className="classification-table-wrapper">
  <div className="classification-table">
    {/* العمود الأول: Pour se présenter */}
    <div className="category-column">
      <h3>Pour se présenter / saluer quelqu’un</h3>
      {[1, 2, 3, 4, 5].map(row => {
        const cellId = `col1_row${row}`;
        return (
          <input
  key={cellId}
  type="text"
  value={tableAnswers[cellId]}
  onChange={(e) => handleTableChange(cellId, e.target.value)}
  placeholder={`Phrase ${row}`}
  disabled={correctAnswers[cellId] === ""}
  className={correctAnswers[cellId] === "" ? "disabled-cell" : ""}
/>

        );
      })}
    </div>

    {/* العمود الثاني: Pour saluer quelqu'un */}
    <div className="category-column">
      <h3>Dire au revoir</h3>
      {[1, 2, 3, 4, 5].map(row => {
        const cellId = `col2_row${row}`;
        return (
         <input
  key={cellId}
  type="text"
  value={tableAnswers[cellId]}
  onChange={(e) => handleTableChange(cellId, e.target.value)}
  placeholder={`Phrase ${row}`}
  disabled={correctAnswers[cellId] === ""}
  className={correctAnswers[cellId] === "" ? "disabled-cell" : ""}
/>

        );
      })}
    </div>
  </div>
</div>

</div>


      {/* Score Card */}
      {score && <ScoreCardEnhanced score={score} />}
      <div className="spaces"></div>

      {/* Action Buttons */}
      <div className="action-buttons-container flex gap-4">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q2_SAppeler;