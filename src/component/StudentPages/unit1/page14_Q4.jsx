import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/ScQ4.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./page14_Q4.css";
import imgbackground from "../../../assets/unit1/sectionD/14png.png";
import { TbMessageCircle } from "react-icons/tb";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null);

  // IMAGE QUESTION
  const [imageSelections, setImageSelections] = useState([null, null, null]);
  const [checkedMarks, setCheckedMarks] = useState(false);

  const imageBoxes = [
    { top: "27%", left: "15%" },
    { top: "40%", left: "10%" },
    { top: "54%", left: "27%" },
  ];

  const correctBoxes = [1, 2, 3]; // المربعات الصحيحة حسب ترتيبك

  // عند اختيار المربع
  const handleImageClick = (idx) => {
    if (checkedMarks) return; // منع التغيير بعد التحقق
    const newSelections = [...imageSelections];
    newSelections[idx] = idx + 1; // حفظ رقم المربع (1,2,3)
    setImageSelections(newSelections);
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

  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    let correctCount = 0;

    imageSelections.forEach((val) => {
      if (correctBoxes.includes(val)) correctCount++;
    });

    const total = correctBoxes.length;
    setScore({ correct: correctCount, total });
    setCheckedMarks(true);

    const newSelections = imageSelections.map(val =>
      correctBoxes.includes(val) ? val : val !== null ? -1 : null
    );
    setImageSelections(newSelections);

    if (correctCount === total) {
      ValidationAlert.success(`Excellent! (${correctCount}/${total})`, "All answers are correct!");
    } else if (correctCount === 0) {
      ValidationAlert.error(`All answers are incorrect. (${correctCount}/${total})`, "Try again!");
    } else {
      ValidationAlert.error(`You got ${correctCount} out of ${total} correct.`, "Almost there!");
    }
  };

  // ✅ SHOW ANSWER
  const showAnswerFunc = () => {
    const newSelections = [...imageSelections];
    correctBoxes.forEach((val, idx) => {
      newSelections[idx] = val; // وضع الإجابة الصحيحة
    });
    setImageSelections(newSelections);
    setCheckedMarks(true);

    const total = correctBoxes.length;
    const correctCount = total;
    setScore({ correct: correctCount, total });

    ValidationAlert.success("Answers shown", "The correct answers have been placed.", `${correctCount}/${total}`);
  };

  // ✅ RESET
  const resetExercise = () => {
    setImageSelections([null, null, null]);
    setScore(null);
    resetAudio();
    setCheckedMarks(false);
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      <header className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">A</span>{" "}
        <span style={{ color: "black" }} className="number-of-q">5</span>
        Écoute et réponds.
      </header>

      {/* AUDIO PLAYER */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="audio-popup-read" style={{ width: "30%" }}>
          <div className="audio-inner player-ui">
            <audio
              ref={audioRef}
              src={CD6_Pg8_Instruction1_AdultLady}
              onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
            />
            <div className="top-row">
              <span className="audio-time">{new Date(current * 1000).toISOString().substring(14, 19)}</span>
              <input
                type="range"
                className="audio-slider"
                min="0"
                max={duration}
                value={current}
                onChange={(e) => { audioRef.current.currentTime = e.target.value; }}
                style={{ background: `linear-gradient(to right, #430f68 ${(current / duration) * 100}%, #d9d9d9ff ${(current / duration) * 100}%)` }}
              />
              <span className="audio-time">{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
            </div>

            <div className="bottom-row flex justify-between items-center">
              <div className={`round-btn`} style={{ position: "relative" }}>
                <TbMessageCircle size={36} />
              </div>
              <button className="play-btn2" onClick={togglePlay}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>
              <div className="settings-wrapper">
                <button className={`round-btn ${showSettings ? "active" : ""}`} onClick={() => setShowSettings(!showSettings)}>
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
                      onChange={(e) => { setVolume(e.target.value); audioRef.current.volume = e.target.value; }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE QUESTION */}
      <div
        className="image-popup"
        style={{
          position: "relative",
          width: "60%",
          height: "400px",
          backgroundImage: `url(${imgbackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "20px",
        }}
      >
        {imageBoxes.map((box, idx) => (
          <div
            key={idx}
            onClick={() => handleImageClick(idx)}
            style={{
              position: "absolute",
              width: "150px",
              height: "50px",
              top: box.top,
              left: box.left,
              cursor: checkedMarks ? "not-allowed" : "pointer",
              border: imageSelections[idx] !== null
                ? imageSelections[idx] === correctBoxes[idx]
                  ? "3px solid lightgreen"
                  : imageSelections[idx] === -1
                    ? "3px solid lightcoral"
                    : "3px solid blue"
                : "",
              backgroundColor: imageSelections[idx] !== null ? "rgba(0,0,255,0.2)" : "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ))}
      </div>
<div className="spaces"></div>
      {score && <ScoreCardEnhanced score={score} />}

      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
