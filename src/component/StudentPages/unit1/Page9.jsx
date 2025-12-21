import React from "react";
import page_5 from "../../../assets/unit1/imgs/Pages/9.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/U!SECBQ1.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1"
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const captionsExample = [
  { start:5.31, end: 6.63, text: "Grand Prix A1," },
  { start:6.94 , end: 7.96, text: "unité 1," },
  { start:8.22 , end: 9.17, text: "se présenter." },
  { start:9.76 , end: 10.45, text: "Section B." },
  { start:11.27 , end: 12.59, text: "Ça va ?" },
  { start:12.59 , end: 13.72, text: "Exercice 1." },
  { start:14.73 , end: 15.21, text: "Écoute," },
  { start:15.61 , end: 15.59, text: "répète et place dans l'ordre." },
  { start:19.69 , end: 20.47, text: "Comment ça va ?" },
  { start:22.73 , end: 23.25, text: "Très bien." },
  { start:24.45 , end: 24.85, text: "Bien." },
  { start:26.19 , end: 26.71, text: "Comme ci," },
  { start:26.71 , end: 27.23, text: "comme ça." },
  { start:28.41 , end: 28.85, text: "Mal." },
  { start:30.04 , end: 30.76, text: "Très mal." },

 
  
];
const Page9 = ({ openPopup }) => {

  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img src={page_5} alt="Page 5" style={{ display: "block", width: "100%" }} />

     




                 {/* زر الصوت الأول */}
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "14%", // عدّل حسب مكان الزر
          left: "6%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "30px", height: "30px"
        }}
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={page5_CD2} captions={captionsExample} />
          )
        }
      >
      </div>
       
    </div>
  );
};

export default Page9;
