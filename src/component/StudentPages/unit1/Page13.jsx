import React from "react";
import page_11 from "../../../assets/unit1/imgs/Pages/13.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/ScQ1.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
  const captionsExample = [
  { start:5.5, end: 6.9, text: "Grand Prix A1" },
  { start:7.2, end: 8.2, text: "unité 1" },
  { start:8.5, end: 9.5, text: "se présenter" },
  { start:10.0, end: 10.9, text: "Section C" },
  { start:11.5, end: 12.0, text: "mon âge." },
  { start:13.0, end: 13.9, text: "Exercice 1." },
  { start:14.9, end: 16.43, text: "Écoute et répète." },
  { start:16.6, end: 17.73, text: "1" },
  { start:20.32, end: 20.51, text: "2" },
  { start:21.63, end: 21.91, text: "3" },
  { start:21.9, end: 22.4, text: "4" },
  { start:24.8, end: 25.9, text: "5" },
  { start:25.11, end: 26.87, text: "6" },
  { start:26.8, end: 28.61, text: "7" },
  { start:29.7, end: 30.0, text: "8" },
  { start:31.4, end: 31.8, text: "9" },
  { start:33.2, end: 33.5, text: "10" },
  { start:34.8, end: 35.2, text: "11" },
  { start:36.5, end: 36.9, text: "12" },
  { start:38.24, end: 38.59, text: "13" },
  { start:39.9, end: 40.4, text: "14" },
  { start:41.7, end: 42.07, text: "15" },
  { start:43.5, end: 43.9, text: "16" },
  { start:45.12, end: 45.8, text: "17" },
  { start:45.9, end: 46.3, text: "18" },
  { start:46.3, end: 46.45, text: "19" },
  { start:46.45, end: 46.55, text: "20" },
  { start:0.0, end: 0.0, text: "" },
  { start:0.0, end: 0.0, text: "" },
  { start:0.0, end: 0.0, text: "" },
  { start:0.0, end: 0.0, text: "" },


 
  
];
const Page10 = ({ openPopup }) => {
  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img
        src={page_11}
        alt="Page 5"
        style={{ display: "block", width: "100%" }}
      />

      {/* زر الصوت الأول */}
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "15%", // عدّل حسب مكان الزر
          left: "4%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px",
          height: "30px",
        }}
        onClick={() => openPopup("audio", <AudioWithCaption src={page5_CD2}  captions={captionsExample}/>)}
      ></div>

      <div
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "43%",
          left: "24%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 9 })}
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
