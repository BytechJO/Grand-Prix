import React from "react";
import page_5 from "../../../assets/unit1/imgs/Pages/10.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/secbq4.mp3";
import page10_CD2 from "../../../assets/unit1/SoundU1/SBQ5.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const Page10 = ({ openPopup }) => {
  
  
  const captionsExample = [
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
  
  const captionsExample2 = [
  { start:5.50, end: 6.36, text: "Grand Prix A1," },
  { start:6.94, end: 7.96, text: "unité 1" },
  { start:8.29, end: 9.24, text: "seprésenter" },
  { start:9.79, end: 10.51, text: "Section B." },
  { start:11.20, end: 12.65, text: "Çava?" },
  { start:12.65, end: 13.82, text: "Exercice 5" },
  { start:14.62, end: 20.83, text: "Écoute et note très bien ou comme si comme ça ou mal," },
  { start:21.29, end: 22.63, text: "puis répète." },
  { start:24.80, end: 25.63, text: "Comment ça va ?" },
  { start:26.88, end: 27.48, text: "Très bien !" },
  { start:29.63, end: 31.65, text: "Comment ça va ?" },
  { start:31.65, end: 32.15, text: "Comme ci," },
  { start:32.15, end: 32.59, text: "comme ça." },
  { start:34.75, end: 36.49, text: "Comment ça va ?" },
  { start:36.70, end: 37.37, text: "Très bien." },
  { start:38.62, end: 41.25, text: "Comment ça va ?" },
  { start:41.25, end: 41.27, text: "Mal." },
  { start:43.77, end: 45.65, text: "Comment ça va ?" },
  { start:45.65, end: 46.15, text: "Comme ci," },
  { start:46.15, end: 46.55, text: "comme ça." },
 
  

 
  
];
  
  
  
  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img
        src={page_5}
        alt="Page 5"
        style={{ display: "block", width: "100%" }}
      />

      {/* زر الصوت الأول */}
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "7%", // عدّل حسب مكان الزر
          left: "3%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "70px",
          height: "30px",
  
        }}
        onClick={() => openPopup("audio", <AudioWithCaption src={page5_CD2} captions={captionsExample} />)}
      ></div>

      <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "8%",
          left: "92%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 6 })}
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
          top: "37%",
          left: "50%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 7 })}
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
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "36%", // عدّل حسب مكان الزر
          left: "6%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "30px",
          height: "30px",
        }}
        onClick={() =>
          openPopup("audio", <AudioWithCaption src={page10_CD2} captions={captionsExample2} />)
        }
      ></div>
    </div>
  );
};

export default Page10;
