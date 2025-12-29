import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./CSSPAGE/Q5U1.css";
import img1 from "../../../assets/unit1/imgs/page6/1.svg";
import img2 from "../../../assets/unit1/imgs/page6/2.svg";
import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

  // ✅ ANSWERS
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");

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
  const updateCaption = (currentTime) => {
  const index = captions.findIndex(
    (cap) => currentTime >= cap.start && currentTime <= cap.end
  );

  setActiveIndex(index !== -1 ? index : null);
};

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

      {/* ================= Audio Player + Captions ================= */}
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

      {/* =====================================End player ====================================== */}

      {score && <ScoreCardEnhanced score={score} />}

      {/* ✅ QUESTIONS */}
      <div className="q5-body">
        <div className="q5-character-group">
          <img src={img1} alt="Boy" className="q5-character-img" />
          <input
            type="text"
            value={boyName}
            onChange={(e) => setBoyName(e.target.value)}
            className="q5-input"
          />
        </div>

        <div className="q5-character-group">
          <img src={img2} alt="Girl" className="q5-character-img" />
          <input
            type="text"
            value={girlName}
            onChange={(e) => setGirlName(e.target.value)}
            className="q5-input"
          />
        </div>
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
