import React, { useState, useRef } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/SoundU1/1.mp3";
import imgBackground from "../../../assets/unit1/sectionD/P17Q1.svg"; // صورة التمرين
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; 
import './Page17_Q1.css';


const numbersList = [1, 2, 3, 4, 5,6]; // الأرقام في القائمة
const correctAnswers = {0:'2',1:'4',2:'1',3:'5',4:'3',5:"",6:""}; // الإجابات الصحيحة

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

  const captions = [
    { start:5.0 , end: 7.0, text: "GrandPrixA1" },
    { start: 7.3, end: 8.3, text: "unité 1," },
    { start: 8.3, end: 9.6, text: " seprésenter. " },
    { start: 10.2, end: 11.2, text: " SectionA " },
    { start: 13.1, end: 14.2, text: " Exercice1 " },
    { start: 14.8, end: 15.3, text: " Écoute " },
  ];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play(); setIsPlaying(true);
    } else { audio.pause(); setIsPlaying(false); }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrent(0);
    }
  };

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) setInputs({ ...inputs, [index]: value });
  };

  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      if(inputs[key] === correctAnswers[key]) correctCount++;
    });
    const total = Object.keys(correctAnswers).length;
    setScore({ correct: correctCount, total });

    if(correctCount===total){
      ValidationAlert.success(`Excellent! (${correctCount}/${total})`,`All answers correct!`);
    } else if(correctCount===0){
      ValidationAlert.error(`All answers incorrect (${correctCount}/${total})`,`Try again!`);
    } else {
      ValidationAlert.error(`You got ${correctCount} out of ${total} correct.`,`Almost there!`);
    }
  };

  const showAnswerFunc = () => setInputs(correctAnswers);
  const resetExercise = () => { setInputs({}); setScore(null); resetAudio(); }

  const updateCaption = (time) => {
    const index = captions.findIndex(cap=>time>=cap.start && time<=cap.end);
    setActiveIndex(index);
  }
const inputPositions = [
  { id: 0, top: "30%", left: "16%" },
  { id: 1, top: "45%", left: "22%" },
  { id: 2, top: "69%", left: "33%" },
  { id: 3, top: "30%", left: "47%" },
  { id: 4, top: "42%", left: "43%" },
  { id: 5, top: "76%", left: "47%" },
  { id: 6, top: "75%", left: "70%" },
  { id: 7, top: "50%", left: "70%" },
  { id: 8, top: "52%", left: "58%" },
  { id: 9, top: "30%", left: "75%" },
];

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">

      {/* Header */}
      <header className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}>
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> 
        <span style={{color:"black"}} className="number-of-q">1</span> 
        Écoute, répète et place dans l'ordre.
      </header>

      {/* Audio Player */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="audio-popup-read" style={{ width: "30%" }}>
          <div className="audio-inner player-ui">
            <audio
              ref={audioRef}
              src={CD6_Pg8_Instruction1_AdultLady}
              onTimeUpdate={e=>{ setCurrent(e.target.currentTime); updateCaption(e.target.currentTime); }}
              onLoadedMetadata={e=>setDuration(e.target.duration)}
            />
            <div className="top-row">
              <span className="audio-time">{new Date(current*1000).toISOString().substring(14,19)}</span>
              <input type="range" className="audio-slider" min="0" max={duration} value={current}
                onChange={e=>{ audioRef.current.currentTime=e.target.value; updateCaption(Number(e.target.value)); }}
                style={{ background: `linear-gradient(to right, #430f68 ${(current/duration)*100}%, #d9d9d9ff ${(current/duration)*100}%)` }}
              />
              <span className="audio-time">{new Date(duration*1000).toISOString().substring(14,19)}</span>
            </div>
            <div className="bottom-row flex justify-between items-center">
              <div className={`round-btn ${showCaption?"active":""}`} style={{ position:"relative"}} onClick={()=>setShowCaption(!showCaption)}>
                <TbMessageCircle size={36}/>
                <div className={`caption-inPopup ${showCaption?"show":""}`} style={{top:"100%", left:"10%"}}>
                  {captions.map((cap,i)=><p key={i} className={`caption-inPopup-line2 ${activeIndex===i?"active":""}`}>{cap.text}</p>)}
                </div>
              </div>
              <button className="play-btn2" onClick={togglePlay}>{isPlaying?<FaPause size={26}/>:<FaPlay size={26}/>}</button>
              <div className="settings-wrapper">
                <button className={`round-btn ${showSettings?"active":""}`} onClick={()=>setShowSettings(!showSettings)}>
                  <IoMdSettings size={36}/>
                </button>
                {showSettings && (
                  <div className="settings-popup">
                    <label>Volume</label>
                    <input type="range" min="0" max="1" step="0.05" value={volume}
                      onChange={e=>{ setVolume(e.target.value); audioRef.current.volume=e.target.value; }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ScoreCard */}
      {score && <ScoreCardEnhanced score={score}/>}

      {/* Exercise Image & Inputs */}
      <div className="exercise-container" style={{ display:"flex", gap:"30px", alignItems:"flex-start", justifyContent:"center", width:"100%" }}>
       <div className="image2-container" style={{ position:"relative", flex:1, display:"flex", justifyContent:"center" }}>
  <img src={imgBackground} alt="Exercise" style={{ width:"80%", height:"auto", }}/>
  
  {inputPositions.map(pos => (
    <input
      key={pos.id}
      type="text"
      maxLength="1"
      className="number-input"
      value={inputs[pos.id] || ''}
      onChange={e => handleInputChange(pos.id, e.target.value)}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width:"40px",
        height:"40px",
        textAlign:"center",
        fontSize:"18px",
        border:"2px solid #f48684",
       backgroundColor:"white"
      }}
    />
  ))}
</div>


        {/* Numbers List */}
        <div className="numbers-list" style={{ flex:"0.3", display:"flex", flexDirection:"column", gap:"10px" }}>
          <h3>Numbers:</h3>
          <ul style={{ listStyle:"none", padding:0 }}>
            {numbersList.map(num=>{
              const isUsed = Object.values(inputs).includes(num.toString());
              return <li key={num} style={{ backgroundColor:"#f2f2f2", padding:"8px 12px", marginBottom:"5px", borderRadius:"5px", textAlign:"center", fontWeight:"bold", color:isUsed?"blue":"black" }}>{num}</li>
            })}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
 <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={showAnswerFunc} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswer} className="check-button2">
          Check Answer ✓
        </button>
      </div>

    </div>
  );
};

export default Page5_Q1_CleanAudio;
