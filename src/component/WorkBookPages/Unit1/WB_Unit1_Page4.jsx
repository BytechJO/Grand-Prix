import React from 'react'
import page_1 from "../../../assets/workpages/4.png"
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
const WB_Unit1_Page1 = ({openPopup}) => {
  return (
    <div className='page_1-background' >
        
      <img
        src={page_1}

       
     
      />
 {/* زر التمرين 2 */}
      <div
        className="wb-unit1-p3-q2 hover:scale-110 transition"
      style={{ overflow: "visible" , position:"absolute",top:"15%",left:"35%"  }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 0})}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
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
  )
}

export default WB_Unit1_Page1
