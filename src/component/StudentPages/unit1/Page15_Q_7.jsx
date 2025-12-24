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
    a: "à la bibliothèque",
    b: "Emma",
    c: "très bien",
    d: "bien",
    e: "seize",
    f: "votre livre",
    g: "Merci",
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
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">c</span> <span style={{color:"black"}} className="number-of-q">7</span>Entoure la bonne réponse.
      </header>

      {/* ================= Exercise 7 ================= */}
      <div className="exercise-choices w-full max-w-4xl">

        {[
          { id: "a", text: "La fille est", options: ["à la bibliothèque", "à la maison"] },
          { id: "b", text: "Elle s’appelle", options: ["Marie", "Emma"] },
          { id: "c", text: "Le bibliothécaire se sent", options: ["mal", "très bien"] },
          { id: "d", text: "Emma se sent", options: ["bien", "comme ci, comme ça"] },
          { id: "e", text: "Elle a", options: ["seize", "quatorze"] },
          { id: "f", text: "Voici", options: ["votre livre", "votre stylo"] },
          { id: "g", text: "", options: ["Merci", "De rien"] },
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
