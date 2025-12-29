import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/U1SAP6Q3.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert"; 
import "./CSSPAGE/P6U1.css"
import img4 from '../../../assets/unit1/Page18svg/img4.svg';
import img3 from '../../../assets/unit1/Page18svg/img3.svg';
import img2 from '../../../assets/unit1/Page18svg/img2.svg';
import img1 from '../../../assets/unit1/Page18svg/img1.svg';
import drag1 from "../../../assets/unit1/Page18svg/drag1.svg"
import drag2 from "../../../assets/unit1/Page18svg/drag2.svg"
import drag3 from "../../../assets/unit1/Page18svg/drag3.svg"
import drag4 from "../../../assets/unit1/Page18svg/drag4.svg"
import ScoreCardEnhanced from "../../Popup/ScoreCard";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [score, setScore] = useState(null);

  // Audio Controls
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

  // Drag & Drop Exercise
  const exerciseData = {
    topImages: [img1, img2, img3, img4], // Drop zones
    bottomImages: [
      { id: 'img-1', src: drag1 },
      { id: 'img-2', src: drag2 },
      { id: 'img-3', src: drag3 },
      { id: 'img-4', src: drag4 },
    ],
  };

  const initialDroppedState = {
    'drop-1': null,
    'drop-2': null,
    'drop-3': null,
    'drop-4': null,
  };

  const correctOrder = {
    'drop-1': 'img-4',
    'drop-2': 'img-2',
    'drop-3': 'img-1',
    'drop-4': 'img-3',
  };

  const [droppedImages, setDroppedImages] = useState(initialDroppedState);
  const [availableImages, setAvailableImages] = useState([...exerciseData.bottomImages]);

  const handleOnDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // Drop in Drop Zone
    if (destination.droppableId !== "bottom-images") {
      const newDropped = { ...droppedImages };

      // إزالة الصورة من أي Drop zone كانت موجودة فيه
      Object.keys(newDropped).forEach(k => {
        if (newDropped[k] === draggableId) newDropped[k] = null;
      });

      newDropped[destination.droppableId] = draggableId;
      setDroppedImages(newDropped);

      // إزالة الصورة من القائمة السفلية
      setAvailableImages(prev => prev.filter(img => img.id !== draggableId));
    }

    // Drag back to bottom-images (إعادة الصورة للقائمة السفلية)
    if (destination.droppableId === "bottom-images") {
      const wasDropped = Object.keys(droppedImages).find(key => droppedImages[key] === draggableId);
      if (wasDropped) {
        setDroppedImages(prev => ({ ...prev, [wasDropped]: null }));
        setAvailableImages(prev => [...prev, exerciseData.bottomImages.find(img => img.id === draggableId)]);
      }
    }
  };

  const checkDragAnswers = () => {
    const checked = Object.keys(correctOrder).map(dropId => ({
      dropId,
      isCorrect: droppedImages[dropId] === correctOrder[dropId]
    }));

    const correctCount = checked.filter(item => item.isCorrect).length;
    const total = Object.keys(correctOrder).length;

    setScore({ correct: correctCount, total });

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
    const correctMap = {};
    Object.keys(correctOrder).forEach(dropId => {
      correctMap[dropId] = correctOrder[dropId];
    });
    setDroppedImages(correctMap);

    // إزالة كل الصور من القائمة السفلية
    setAvailableImages([]);

    const total = Object.keys(correctOrder).length;
    setScore({ correct: total, total });

    ValidationAlert.info(
      "Answers shown",
      "Correct images have been placed.",
      `${total}/${total}`
    );
  };

  const resetDragExercise = () => {
    setDroppedImages(initialDroppedState);
    setAvailableImages([...exerciseData.bottomImages].sort(() => Math.random() - 0.5));
    setScore(null);

    if (ValidationAlert && typeof ValidationAlert.close === 'function') {
      ValidationAlert.close();
    }
  };

  // Captions
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const captions = [
    { start: 5, end: 6.9, text: "Grand Prix A1" },
    { start: 7.3, end: 8.2, text: "unité 1" },
    { start: 8.7, end: 9.5, text: " se présenter. " },
    { start: 10.2, end: 11.2, text: "Section A." },
    { start: 11.9, end: 12.3, text: "Salut." },
  ];

  const updateCaption = (time) => {
    const index = captions.findIndex(cap => time >= cap.start && time <= cap.end);
    setActiveIndex(index);
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      {/* Header */}
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color:"black", marginTop:"5%", fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">D</span> 
        <span style={{color:"black"}} className="number-of-q">7</span>
    ssocie les drapeaux à chaque photo
      </header>

      {/* Drag & Drop Exercise */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="exercise-layout-vertical"style={{paddingTop:"0%" ,marginTop:"0%"}}>
          {/* Drop zones */}
          <div className="image-section-horizontal">
            {exerciseData.topImages.map((topImg, index) => (
              <Droppable key={`drop-${index + 1}`} droppableId={`drop-${index + 1}`}>
                {(provided, snapshot) => (
                  <div className="image-container">
                    <img src={topImg} alt={`Top ${index + 1}`} className="top-image"/>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`drop-box ${snapshot.isDraggingOver ? 'is-over' : ''}`}
                      style={{ width: "70px", height: "70px", border: "2px dashed #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {droppedImages[`drop-${index + 1}`] && (
                        <img 
                          src={exerciseData.bottomImages.find(img => img.id === droppedImages[`drop-${index + 1}`]).src} 
                          alt="Dropped" 
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          {/* Draggable Images */}
          <Droppable droppableId="bottom-images" direction="horizontal">
            {(provided) => (
              <div className="image-section-horizontal" ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {availableImages.map((img, index) => (
                  <Draggable key={img.id} draggableId={img.id} index={index}>
                    {(providedDraggable, snapshot) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "0px",
                          margin: "0 2px",
                          minHeight: "80px",
                          minWidth: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "2px solid #430f68",
                          borderRadius: "50px",
                          background: snapshot.isDragging ? "#a0e7e5" : "#fff",
                          ...providedDraggable.draggableProps.style
                        }}
                      >
                        <img src={img.src} alt="Draggable" style={{ width: "50px", height: "50px" }}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Score & Buttons */}
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
