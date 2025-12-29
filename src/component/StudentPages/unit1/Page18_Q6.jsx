import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/Unite1SectioDExercice6.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";

import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q2_SAppeler = () => {
  // === STATE ===
  const [answers, setAnswers] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });
  const [score, setScore] = useState(null);

  // ✅ حالة لون الإجابات
  const [answerStatus, setAnswerStatus] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });

  // === الإجابات النموذجية ===
  const correctAnswers = {
    a: "sont suisses",
    b: "est allemande",
    c: "sont anglais",
    d: "Boris est russe",
  };

  // === النصوص الأصلية للأسئلة مع الفراغات ____
  const questions = {
    a: "Sophia et Alison__________",
    b: "Annabelle ____",
    c: "Paul et Thomas ____",
    d: "Boris ____",
  };

  // ✅ HANDLE CHANGE
  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // إعادة ضبط اللون عند الكتابة
    setAnswerStatus((prev) => ({ ...prev, [key]: "" }));
  };

  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    const newStatus = {};
    let correctCount = 0;
    let incomplete = false;

    Object.keys(correctAnswers).forEach((key) => {
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
    Object.keys(correctAnswers).forEach((key) => {
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
    Object.keys(correctAnswers).forEach((key) => {
      emptyAnswers[key] = "";
      emptyStatus[key] = "";
    });

    setAnswers(emptyAnswers);
    setAnswerStatus(emptyStatus);
    setScore(null); // إعادة تعيين ScoreCard
  };

  // ✅ دالة لتحديد لون الخلفية حسب الحالة
  const getInputStyle = (key) => {
    if (answerStatus[key] === "correct") return { backgroundColor: "#d4f4dd" }; // أخضر فاتح
    if (answerStatus[key] === "wrong") return { backgroundColor: "#f8d7da" }; // أحمر فاتح
    return {};
  };
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [place, setPlace] = useState("");
  const [action, setAction] = useState("");
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

  const captions = [
    { start: 4.9, end: 6.6, text: "Grand Prix A1," },
    { start: 6.6, end: 8.0, text: "Unité 1" },
    { start: 8.0, end: 8.9, text: "Se présenter" },
    { start: 9.7, end: 10.5, text: "Section D" },
    { start: 11.1, end: 12.2, text: "Ma nationalité" },
    { start: 13.0, end: 14.0, text: "Exercice 6" },
    { start: 15.0, end: 16.5, text: "Écoute et trouve" },
    { start: 16.5, end: 17.6, text: "la nationalité" },
    { start: 17.6, end: 18.1, text: "de chaque" },
    { start: 18.1, end: 18.7, text: "personne." },
    { start: 20.5, end: 21.8, text: "Les personnages" },
    { start: 21.8, end: 22.0, text: "sont" },
    { start: 22.0, end: 23.1, text: "dans le bus." },
    { start: 23.1, end: 23.4, text: "Ils se" },
    { start: 23.4, end: 24.5, text: "présentent." },
    { start: 24.5, end: 25.6, text: "Sophia et Alison" },
    { start: 25.6, end: 26.6, text: "sont Suisses" },
    { start: 27.2, end: 28.4, text: "Boris est Russe." },
    { start: 28.9, end: 29.6, text: "Paul et Thomas" },
    { start: 29.6, end: 30.4, text: "sont Anglais" },
    { start: 30.4, end: 31.3, text: "et Annabelle" },
    { start: 31.3, end: 32.0, text: "est Allemande." },
  ];
    const updateCaption = (currentTime) => {
  const index = captions.findIndex(
    (cap) => currentTime >= cap.start && currentTime <= cap.end
  );

  setActiveIndex(index !== -1 ? index : null);
};

  return (
    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
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
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">
          D
        </span>{" "}
        <span style={{ color: "black" }} className="number-of-q">
          6
        </span>
        Écoute et trouve la nationalité de chaque personne.
      </header>
     {/* AUDIO PLAYER */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div className="audio-popup-read" style={{ width: "30%" }}>
                  <div className="audio-inner player-ui">
                    <audio
                      ref={audioRef}
                      src={CD6_Pg8_Instruction1_AdultLady}
                      onTimeUpdate={(e) => {
                        const time = e.target.currentTime;
                        setCurrent(time);
                        updateCaption(time);
                      }}
                      onLoadedMetadata={(e) => setDuration(e.target.duration)}
                    />
        
                    {/* Time & Slider */}
                    <div className="top-row">
                      <span className="audio-time">
                        {new Date(current * 1000).toISOString().substring(14, 19)}
                      </span>
        
                      <input
                        type="range"
                        className="audio-slider"
                        min="0"
                        max={duration}
                        value={current}
                        onChange={(e) => {
                          audioRef.current.currentTime = e.target.value;
                          updateCaption(Number(e.target.value));
                        }}
                        style={{
                          background: `linear-gradient(to right, #430f68 ${
                            (current / duration) * 100
                          }%, #d9d9d9ff ${(current / duration) * 100}%)`,
                        }}
                      />
        
                      <span className="audio-time">
                        {new Date(duration * 1000).toISOString().substring(14, 19)}
                      </span>
                    </div>
        
                    {/* Controls */}
                    <div className="bottom-row flex justify-between items-center">
                      {/* Captions */}
                      <div
                        className={`round-btn ${showCaption ? "active" : ""}`}
                        style={{ position: "relative" }}
                        onClick={() => setShowCaption(!showCaption)}
                      >
                        <TbMessageCircle size={36} />
                        <div
                          className={`caption-inPopup ${showCaption ? "show" : ""}`}
                          style={{ top: "100%", left: "10%" }}
                        >
                          {captions.map((cap, i) => (
                            <p
                              key={i}
                              id={`caption-${i}`}
                              className={`caption-inPopup-line2 ${
                                activeIndex === i ? "active" : ""
                              }`}
                            >
                              {cap.text}
                            </p>
                          ))}
                        </div>
                      </div>
        
                      {/* Play/Pause */}
                      <button className="play-btn2" onClick={togglePlay}>
                        {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
                      </button>
        
                      {/* Settings */}
                      <div className="settings-wrapper">
                        <button
                          className={`round-btn ${showSettings ? "active" : ""}`}
                          onClick={() => setShowSettings(!showSettings)}
                        >
                          <IoMdSettings size={36} />
                        </button>
                        {showSettings && (
                          <div className="settings-popup">
                            <label>Volume</label>
                            <input
                              id="V"
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={volume}
                              onChange={(e) => {
                                setVolume(e.target.value);
                                audioRef.current.volume = e.target.value;
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
   
      {/* ✅ QUESTIONS */}
      <div className="page5Q5" style={{ marginLeft: "13%" }}>
        <div className="inputs-column">
          {Object.keys(questions).map((key, index) => (
            <div className="input-group" key={key}>
              <label>
                <strong style={{ fontSize: "20px" }}>
                  {String.fromCharCode(97 + index)}{" "}
                </strong>
                {questions[key].split("____")[0]}
                <input
                  type="text"
                  value={answers[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{
                    width: "170px",
                    margin: "0 5px",
                    ...getInputStyle(key),
                  }}
                />
                {questions[key].split("____")[1]}
              </label>
            </div>
          ))}
        </div>
      </div>
      {score && <ScoreCardEnhanced score={score} />}

      {/* Action Buttons */}
      <div className="action-buttons-container flex gap-4">
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

export default Page5_Q2_SAppeler;
