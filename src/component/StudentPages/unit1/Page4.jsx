import React from "react";
import page4 from "../../../assets/unit1/imgs/Pages/4.png";

const Page4 = ({ handleClickArea }) => {
  const areas = [
    { x1: 45, y1: 44.3, x2: 49, y2: 47.8 },
    { x1: 49.2, y1: 37.3, x2: 74.4, y2: 79.8 },
    { x1: 86.6, y1: 24.2, x2: 90.4, y2: 27.2 },
    { x1: 83.7, y1: 28.4, x2: 97.4, y2: 48.9 },
    { x1: 75, y1: 27.3, x2: 79.5, y2: 30.5 },
    { x1: 77.9, y1: 21.8, x2: 81.7, y2: 43.8 },
  ];

  const handleAreaClick = (index) => {
    if (handleClickArea) handleClickArea(index);
    console.log("Clicked area index:", index);
  };

  return (
    <div className="page_4-background" style={{ position: "relative" }}>
      <img src={page4} alt="Page 4" style={{ display: "block", width: "100%" }} />

      {areas.map((area, index) => (
        <div
          key={index}
          className="clickable-area"
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
            cursor: "pointer",
            // border: "1px dashed red", // للتطوير فقط
          }}
          onClick={() => handleAreaClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default Page4;
