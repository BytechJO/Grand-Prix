import React from "react";
import page_6 from "../../../assets/unit1/imgs/Pages/6.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/U1SAP6Q3.mp3";
import page5_CD3 from "../../../assets/unit1/SoundU1/U1SAQ5.mp3";
import AudioWithCaption from "../../AudioWithCaption";

import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import { Captions } from "lucide-react";


const captionsExample = [
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



const Caption2 =[
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

const Page6 = ({ openPopup }) => {
  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img
        src={page_6}
        alt="Page 5"
        style={{ display: "block", width: "100%" }}
      />

      {/* زر الصوت الأول */}
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "5%", // عدّل حسب مكان الزر
          left: "3%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px",
          height: "50px",
        
         
        }}
        onClick={() => openPopup("audio", <AudioWithCaption src={page5_CD2} captions={captionsExample} />) }
      ></div>
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "58%", // عدّل حسب مكان الزر
          left: "0%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px",
          height: "50px",
    
          
        }}
        onClick={() => openPopup("audio", <AudioWithCaption src={page5_CD3} captions={Caption2} />)}
      ></div>

      <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "6.7%",
          left: "57%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 2 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <image
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "61%",
          left: "29%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 3 })}
          // className="click-icon-page8-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <image
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Page6;
