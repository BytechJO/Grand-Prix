import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/1.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false); // ✅ مهم للهايلايت

const correctAnswers = {
  a: "une fille",
  b: "sénégalaise",
  c: "sixième",
  d: "beaucoup",
  e: "l'anglais",      // مطابقة للـ options
  f: "le français.",   // مطابقة للـ options
  g: "les maths",
  h: "strict",
  i: "faible",
  j: "très vite."      // مطابقة للـ options
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

  const checkAnswer = () => {
    let correctCount = 0;
    let incomplete = false;

    Object.keys(correctAnswers).forEach((key) => {
      if (!answers[key]) incomplete = true;
      if (answers[key] === correctAnswers[key]) correctCount++;
    });

    if (incomplete) {
      ValidationAlert.info("Incomplete", "Please answer all questions.");
      return;
    }

    setChecked(true); // ✅ تفعيل الهايلايت

    const total = Object.keys(correctAnswers).length;

    if (correctCount === total)
      ValidationAlert.success(`Score: ${correctCount}/${total}`);
    else
      ValidationAlert.error(`Score: ${correctCount}/${total}`);
  };

  const showAnswerFunc = () => {
    setAnswers(correctAnswers);
    setChecked(true); // ✅ اظهار الإجابة الصحيحة
  };

  const resetExercise = () => {
    setAnswers({});
    setChecked(false); // ✅ إعادة التمرين
    resetAudio();
  };

  // ===== Captions =====
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const captions = [
    { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    { start: 4.25, end: 8.28, text: "Listen and write the missing letters. Number the pictures." },
    { start: 8.3, end: 11.05, text: "1-tiger." },
    { start: 11.07, end: 13.12, text: "2-taxi." },
    { start: 13.14, end: 15.14, text: "3-duck." },
    { start: 15.16, end: 17.13, text: "4-deer." },
  ];

  return (
     <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
     <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span  style={{ backgroundColor: "#df4f89" }} className="ex-A">C</span> <span style={{color:"black"}} className="number-of-q">6</span>
Entoure la bonne réponse.     </header>

      {/* ================= Exercise 7 ================= */}
      <div className="exercise-choices w-full max-w-4xl">

        {[
          { id: "a", text: "Jenna est", options: ["une fille", "un garçon."] },
          { id: "b", text: "Elle est", options: ["sénégalaise", "singapourienne"] },
          { id: "c", text: "Jenna est en", options: ["sixième", "cinquième"] },
          { id: "d", text: "Elle étudie________de matières scolaires.", options: ["beaucoup", "peu"]},
          { id: "e", text: "Sa matière préférée est", options: ["le français", "l'anglais"] },
          { id: "f", text: "Sa langue maternelle est", options: ["l'anglais", "le français."] },
          { id: "g", text: "Jenna n’aime pas", options: ["les maths", "la SVT"] },
          { id: "h", text: "Le professeur d'EPS est", options: ["exigeant", "strict"] },
          { id: "i", text: "Elle est________en histoire.", options: ["forte", "faible"] },
          { id: "j", text: "Le professeur d'histoire parle", options: ["vite", "très vite."] },
        ].map((q) => (
          <div key={q.id} className="question-row">
            <strong>{q.id}.</strong> {q.text}

            {q.options.map((opt) => {
              const isSelected = answers[q.id] === opt;
              const isCorrect = checked && opt === correctAnswers[q.id];
              const isWrong = checked && isSelected && opt !== correctAnswers[q.id];

              return (
                <label
                  key={opt}
                  className={`choice-label 
                    ${isCorrect ? "correct" : ""}
                    ${isWrong ? "wrong" : ""}
                  `}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={isSelected}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    disabled={checked}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        ))}
      </div>
      {/* ================= End Exercise 7 ================= */}
<div className="spaces"></div>
      {/* ================= Buttons ================= */}
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
