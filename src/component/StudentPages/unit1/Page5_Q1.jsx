import React, { useState, useRef, useEffect } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/1.mp3";
import img4 from "../../../assets/unit1/imgs/QU1/Q1/12.svg";
import img3 from "../../../assets/unit1/imgs/QU1/Q1/13.svg";
import img2 from "../../../assets/unit1/imgs/QU1/Q1/14.svg";
import img1 from "../../../assets/unit1/imgs/QU1/Q1/15.svg";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

import "./CSSPAGE/Q5U1.css";
const images = [
  { id: "a", src: img1, label: "A" },
  { id: "b", src: img2, label: "B" },
  { id: "c", src: img3, label: "C" },
  { id: "d", src: img4, label: "D" },
];

const correctAnswers = {
  a: "c",
  b: "b",
  c: "a",
  d: "d",
};

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  const captions = [
    { start: 5.0, end: 7.0, text: "GrandPrixA1" },
    { start: 7.3, end: 8.3, text: "unité 1," },
    { start: 8.3, end: 9.6, text: " seprésenter. " },
    { start: 10.2, end: 11.2, text: " SectionA " },
    { start: 13.1, end: 14.2, text: " Exercice1 " },
    { start: 14.8, end: 15.3, text: " Écoute " },
    { start: 15.8, end: 17.9, text: " répète et place dans l'ordre. " },
    { start: 20.4, end: 21.2, text: " Bonjour Loïc." },
    { start: 22.7, end: 23.5, text: " Bonjour Théo." },
    { start: 25.5, end: 26.3, text: "Salut Amélie" },
    { start: 27.8, end: 28.1, text: "Salut Emma" },
    { start: 30.4, end: 31.5, text: "Bonjour Madame Rose" },
    { start: 32.8, end: 33.7, text: "Bonjour Madame Lucas." },
    { start: 35.4, end: 36.1, text: "Bonjour Monsieur Henry." },
    { start: 38.7, end: 39.4, text: "Au revoir Tom" },
    { start: 40.7, end: 41.4, text: "Au revoir Adam." },
  ];

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

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value.toLowerCase() }));
  };

  const checkAnswer = () => {
    // حساب عدد الإجابات الصحيحة
    let correctCount = 0;
    Object.keys(correctAnswers).forEach((id) => {
      if (
        (answers[id] || "").toLowerCase() === correctAnswers[id].toLowerCase()
      ) {
        correctCount++;
      }
    });
    const total = Object.keys(correctAnswers).length;

    // تحديث الـ ScoreCard بعد التحقق
    setScore({ correct: correctCount, total });

    // عرض التنبيهات حسب النتيجة
    if (correctCount === total) {
      ValidationAlert.success(
        `You got all answers right! (${total})`,
        "Excellent work!",
        `${correctCount}/${total}`
      );
    } else if (correctCount === 0) {
      ValidationAlert.info(`All answers are incorrect. Try again.`, "تحذير ⚠️");
    } else {
      ValidationAlert.error(
        `You answered ${correctCount} out of ${total} correctly.`,
        `${correctCount}/${total}`
      );
    }
  };

  const showAnswerFunc = () => {
    setAnswers(correctAnswers);
  };

  const resetExercise = () => {
    setAnswers({});
    resetAudio();
  };

const updateCaption = (currentTime) => {
  const index = captions.findIndex(
    (cap) => currentTime >= cap.start && currentTime <= cap.end
  );

  setActiveIndex(index !== -1 ? index : null);
};


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
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">
          A
        </span>{" "}
        <span style={{ color: "black" }} className="number-of-q">
          1
        </span>{" "}
        Écoute, répète et place dans l'ordre.
      </header>

      {/* ================= Audio Player ================= */}
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
      {/* Score Card */}
      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise Images */}
      <div className="exercise-images grid grid-cols-2 gap-6">
        {images.map((img) => (
          <div key={img.id} className="flex flex-col items-center gap-2">
            <img
              src={img.src}
              alt={`Image ${img.label}`}
              className="w-32 h-32 object-contain"
            />
            <input
              type="text"
              maxLength="1"
              placeholder="a/b/c/d"
              value={answers[img.id] || ""}
              onChange={(e) => handleInputChange(img.id, e.target.value)}
              className="q5-input border rounded p-1 w-18 text-center"
            />
          </div>
        ))}
      </div>
      <div className="spaces"></div>
      <div className="action-buttons-container">
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

export default Page5_Q1_CleanAudio;
