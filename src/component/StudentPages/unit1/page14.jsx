import React from "react";
import page_11 from "../../../assets/unit1/imgs/Pages/14.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/ScQ4.mp3";
import page14_CD2 from "../../../assets/unit1/SoundU1/ScQ5.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1"
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
const captionsExample = [
  { start:5.0, end: 6.87, text: "Grand Prix A1" },
  { start:7.23, end: 8.13, text: "unité 1" },
  { start:8.51, end: 9.43, text: "se présenter" },
  { start:9.99, end: 10.91, text: "Section C" },
  { start:11.53, end: 12.07, text: "mon âge" },
  { start:12.99, end: 13.91, text: "Exercice 4" },
  { start:14.72, end: 16.81, text: "écoute et entoure les erreurs" },
  { start:19.17, end: 20.70, text: "Je m'appelle Jean-Pierre," },
  { start:21.17, end: 21.85, text: "j'ai 16 ans." },
  { start:22.59, end: 30.61, text: "Mon numéro d'étudiant est le 95738640." },

];
const Q5caption = [
  { start:5.0, end: 6.87, text: "Grand Prix A1" },
  { start:7.23, end: 8.13, text: "unité 1" },
  { start:8.51, end: 9.43, text: "se présenter" },
  { start:9.99, end: 10.91, text: "Section C" },
  { start:11.53, end: 12.07, text: "mon âge" },
  { start:12.99, end: 13.91, text: "Exercice 5" },
  { start:15.26, end: 16.37, text: "Écoute encore une fois." },
  { start:17.13, end: 18.67, text: "Note les informations correctes." },
  { start:20.96, end: 22.31, text: "Je m'appelle Jean-Pierre." },
  { start:22.95, end: 23.55, text: "J'ai 16 ans." },
  { start:24.41, end: 33.01, text: "Mon numéro d'étudiant est le 957386421." },



 
  
];

const Page10 = ({ openPopup }) => {

  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img src={page_11} alt="Page 5" style={{ display: "block", width: "100%" }} />

      {/* زر الصوت الأول */}
    <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "7%", // عدّل حسب مكان الزر
          left: "4%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "40px", height: "30px",
 
        
        }}
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={page5_CD2} captions={captionsExample} />
          )
        }
      >
      </div>

  <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "7.5%",
          left: "39%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 10 })}
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
          top: "47%", // عدّل حسب مكان الزر
          left: "2%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px", height: "30px",
     
        
        }}
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={page14_CD2} captions={Q5caption} />
          )
        }
      >
      </div>
       <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "48.7%",
          left: "69%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 11 })}
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

export default Page10;
