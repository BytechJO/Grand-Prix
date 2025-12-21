
import WB_P1 from "../WorkBookPages/Unit1/WB_P1";
import WB_P2 from "../WorkBookPages/Unit1/WB_P2";
import WB_P3 from "../WorkBookPages/Unit1/WB_P3";
import WB_Unit1_Page4 from "../WorkBookPages/Unit1/WB_Unit1_Page4";
import WB_Unit1_Page5 from "../WorkBookPages/Unit1/WB_Unit1_Page5";
import WB_Unit1_Page6 from "../WorkBookPages/Unit1/WB_Unit1_Page6";
import WB_Unit1_Page7 from "../WorkBookPages/Unit1/WB_Unit1_Page7";
import WB_Unit1_Page8 from "../WorkBookPages/Unit1/WB_Unit1_Page8";
import WB_Unit1_Page9 from "../WorkBookPages/Unit1/WB_Unit1_Page9";
// import WB_Unit1_Page10 from "../WorkBookPages/Unit1/WB_Unit1_Page10";


export const workbookPages = (openPopup) => [

  <WB_P1/>,
  <WB_P2/>,
  <WB_P3/>,
  <WB_Unit1_Page4 openPopup={openPopup} />,
  <WB_Unit1_Page5 openPopup={openPopup} />,
  <WB_Unit1_Page6 openPopup={openPopup} />,
  <WB_Unit1_Page7 openPopup={openPopup} />,
  <WB_Unit1_Page8 openPopup={openPopup} />,
  <WB_Unit1_Page9 openPopup={openPopup} />,
  // <WB_Unit1_Page10 openPopup={openPopup} />,
  // <WB_Unit1_Page8 openPopup={openPopup} />,

 
];
