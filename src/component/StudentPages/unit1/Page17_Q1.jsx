import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/P17Q1.mp3";
import imgBackground from "../../../assets/unit1/sectionD/P17Q1.svg";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; 
import "./Page17_Q1.css";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const captions = [
    { start: 5.0, end: 7.0, text: "GrandPrixA1" },
    { start: 7.3, end: 8.3, text: "unité 1," },
    { start: 8.3, end: 9.6, text: " seprésenter. " },
    { start: 10.2, end: 11.2, text: " SectionA " },
    { start: 13.1, end: 14.2, text: " Exercice1 " },
    { start: 14.8, end: 15.3, text: " Écoute " },
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

  /* 🔴 تحديث الـ input */
  const handleInputChange = (index, value) => {
    if (/^[A-Za-z]?$/.test(value)) {
      setInputs({ ...inputs, [index]: value.toLowerCase() });
    }
  };

  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
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

  const updateCaption = (time) => {
    const index = captions.findIndex(
      cap => time >= cap.start && time <= cap.end
    );
    setActiveIndex(index);
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
        <span className="ex-A" style={{ backgroundColor: "#73C8D2" }}>D</span>{" "}
        <span className="number-of-q">1</span>{" "}
        Écoute, répète et place dans l’ordre.
      </header>

      {/* Audio Player */}
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
                  background: `linear-gradient(to right, #430f68 ${(current / duration) * 100}%, #d9d9d9ff ${(current / duration) * 100}%)`,
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
                <div className={`caption-inPopup ${showCaption ? "show" : ""}`} style={{ top:"100%", left:"10%" }}>
                  {captions.map((cap,i) => (
                    <p key={i} id={`caption-${i}`} className={`caption-inPopup-line2 ${activeIndex===i?"active":""}`}>{cap.text}</p>
                  ))}
                </div>
              </div>

              {/* Play/Pause */}
              <button className="play-btn2" onClick={togglePlay}>
                {isPlaying ? <FaPause size={26}/> : <FaPlay size={26}/>}
              </button>

              {/* Settings */}
              <div className="settings-wrapper">
                <button className={`round-btn ${showSettings?"active":""}`} onClick={()=>setShowSettings(!showSettings)}>
                  <IoMdSettings size={36}/>
                </button>
                {showSettings && (
                  <div className="settings-popup">
                    <label>Volume</label>
                    <input id="V"
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

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise */}
      <div
        className="exercise-container"
        style={{
          display: "flex",
          width: "100%",
          height: "100vh", 
          gap: "20px",
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
            {numbersList.map(item => {
              // 🔹 أي حرف مطابق لـ item.id يصبح أزرق
              const isUsed = Object.values(inputs).some(val => val === item.id);
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
              width: "100%", 
              height: "100%",
              objectFit: "contain",
            }}
          />

          {inputPositions.map(pos => (
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
