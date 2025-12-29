import React, { useState, useRef, useEffect } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/P17Q1.mp3";
import imgBackground from "../../../assets/unite2pages/svg/Q126.png";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

/* 🔴 القائمة */
const numbersList = [
  { id: "a", label: "Un stylo" },
  { id: "b", label: "Un crayon" },
  { id: "c", label: "Une paire de ciseaux" },
  { id: "d", label: "Une trousse" },
  { id: "e", label: "Une règle" },
  { id: "f", label: "Un livre" },
  { id: "g", label: "Une gomme" },
  { id: "h", label: "Un cahier" },
  { id: "i", label: "Des crayons de couleur" },
  { id: "j", label: "Un sac à dos" },
  { id: "k", label: "Un taille-crayon" },
  { id: "l", label: "Des surligneurs" },
  { id: "m", label: "Un compas" },
];

/* 🔴 الإجابات الصحيحة */
const correctAnswers = {
  0: "m",
  1: "e",
  2: "b",
  3: "k",
  4: "i",
  5: "d",
  6: "a",
  7: "g",
  8: "l",
  9: "f",
  10: "h",
  11: "j",
  12: "c",
  // 13: "m",
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const captions = [
    { start: 5.0, end: 7.0, text: "GrandPrixA1" },
    { start: 7.3, end: 8.3, text: "unité 1," },
    { start: 8.3, end: 9.6, text: " seprésenter. " },
    { start: 10.2, end: 11.2, text: " SectionA " },
    { start: 13.1, end: 14.2, text: " Exercice1 " },
    { start: 14.8, end: 15.3, text: " Écoute " },
  ];

  // 🔴 تحديث عرض النافذة عند تغيير الحجم
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  /* 🔴 مواقع الـ inputs فوق الصورة - متجاوبة مع حجم الشاشة */
  const getInputPositions = () => {
    // أحجام مختلفة حسب عرض الشاشة
    const inputSize = windowWidth < 768 ? 30 : windowWidth < 1024 ? 35 : 40;
    
    return [
      { id: 0, top: "65%", left: "25%", size: inputSize },
      { id: 1, top: "80%", left: "22%", size: inputSize },
      { id: 2, top: "87%", left: "33%", size: inputSize },
      { id: 3, top: "70%", left: "35%", size: inputSize },
      { id: 4, top: "74%", left: "42%", size: inputSize },
      { id: 5, top: "76%", left: "55%", size: inputSize },
      { id: 6, top: "86%", left: "42%", size: inputSize },     
      { id: 7, top: "86%", left: "51%", size: inputSize },
      { id: 8, top: "82%", left: "62%", size: inputSize },
      { id: 9, top: "73%", left: "64%", size: inputSize },
      { id: 10, top: "62%", left: "60%", size: inputSize },
      { id: 11, top: "50%", left: "68%", size: inputSize },
      { id: 12, top: "75%", left: "75%", size: inputSize },
    ];
  };

  const inputPositions = getInputPositions();

  // 🔴 تحديد إذا كان الجهاز محمولاً
  const isMobile = windowWidth < 768;

  return (
    <div style={styles.pageWrapper}>
    <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">D</span> <span style={{color:"black"}} className="number-of-q">1</span> Écoute, répète et place dans l’ordre.
      </header>

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

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise */}
      <div style={isMobile ? styles.exerciseContainerMobile : styles.exerciseContainer}>
        {/* القائمة على اليسار */}
        <div style={isMobile ? styles.numbersListMobile : styles.numbersList}>
          <ul style={styles.list}>
            {numbersList.map(item => {
              const isUsed = Object.values(inputs).some(val => val === item.id);
              return (
                <li
                  key={item.id}
                  style={{
                    ...styles.listItem,
                    ...(isUsed ? styles.usedItem : {})
                  }}
                >
                  <span style={styles.itemId}>{item.id}.</span>
                  <span style={isUsed ? styles.usedText : styles.itemText}>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* الصورة على اليمين */}
        <div style={isMobile ? styles.imageContainerMobile : styles.imageContainer}>
          <img
            src={imgBackground}
            alt="Exercise"
            style={styles.image}
          />

          {inputPositions.map(pos => (
            <input
              key={pos.id}
              type="text"
              maxLength="1"
              value={inputs[pos.id] || ""}
              onChange={(e) => handleInputChange(pos.id, e.target.value)}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                textAlign: "center",
                fontSize: isMobile ? "16px" : "18px",
                border: "2px solid #f48684",
                backgroundColor: "white",
                borderRadius: "6px",
                outline: "none",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

// 🔴 الأنماط كاملة (Inline Styles)
const styles = {
  pageWrapper: {
    width: "100%",
    minHeight: "100vh",
    padding: window.innerWidth < 768 ? "0.5rem" : "2rem",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: window.innerWidth < 768 ? "1rem" : "2rem",
  },
  

  

  
  // 🔴 تخطيط لأجهزة الكمبيوتر والتابلت
  exerciseContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "1400px",
    height: window.innerWidth < 1024 ? "70vh" : "75vh",
    maxHeight: "800px",
    gap: "1.5rem",
    marginBottom: "1rem",
    flexDirection: "row",
  },
  
  // 🔴 تخطيط للمحمول
  exerciseContainerMobile: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1rem",
  },
  
  // 🔴 القائمة لأجهزة الكمبيوتر والتابلت
  numbersList: {
    width: window.innerWidth < 1024 ? "30%" : "25%",
    maxWidth: "350px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    maxHeight: "500px",
    overflowY: "auto",
  },
  
  // 🔴 القائمة للمحمول
  numbersListMobile: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    maxHeight: "300px",
    overflowY: "auto",
  },
  
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0.8rem",
  },
  
  listItem: {
    backgroundColor: "#f2f2f2",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    display: "flex",
    gap: "0.8rem",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    borderLeft: "4px solid transparent",
  },
  
  usedItem: {
    color: "#1e88e5",
    borderLeftColor: "#1e88e5",
  },
  
  itemId: {
    color: "#f48684",
    minWidth: "1.5rem",
  },
  
  itemText: {
    color: "#000",
  },
  
  usedText: {
    color: "#1e88e5",
  },
  
  // 🔴 حاوية الصورة لأجهزة الكمبيوتر والتابلت
  imageContainer: {
    position: "relative",
    width: window.innerWidth < 1024 ? "70%" : "75%",
    flexGrow: "1",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: "500px",
  },
  
  // 🔴 حاوية الصورة للمحمول
  imageContainerMobile: {
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: "400px",
  },
  
  image: {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    objectFit: "contain",
  },
  

};

export default Page5_Q1_CleanAudio;