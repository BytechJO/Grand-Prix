import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAP6Q3.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert"; 
import "./Page6_Q1.css"
import img3 from "../../../assets/unit1/imgs/page6/3.svg"
import img4 from "../../../assets/unit1/imgs/page6/4.svg"
import img2 from "../../../assets/unit1/imgs/page6/5.svg"
import img1 from "../../../assets/unit1/imgs/page6/6.svg"
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه


import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null); // لتخزين عدد الإجابات الصحيحة وإجمالي الأسئلة

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

  // ================= Drag & Drop Exercise =================
  const exerciseData = {
    pairs: [
      { id: 'pair-1', letter: 'A', content: 'Bonjour, les enfants!' },
      { id: 'pair-2', letter: 'B', content: 'Au revoir, les enfants!' },
      { id: 'pair-3', letter: 'C', content: 'Salut, Marie. Salut, Denice' },
      { id: 'pair-4', letter: 'D', content: 'Bonjour, madame Rose.' },
    ],
    images: [img1, img2, img3, img4],
  };

  const getShuffledPairs = () => [...exerciseData.pairs].sort(() => Math.random() - 0.5);

  const initialDroppedState = {
    'drop-1': null,
    'drop-2': null,
    'drop-3': null,
    'drop-4': null,
  };

  const correctOrder = {
    'drop-1': 'D',
    'drop-2': 'B',
    'drop-3': 'A',
    'drop-4': 'C',
  };

  const [droppedLetters, setDroppedLetters] = useState(initialDroppedState);
  const [shuffledPairs, setShuffledPairs] = useState(getShuffledPairs());

  const handleOnDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === 'letters') return;

    const newDropped = { ...droppedLetters };
    Object.keys(newDropped).forEach(k => {
      if (newDropped[k] === draggableId) newDropped[k] = null;
    });

    newDropped[destination.droppableId] = draggableId;
    setDroppedLetters(newDropped);
  };

const checkDragAnswers = () => {
  // تحقق من كل drop-box
  const checked = Object.keys(correctOrder).map(dropId => ({
    dropId,
    isCorrect: droppedLetters[dropId] === correctOrder[dropId]
  }));

  const correctCount = checked.filter(item => item.isCorrect).length;
  const total = Object.keys(correctOrder).length;

  // تحديث score ليظهر في ScoreCardEnhanced
  setScore({ correct: correctCount, total });

  // عرض التنبيهات
  if (correctCount === total) {
    ValidationAlert.success(
      `You got all answers right! (${total})`,
      "Excellent work!",
      `${correctCount}/${total}`
    );
  } else if (correctCount === 0) {
    ValidationAlert.info(
      "All answers are incorrect. Try again.",
      "تحذير ⚠️"
    );
  } else {
    ValidationAlert.error(
      `You answered ${correctCount} out of ${total} correctly.`,
      `${correctCount}/${total}`
    );
  }
};



