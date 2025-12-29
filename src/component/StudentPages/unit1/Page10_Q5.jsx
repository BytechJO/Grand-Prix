import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/SBQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert"; 
import "./Page10_Q5.css"
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

import photo1 from '../../../assets/unit1/page10svg/ph1.svg';
import photo2 from '../../../assets/unit1/page10svg/ph2.svg';
import photo3 from '../../../assets/unit1/page10svg/ph3.svg';
import photo4 from '../../../assets/unit1/page10svg/ph4.svg';
import photo5 from '../../../assets/unit1/page10svg/ph5.svg';

import Emojy1 from '../../../assets/unit1/page10svg/Emojy1.svg';
import Emojy2 from '../../../assets/unit1/page10svg/Emojy2.svg';
import Emojy3 from '../../../assets/unit1/page10svg/Emojy3.svg';

const correctAnswers = {
  img1: "1",
  img2: "2",
  img3: "1",
  img4: "3",
  img5: "2"
};

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
 const [score, setScore] = useState(null); 
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

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

  const handleSelect = (id, value) => {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

const checkOrder = () => {
  let correctCount = 0;
  let incomplete = false;

  Object.keys(correctAnswers).forEach(key => {
    if (!answers[key] || answers[key].trim() === "") incomplete = true;
    else if (answers[key].trim().toLowerCase() === correctAnswers[key].trim().toLowerCase()) {
      correctCount++;
    }
  });

  setChecked(true);
  const total = Object.keys(correctAnswers).length;

  // ✅ تحديث السكور
  setScore({ correct: correctCount, total });

  if (incomplete) {
    ValidationAlert.info(
      "Incomplete",
      "Some answers are missing.",
      `${correctCount}/${total}`
    );
  } else if (correctCount === total) {
    ValidationAlert.success(
      "Good Job!",
      "You got all answers right!",
      `${correctCount}/${total}`
    );
  } else if (correctCount === 0) {
    ValidationAlert.info(
      "Try Again!",
      "All answers are incorrect.",
      `${correctCount}/${total}`
    );
  } else {
    ValidationAlert.error(
      "Almost There!",
      "Some answers are incorrect.",
      `${correctCount}/${total}`
    );
  }
};


// عرض الإجابات الصحيحة
const showCorrectAnswer = () => {
  setAnswers(correctAnswers);
  setChecked(true);
};

// إعادة التمرين
const resetExercise = () => {
  setAnswers({});
  setChecked(false);
  resetAudio();
};

  const getButtonClass = (id, value) => {
    if (!checked) return answers[id] === value ? "selected" : "";
    if (answers[id] !== value) return "disabled";
    return answers[id] === correctAnswers[id] ? "correct" : "wrong";
  };

  const photos = [photo1, photo2, photo3, photo4, photo5];

  // === Captions state ===
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const captions = [
    { start:5.50, end: 6.36, text: "Grand Prix A1," },
  { start:6.94, end: 7.96, text: "unité 1" },
  { start:8.29, end: 9.24, text: "seprésenter" },
  { start:9.79, end: 10.51, text: "Section B." },
  { start:11.20, end: 12.65, text: "Çava?" },
  { start:12.65, end: 13.82, text: "Exercice 5" },
  { start:14.62, end: 20.83, text: "Écoute et note très bien ou comme si comme ça ou mal," },
  { start:21.29, end: 22.63, text: "puis répète." },
  { start:24.80, end: 25.63, text: "Comment ça va ?" },
  { start:26.88, end: 27.48, text: "Très bien !" },
  { start:29.63, end: 31.65, text: "Comment ça va ?" },
  { start:31.65, end: 32.15, text: "Comme ci," },
  { start:32.15, end: 32.59, text: "comme ça." },
  { start:34.75, end: 36.49, text: "Comment ça va ?" },
  { start:36.70, end: 37.37, text: "Très bien." },
  { start:38.62, end: 41.25, text: "Comment ça va ?" },
  { start:41.25, end: 41.27, text: "Mal." },
  { start:43.77, end: 45.65, text: "Comment ça va ?" },
  { start:45.65, end: 46.15, text: "Comme ci," },
  { start:46.15, end: 46.55, text: "comme ça." },
 
  
  ];
  const updateCaption = (currentTime) => {
  const index = captions.findIndex(
    (cap) => currentTime >= cap.start && currentTime <= cap.end
  );

  setActiveIndex(index !== -1 ? index : null);
};


  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
 <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">B</span> <span style={{color:"black"}} className="number-of-q">5</span>Écoute, note😊 ou😏 ou 😞, puis répète.
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

      {/* ================= Questions Section ================= */}
      <div className="listening-exercise w-full max-w-md">
        <div className="q1-exercise-container">
          <div className="Ex">
            {photos.map((photo, idx) => {
              const imgKey = `img${idx + 1}`;
              return (
                <div key={imgKey} className="photo-box">
                  <img src={photo} alt="" />
                  <div className="emoji-buttons">
                    <button className={`emoji-btn ${getButtonClass(imgKey, "1")}`} onClick={() => handleSelect(imgKey, "1")}>
                      <img src={Emojy1} />
                    </button>
                    <button className={`emoji-btn ${getButtonClass(imgKey, "2")}`} onClick={() => handleSelect(imgKey, "2")}>
                      <img src={Emojy2} />
                    </button>
                    <button className={`emoji-btn ${getButtonClass(imgKey, "3")}`} onClick={() => handleSelect(imgKey, "3")}>
                      <img src={Emojy3} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
                <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showCorrectAnswer} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkOrder} className="check-button2">Vérifier la réponse✓</button>
      </div>
        </div>
      </div>
      {/* ================= End Questions Section ================= */}
{score && <ScoreCardEnhanced score={score} />}

      <div className="spaces"></div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
