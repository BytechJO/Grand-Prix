import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page5_Q4.css"
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q1_CleanAudio = () => {
  // ✅ حالة الإجابات
  const [answers, setAnswers] = useState({
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: ""
  });
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  // ✅ حالة لون الإجابات
  const [answerStatus, setAnswerStatus] = useState({
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: ""
  });

  // ✅ قائمة الضمائر
  const pronouns = ['Je', 'Tu', 'Il', 'Elle', 'Nous', 'Vous', 'Ils', 'Elles'];

  // ✅ الجمل المطلوبة
  const sentences = {
    b: "Mes amis s'appellent Pierre et Sara.",
    c: "Ils sont allemands.",
    d: "J'ai treize ans.",
    e: "Pierre a douze ans.",
    f: "Pierre, Sara et moi sommes bons amis.",
    g: "Je suis canadienne.",
    h: "Sara a treize ans."
  };

  // ✅ الإجابات الصحيحة
  const correctAnswers = {
    b: 'Ils',
    c: 'Ils',
    d: 'Je',
    e: 'Il',
    f: 'Nous',
    g: 'Je',
    h: 'Elle'
  };

  // ✅ اختيار الضمير
  const handlePronounSelect = (sentenceId, pronoun) => {
    setAnswers({
      ...answers,
      [sentenceId]: answers[sentenceId] === pronoun ? "" : pronoun
    });
    // إعادة ضبط اللون عند الاختيار
    setAnswerStatus(prev => ({ ...prev, [sentenceId]: "" }));
  };

  // ✅ CHECK ANSWER
// ✅ CHECK ANSWER
const checkAnswer = () => {
  const newStatus = {};
  let correctCount = 0;
  let incomplete = false;

  Object.keys(correctAnswers).forEach(key => {
    const val = answers[key]?.trim();
    if (!val) incomplete = true;

    const isCorrect = val === correctAnswers[key];
    newStatus[key] = isCorrect ? "correct" : "wrong";

    if (isCorrect) correctCount++;
  });

  setAnswerStatus(newStatus);

  const total = Object.keys(correctAnswers).length;

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Please fill in all fields.",
      `${correctCount}/${total}`
    );
    setScore(null); // منع ظهور ScoreCard
  } else {
    setScore({ correct: correctCount, total });

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
  }
};

// ✅ SHOW ANSWER
const showAnswerFunc = () => {
  setAnswers({ ...correctAnswers });

  const newStatus = {};
  Object.keys(correctAnswers).forEach(key => {
    newStatus[key] = "correct";
  });
  setAnswerStatus(newStatus);

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
  const emptyStatus = {};
  Object.keys(correctAnswers).forEach(key => {
    emptyAnswers[key] = "";
    emptyStatus[key] = "";
  });

  setAnswers(emptyAnswers);
  setAnswerStatus(emptyStatus);
  setScore(null); // إعادة تعيين ScoreCard
};


  // ✅ دالة لتحديد لون الزر حسب الحالة
  const getButtonStyle = (key, pronoun) => {
    if (answerStatus[key] === "correct" && answers[key] === pronoun) return 'bg-green-400 text-white border-green-400';
    if (answerStatus[key] === "wrong" && answers[key] === pronoun) return 'bg-red-300 text-white border-red-300';
    return answers[key] === pronoun ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
  };

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">4</span>
    Lis et coche le pronom utilisé dans chaque phrase.

      </header>

   {score && <ScoreCardEnhanced score={score} />}

      {/* ================= Exercise Content ================= */}
      <div className="sentences-section">
        <div className="grid grid-cols-2 gap-8">
          {['b', 'c', 'd', 'e', 'f', 'g', 'h'].map((key) => (
            <div key={key} className="sentence-item flex items-start gap-3 mb-4 p-4 border-l-4 border-blue-300 bg-gray-50 rounded">
              <span className="sentence-label font-bold text-blue-600 min-w-6 text-center">{key}</span>
              <div className="flex-1">
                <p className="sentence-text text-gray-800 mb-3 text-sm leading-tight">{sentences[key]}</p>
                <div className="pronouns-grid grid grid-cols-4 gap-1">
                  {pronouns.map((pronoun) => (
                    <button
                      key={pronoun}
                      onClick={() => handlePronounSelect(key, pronoun)}
                      className={`pronoun-btn py-1 px-1 text-xs rounded border text-center transition ${getButtonStyle(key, pronoun)}`}
                    >
                      {pronoun}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
<div className="spaces"></div>
      {/* Action Buttons */}
      <div className="action-buttons-container" style={{ marginTop: "30px" }}>
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