const showCorrectDragAnswer = () => {
  // وضع الإجابات الصحيحة
  const correctMap = {};
  Object.keys(correctOrder).forEach(dropId => {
    correctMap[dropId] = correctOrder[dropId];
  });
  setDroppedLetters(correctMap);

  // تحديث score بعد عرض الإجابات الصحيحة
  const total = Object.keys(correctOrder).length;
  const correctCount = total; // جميعها صحيحة بعد العرض
  setScore({ correct: correctCount, total });

  ValidationAlert.info(
    "Answers shown",
    "Correct letters have been placed.",
    `${correctCount}/${total}`
  );
};



 const resetDragExercise = () => {
  setDroppedLetters(initialDroppedState);
  setShuffledPairs(getShuffledPairs());
  setScore(null); // إعادة تعيين ScoreCard

  if (ValidationAlert && typeof ValidationAlert.close === 'function') {
    ValidationAlert.close();
  }
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
  { start: 12.9, end: 14.3, text: "Exercice 3." },
  { start: 14.9, end: 15.5, text: "Écoute" },
  { start: 15.8, end: 17.29, text: "et associe chaque dialogue" },
  { start: 17.29, end: 18.11, text: "à une image." },
  { start: 20.25, end: 21.19, text: "Bonjour les enfants." },
  { start: 22.37, end: 23.77, text: "Bonjour Monsieur Dubois." },
  { start: 25.18, end: 26.35, text: "Au revoir les enfants." },
  { start: 27.47, end: 28.43, text: "Au revoir maman," },
  { start: 28.34, end: 29.35, text: "à plus tard." },
  { start: 32.19, end: 33.65, text: "Salut Marie !" },
  { start: 33.93, end: 36.71, text: "Salut Denise !" },
  { start: 36.7, end: 38.9, text: "Bonjour Madame Rose !" },
  { start: 38.9, end: 39.9, text: "Bonjour Madame Blanc !" },
  ];
  // =========================================================
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
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">3</span>Écoute et associe chaque dialogue à une image.
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
  
  

    

      {/* ========== Drag & Drop Exercise ========= */}
  <DragDropContext onDragEnd={handleOnDragEnd}>
  <div style={{ marginTop: "0%" }} className="exercise-layout-vertical">
    {/* الكلمات في الأعلى */}
    <Droppable droppableId="letters" direction="horizontal" isDropDisabled={true}>
      {(provided) => (
        <div className="letters-section-horizontal" ref={provided.innerRef} {...provided.droppableProps}>
          {shuffledPairs.map((pair, index) => {
            const isDropped = Object.values(droppedLetters).includes(pair.letter);
            if (isDropped) return null;

            return (
              <div key={pair.id} className="letter-sentence-pair">
                <Draggable draggableId={pair.letter} index={index}>
                  {(providedDraggable, snapshot) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      className={`letter-box ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      {pair.letter}
                    </div>
                  )}
                </Draggable>
                <span className="sentence-text">{pair.content}</span>
              </div>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    {/* الصور في الأسفل - عمودين */}
    <div className="image-section-horizontal">
      {/* العمود الأول */}
      <div className="image-column">
        {exerciseData.images.slice(0, Math.ceil(exerciseData.images.length / 2)).map((imageSrc, index) => (
          <Droppable key={`drop-${index + 1}`} droppableId={`drop-${index + 1}`}>
            {(provided, snapshot) => (
              <div className="image-container">
                <img src={imageSrc} alt={`Visual hint ${index + 1}`} />
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`drop-box ${snapshot.isDraggingOver ? 'is-over' : ''}`}
                >
                  {droppedLetters[`drop-${index + 1}`] ? (
                    <div className="dropped-letter">{droppedLetters[`drop-${index + 1}`]}</div>
                  ) : (
                    <span className="placeholder">{index + 1}</span>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
      
      {/* العمود الثاني */}
      <div className="image-column">
        {exerciseData.images.slice(Math.ceil(exerciseData.images.length / 2)).map((imageSrc, index) => {
          const actualIndex = Math.ceil(exerciseData.images.length / 2) + index;
          return (
            <Droppable key={`drop-${actualIndex + 1}`} droppableId={`drop-${actualIndex + 1}`}>
              {(provided, snapshot) => (
                <div className="image-container">
                  <img src={imageSrc} alt={`Visual hint ${actualIndex + 1}`} />
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`drop-box ${snapshot.isDraggingOver ? 'is-over' : ''}`}
                  >
                    {droppedLetters[`drop-${actualIndex + 1}`] ? (
                      <div className="dropped-letter">{droppedLetters[`drop-${actualIndex + 1}`]}</div>
                    ) : (
                      <span className="placeholder">{actualIndex + 1}</span>
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </div>
  </div>
</DragDropContext>
      <div className="spaces">
   
</div>

      {score && <ScoreCardEnhanced score={score} />}
<div className="action-buttons-container flex gap-4 mt-4">
          <button onClick={resetDragExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showCorrectDragAnswer} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkDragAnswers} className="check-button2">Vérifier la réponse✓</button>
          </div>
   
    </div>
  );
};

export default Page5_Q1_CleanAudio;
