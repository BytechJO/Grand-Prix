import React from "react";
import page_11 from "../../../assets/unit1/imgs/Pages/18.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/Unite1SectionDExercice4.mp3";
import page5_CD3 from "../../../assets/unit1/SoundU1/Unite1SectioDExercice6.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const Page10 = ({ openPopup }) => {
  const captionsExample = [
    { start: 4.9, end: 6.6, text: "Grand Prix A1," },
    { start: 6.6, end: 8.0, text: "Unité 1" },
    { start: 8.0, end: 8.9, text: "Se présenter" },
    { start: 9.7, end: 10.5, text: "Section D" },
    { start: 11.1, end: 12.2, text: "Ma nationalité" },
    { start: 13.0, end: 14.0, text: "Exercice 6" },
    { start: 15.0, end: 16.5, text: "Écoute et trouve" },
    { start: 16.5, end: 17.6, text: "la nationalité" },
    { start: 17.6, end: 18.1, text: "de chaque" },
    { start: 18.1, end: 18.7, text: "personne." },
    { start: 20.5, end: 21.8, text: "Les personnages" },
    { start: 21.8, end: 22.0, text: "sont" },
    { start: 22.0, end: 23.1, text: "dans le bus." },
    { start: 23.1, end: 23.4, text: "Ils se" },
    { start: 23.4, end: 24.5, text: "présentent." },
    { start: 24.5, end: 25.6, text: "Sophia et Alison" },
    { start: 25.6, end: 26.6, text: "sont Suisses" },
    { start: 27.2, end: 28.4, text: "Boris est Russe." },
    { start: 28.9, end: 29.6, text: "Paul et Thomas" },
    { start: 29.6, end: 30.4, text: "sont Anglais" },
    { start: 30.4, end: 31.3, text: "et Annabelle" },
    { start: 31.3, end: 32.0, text: "est Allemande." },
  

  ];
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
          top: "7.5%",
          left: "51%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 15 })}
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
          top: "23.5%",
          left: "33%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 16 })}
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
          top: "67.1%",
          left: "24%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 17 })}
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
          top: "23.1%",
          left: "70%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 18 })}
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
          top: "6%", // عدّل حسب مكان الزر
          left: "2%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px",
          height: "50px",
        }}
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={page5_CD2} captions={captionsExample} />
          )
        }
      ></div>
      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{
          position: "absolute",
          top: "62%", // عدّل حسب مكان الزر
          left: "2%", // عدّل حسب مكان الزر
          cursor: "pointer",
          width: "50px",
          height: "50px",
       
        }}
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={page5_CD3} captions={captionsExample} />
          )
        }
      ></div>
    </div>
  );
};

export default Page10;
