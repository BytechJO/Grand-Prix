import React from "react";
import page_11 from "../../../assets/unit1/imgs/Pages/15.png";
import page5_CD2 from "../../../assets/unit1/SoundU1/U1S1Q1.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Q1 from "./Page5_Q1"
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";


const Page10 = ({ openPopup }) => {

  return (
    <div className="page_5-background" style={{ position: "relative" }}>
      {/* الخلفية */}
      <img src={page_11} alt="Page 5" style={{ display: "block", width: "100%" }} />

      {/* زر الصوت الأول */}  <div
                  className="Click -icon-CD-page5 hover:scale-110 transition"
                    style={{ overflow: "visible" , position:"absolute",top:"56%",left:"38.5%"  }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 90 90"
                      onClick={() => openPopup("exercise", { startIndex: 12 })}
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
