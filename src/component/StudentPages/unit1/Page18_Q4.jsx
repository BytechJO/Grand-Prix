import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/Unite1SectionDExercice4.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page18_Q4.css";
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

  const [place, setPlace] = useState(""); 
  const [action, setAction] = useState("");

  // الإجابات الصحيحة
  const correctAnswers = { place: "bus", action: "present" };

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
    if (!place || !action) {
      ValidationAlert.info("Attention!", "Veuillez choisir toutes les réponses.");
      return;
    }

    const correctCount =
      (place === correctAnswers.place ? 1 : 0) +
      (action === correctAnswers.action ? 1 : 0);

    const total = 2;
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(
        `Excellent! (${correctCount}/${total})`,
        "Toutes les réponses sont correctes."
      );
    } else {
      ValidationAlert.error(
        `Résultat : ${correctCount}/${total}`,
        "Écoute encore et réessaie."
      );
    }
  };

  const showAnswerFunc = () => {
    setPlace(correctAnswers.place);
    setAction(correctAnswers.action);
    setScore({ correct: 2, total: 2 });

    ValidationAlert.success(
      "Answers shown",
      "Les bonnes réponses sont entourées."
    );
  };

  const resetExercise = () => {
    setPlace("");
    setAction("");
    setScore(null);
    resetAudio();
  };

  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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
  // دالة لتحديد الكلاس الأخضر أو الأحمر
  const getLabelClass = (type, value) => {
    if (!score) return "";
    if (value === correctAnswers[type]) return "correct";
    if ((type === "place" && place === value) || (type === "action" && action === value)) return "wrong";
    return "";
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{ backgroundColor: "#73C8D2" }} className="ex-A">D</span>{" "}
        <span style={{ color: "black" }} className="number-of-q">4</span>
      Écoute et entoure les bonnes réponses.
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
      {score && <ScoreCardEnhanced score={score}/>}

      <div className="qcm-container">
        <div className="qcm-column">
          <p className="question-title">a. Les personnages sont :</p>
          <label className={getLabelClass("place","rue")}>
            <input type="radio" name="place" value="rue" checked={place==="rue"} onChange={(e)=>setPlace(e.target.value)} disabled={!!score}/>
            dans la rue
          </label>
          <label className={getLabelClass("place","train")}>
            <input type="radio" name="place" value="train" checked={place==="train"} onChange={(e)=>setPlace(e.target.value)} disabled={!!score}/>
            dans le train
          </label>
          <label className={getLabelClass("place","bus")}>
            <input type="radio" name="place" value="bus" checked={place==="bus"} onChange={(e)=>setPlace(e.target.value)} disabled={!!score}/>
            dans le bus
          </label>
        </div>

        <div className="qcm-column">
          <p className="question-title">b. Ils :</p>
          <label className={getLabelClass("action","present")}>
            <input type="radio" name="action" value="present" checked={action==="present"} onChange={(e)=>setAction(e.target.value)} disabled={!!score}/>
            se présentent
          </label>
          <label className={getLabelClass("action","goodbye")}>
            <input type="radio" name="action" value="goodbye" checked={action==="goodbye"} onChange={(e)=>setAction(e.target.value)} disabled={!!score}/>
            se disent au revoir
          </label>
          <label className={getLabelClass("action","silent")}>
            <input type="radio" name="action" value="silent" checked={action==="silent"} onChange={(e)=>setAction(e.target.value)} disabled={!!score}/>
            ne parlent pas
          </label>
        </div>
      </div>

   

      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;
