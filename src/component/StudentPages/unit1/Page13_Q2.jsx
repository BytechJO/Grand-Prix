import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page13_Q2.css";
import img1 from "../../../assets/unit1/SCP13/img1.svg";
import img2 from "../../../assets/unit1/SCP13/img2.svg";
import img3 from "../../../assets/unit1/SCP13/img3.png";
import { TbMessageCircle } from "react-icons/tb";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);

  // ✅ ANSWERS STATE
  const [selma, setSelma] = useState("");
  const [isabelle, setIsabelle] = useState("");
  const [theo, setTheo] = useState("");
  const [luc, setLuc] = useState("");
  const [karl, setKarl] = useState("");

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
    const correctAnswers = {
      selma: "Elle a dix-sept ans.",
      isabelle: "Elle a seize ans.",
      theo: "Il a quinze ans.",
      luc: "Il a dix-sept ans.",
      karl: "Il a quinze ans."
    };

    const userAnswers = { selma, isabelle, theo, luc, karl };

    // Check empty fields
    const emptyFields = Object.entries(userAnswers).filter(([key, val]) => !val.trim());
    if (emptyFields.length > 0) {
      ValidationAlert.info("Attention!", "Veuillez remplir tous les champs.");
      return;
    }

    // Count correct answers
    let correctCount = 0;
    Object.keys(userAnswers).forEach(key => {
      if (userAnswers[key].trim() === correctAnswers[key]) correctCount++;
    });

    const total = Object.keys(correctAnswers).length;
    const color =
      correctCount === total ? "green" :
      correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.error(msg);
  };

  // ✅ SHOW ANSWER
  const showAnswerFunc = () => {
    setSelma("Elle a dix-sept ans.");
    setIsabelle("Elle a seize ans.");
    setTheo("Il a quinze ans.");
    setLuc("Il a dix-sept ans.");
    setKarl("Il a quinze ans.");
  };

  // ✅ RESET
  const resetExercise = () => {
    setSelma("");
    setIsabelle("");
    setTheo("");
    setLuc("");
    setKarl("");
    resetAudio();
  };

  // === Captions state ===
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // === Captions array ===
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
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">C</span> <span style={{color:"black"}} className="number-of-q">2</span>Dis leur âge.
      </header>

      {/* ================= Audio Player + Captions ================= */} 
   
      {/* =====================================End player ====================================== */}

      {/* ✅ QUESTIONS */}
      <div className="ex2sc">
        <div className="imgex2sc">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
        </div>
        <div className="Exsrisizep13">
          <img src={img3} alt="" />

          <div className="Selma">
            <label>Selma</label>
            <input type="text" value={selma} onChange={(e)=>setSelma(e.target.value)} />
          </div>

          <div className="Isabelle">
            <label>Isabelle</label>
            <input type="text" value={isabelle} onChange={(e)=>setIsabelle(e.target.value)} />
          </div>

          <div className="Theo">
            <label>Théo</label>
            <input type="text" value={theo} onChange={(e)=>setTheo(e.target.value)} />
          </div>

          <div className="Luc">
            <label>Luc</label>
            <input type="text" value={luc} onChange={(e)=>setLuc(e.target.value)} />
          </div>

          <div className="Karl">
            <label>Karl</label>
            <input type="text" value={karl} onChange={(e)=>setKarl(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="spaces"></div>
      <div className="spaces"></div>
      <div className="spaces"></div>

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
