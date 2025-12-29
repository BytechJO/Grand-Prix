import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/secbq4.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page10_Q4.css";
import img1 from "../../../assets/unit1/imgs/P10Q4/1.svg";
import img2 from "../../../assets/unit1/imgs/P10Q4/2.svg";
import img3 from "../../../assets/unit1/imgs/P10Q4/3.svg";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

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
 const [score, setScore] = useState(null); 
  // === البيانات الصحيحة ===
  const correctAnswers = {
    a1: "ça",
    a2: "mal",
    b1: "comment",
    b2: "salut",
    b3: "bien",
    b4: "merci",
    c1: "bonjour",
    c2: "vous",
    c3: "mal",
    c4: "Ça va comme ci, comme ça",
    imgA: "c",
    imgB: "b",
    imgC: "a"
  };

  const images = [
    { id: "imgA" },
    { id: "imgB" },
    { id: "imgC" }
  ];

  // === التغييرات على الـ inputs ===
  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value.toLowerCase() }));
  };

  const getInputClass = (id) => {
    if (!answers[id]) return "";
    return answers[id] === correctAnswers[id] ? "correct" : "incorrect";
  };

  // === أزرار التشغيل/الإعادة/إظهار الإجابة ===
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
  // حساب عدد الإجابات الصحيحة (مع تجاهل حالة الحروف)
  let correctCount = 0;
  Object.keys(correctAnswers).forEach(id => {
    if ((answers[id] || '').trim().toLowerCase() === correctAnswers[id].trim().toLowerCase()) {
      correctCount++;
    }
  });

  const total = Object.keys(correctAnswers).length;

  // تحديث ScoreCard
  setScore({ correct: correctCount, total });

  // عرض التنبيهات حسب النتيجة
  if (correctCount === total) {
    ValidationAlert.success(
      `You got all answers right! (${total})`,
      "Excellent work!",
      `${correctCount}/${total}`
    );
  } else if (correctCount === 0) {
    ValidationAlert.info(
      `All answers are incorrect. Try again.`,
      "تحذير ⚠️"
    );
  } else {
    ValidationAlert.error(
      `You answered ${correctCount} out of ${total} correctly.`,
      `${correctCount}/${total}`
    );
  }
};

// عرض الإجابات الصحيحة
const showAnswerFunc = () => {
  setAnswers(correctAnswers);
};

// إعادة التمرين
const resetExercise = () => {
  setAnswers({});
  resetAudio();
};


  const captions = [
  { start:5.50, end: 6.36, text: "Grand Prix A1," },
  { start:6.94, end: 7.96, text: "unité 1," },
  { start:9.79, end: 10.49, text: "Section B." },
  { start:11.27, end: 12.63, text: "Ça va ?" },
  { start:12.63, end: 13.66, text: "Exercice 4." },
  { start:14.21, end: 16.95, text: "Écoute et écris l'information manquante," },
  { start:17.15, end: 19.95, text: "puis associe chaque dialogue à une image." },
  { start:22.27, end: 23.17, text: "Salut ma chérie !" },
  { start:24.41, end: 25.18, text: "Salut maman !" },
  { start:26.24, end: 26.97, text: "Comment ça va ?" },
  { start:28.17, end: 28.79, text: "Mal !" },
  { start:31.33, end: 31.83, text: "Salut Amy," },
  { start:34.11, end: 31.83, text: "comment ça va ?" },
  { start:34.11, end: 34.55, text: "Salut Lily," },
  { start:34.97, end: 35.63, text: "ça va très bien," },
  { start:36.25, end: 35.77, text: "et toi ?" },
  { start:37.29, end: 37.77, text: "Ça va bien," },
  { start:37.77, end: 38.29, text: "merci." },
  { start:40.57, end: 41.79, text: "Bonjour Monsieur Legrand" },
  { start:41.79 , end: 43.79, text: "comment allez-vous ?" },
  { start:43.97, end: 45.19, text: "Bonjour Monsieur Dupuis," },
  { start:45.47, end: 46.23, text: "ça va mal" },
  { start:46.47, end: 46.97, text: "et vous ?" },
  { start:48.13, end: 49.37, text: "Ça va comme ci," },
  { start:49.37, end: 49.89, text: "comme ça." },
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
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">B</span> <span style={{color:"black"}} className="number-of-q">4</span>Écoute et écris l’information manquante. Puis associe chaque dialogue à une image.
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

    <div className="main-content">
  {/* Exercise Inputs - الحوار على اليسار */}
  <div className="exercise-area">
    <div className="exercise">
      <div className="dialogue">
        <strong>a -</strong> Salut, ma chérie ! <br />
        - Salut, maman ! <br />
        - Comment 
        <input className={getInputClass("a1")} value={answers.a1 || ""} onChange={e => handleChange("a1", e.target.value)} /> va ? <br />
        - <input className={getInputClass("a2")} value={answers.a2 || ""} onChange={e => handleChange("a2", e.target.value)} /> !
      </div>

      <div className="dialogue">
        <strong>b -</strong> Salut, Amy ! 
        <input className={getInputClass("b1")} value={answers.b1 || ""} onChange={e => handleChange("b1", e.target.value)} /> ça va ? <br />
        - <input className={getInputClass("b2")} value={answers.b2 || ""} onChange={e => handleChange("b2", e.target.value)} />, Lili ! Ça va très 
        <input className={getInputClass("b3")} value={answers.b3 || ""} onChange={e => handleChange("b3", e.target.value)} /> ! <br />
        Et toi ? <br />
        - Ça va bien, <input className={getInputClass("b4")} value={answers.b4 || ""} onChange={e => handleChange("b4", e.target.value)} /> !
      </div>

      <div className="dialogue">
        <strong>c -</strong> 
        <input className={getInputClass("c1")} value={answers.c1 || ""} onChange={e => handleChange("c1", e.target.value)} />, monsieur Legrand ! <br />
        Comment allez- <input className={getInputClass("c2")} value={answers.c2 || ""} onChange={e => handleChange("c2", e.target.value)} /> ? <br />
        - Bonjour, monsieur Dupuis ! Ça va <input className={getInputClass("c3")} value={answers.c3 || ""} onChange={e => handleChange("c3", e.target.value)} /> ! Et vous ? <br />
        - <input id='i4' className={getInputClass("c4")} value={answers.c4 || ""} onChange={e => handleChange("c4", e.target.value)} />
      </div>
    </div>
  </div>

  {/* Images Inputs - الصور على اليمين */}
  <div className="images-area3">
    <div className="top-images-row3">
      <div className="image-box3">
        <img src={img1} alt="img1" />
        <input className="image-input" value={answers.imgA || ""} onChange={e => handleChange("imgA", e.target.value)} placeholder="a/b/c" />
      </div>
      <div className="image-box3">
        <img src={img2} alt="img2" />
        <input className="image-input" value={answers.imgB || ""} onChange={e => handleChange("imgB", e.target.value)} placeholder="a/b/c" />
      </div>
    </div>
    <div className="bottom-image-row">
      <div className="image-box3">
        <img src={img3} alt="img3" />
        <input className="image-input" value={answers.imgC || ""} onChange={e => handleChange("imgC", e.target.value)} placeholder="a/b/c" />
      </div>
    </div>
  </div>
</div>

<div className="spaces"></div>
{score && <ScoreCardEnhanced score={score} />}
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
