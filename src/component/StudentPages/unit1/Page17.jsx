import React from "react";
import page_11 from "../../../assets/unit1/imgs/Pages/17.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/P17Q1.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
const captionsExample = [
  { start:4.9, end: 6.6, text: "Grand Prix A1" },
  { start:6.6, end: 8.0, text: "Unité 1" },
  { start:8.0, end: 8.9, text: "Se présenter" },
  { start:9.7, end: 10.5, text: "Section D" },
  { start:11.2, end: 12.2, text: "Ma nationalité" },
  { start:13.2, end: 14.3, text: "Exercice 1" },
  { start:15.0, end: 16.5, text: "Écoute, répète" },
  { start:16.5, end: 17.6, text: "et place" },
  { start:17.6, end: 18.2, text: "dans l'ordre." },
  { start:20.2, end: 20.7, text: "A." },
  { start:20.7, end: 21.4, text: "Je suis" },
  { start:21.4, end: 22.3, text: "Sud-Africain." },
  { start:23.0, end: 23.9, text: "Sud-Africaine." },
  { start:25.8, end: 26.6, text: "B" },
  { start:26.6, end: 28.3, text: "Je suis Canadien." },
  { start:28.3, end: 29.0, text: "Canadienne." },
  { start:30.4, end: 32.0, text: "C" },
  { start:32.0, end: 33.2, text: "Je suis Indien." },
  { start:33.7, end: 34.3, text: "Indienne." },
  { start:36.6, end: 37.3, text: "D." },
  { start:37.3, end: 37.9, text: "Je suis" },
  { start:37.9, end: 38.6, text: "Américain," },
  { start:39.2, end: 40.1, text: "Américaine" },
  { start:41.1, end: 42.7, text: "E" },
  { start:42.7, end: 43.4, text: "Je suis" },
  { start:43.4, end: 44.0, text: "Finlandais," },
  { start:44.8, end: 45.6, text: "Finlandaise." },
  { start:46.9, end: 48.5, text: "F" },
  { start:48.5, end: 48.9, text: "Je suis" },
  { start:48.9, end: 49.6, text: "Australien" },
  { start:50.1, end: 50.9, text: "Australienne." },
  { start:52.5, end: 53.9, text: "G." },
  { start:53.9, end: 54.8, text: "Je suis Français" },
  { start:55.5, end: 56.3, text: "Française." },
  { start:58.5, end: 59.1, text: "H" },
  { start:59.1, end: 59.1, text: "Je suis" },
  { start:60.9, end: 61.7, text: "Brésilien" },
  { start:63.2, end: 64.5, text: "I." },
  { start:64.5, end: 68.2, text: "Je suis Russe" },
  { start:68.2, end: 69.4, text: "Je suis Chinoise." },

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
        className="Click -icon-CD-page5 hover:scale-110 transition"
        style={{
          overflow: "visible",
          position: "absolute",
          top: "15.5%",
          left: "47%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 13 })}
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
          top: "69%",
          left: "32.5%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 14 })}
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
          top: "14%", // عدّل حسب مكان الزر
          left: "4%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "70px",
          height: "30px",
        }}
        onClick={() => openPopup("audio", <AudioWithCaption src={page5_CD2} captions={captionsExample}/>)}
      ></div>
    </div>
  );
};

export default Page10;
