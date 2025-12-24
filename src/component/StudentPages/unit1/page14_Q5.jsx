import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/ScQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./page14_Q5.css";

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

  // ✅ ANSWERS
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState(""); // توقيع، لا يتم التحقق منه

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const resetSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  // ✅ CHECK ANSWER فقط للحقول 1–4
  const checkAnswer = () => {
    const correctAnswers = {
      input1: "Jean",
      input2: "Pierre",
      input3: "16 ans",
      input4: "957386421",
    };

    let correctCount = 0;
    if (input1.trim() === correctAnswers.input1) correctCount++;
    if (input2.trim() === correctAnswers.input2) correctCount++;
    if (input3.trim() === correctAnswers.input3) correctCount++;
    if (input4.trim() === correctAnswers.input4) correctCount++;

    const total = 4;
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(`Excellent! (${correctCount}/${total})`, "All answers are correct!");
    } else if (correctCount === 0) {
      ValidationAlert.error(`All answers are incorrect. (${correctCount}/${total})`, "Try again!");
    } else {
      ValidationAlert.error(`You got ${correctCount} out of ${total} correct.`, "Almost there!");
    }
  };

  const showAnswerFunc = () => {
    setInput1("Jean");
    setInput2("Pierre");
    setInput3("16 ans");
    setInput4("957386421");

    const total = 4;
    const correctCount = 4;
    setScore({ correct: correctCount, total });

    ValidationAlert.success("Answers shown", "The correct answers have been placed.", `${correctCount}/${total}`);
  };

  const resetExercise = () => {
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setScore(null);
    resetAudio();
    resetSignature();
  };

  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color: "black", marginTop: "5%", fontSize: "25px", fontWeight: "bold" }}
      >
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">A</span>{" "}
        <span style={{ color: "black" }} className="number-of-q">5</span>
        Écoute et réponds.
      </header>

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
                style={{
                  background: `linear-gradient(to right, #430f68 ${(current / duration) * 100}%, #d9d9d9ff ${(current / duration) * 100}%)`,
                }}
              />
              <span className="audio-time">{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
            </div>

            <div className="bottom-row flex justify-between items-center">
              <div className={`round-btn ${showCaption ? "active" : ""}`} style={{ position: "relative" }} onClick={() => setShowCaption(!showCaption)}>
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

      {score && <ScoreCardEnhanced score={score} />}

      <div className="p14q4">
        <div className="inputsp14">
          <input type="text" className="input1" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Nom" />
          <input type="text" className="input2" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Prénom" />
          <input type="text" className="input3" value={input3} onChange={(e) => setInput3(e.target.value)} placeholder="Âge" />
          <input type="text" className="input4" value={input4} onChange={(e) => setInput4(e.target.value)} placeholder="N° d’étudiant" />
          {/* الانبوت الخامس توقيع فقط */}
          <div className="input5" style={{ border: "1px solid #ccc", width: "300px", height: "100px", marginTop: "10px" }}>
            <canvas
              ref={canvasRef}
              width={300}
              height={100}
              style={{ background: "white", cursor: "crosshair" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
      </div>

      <div className="spaces"></div>

      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
