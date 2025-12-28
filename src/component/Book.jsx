import { useState, useEffect, useRef } from "react";

// === LAYOUT ===
import TopNavbar from "./Book/Navbar/TopNavbar";
import BottomBar from "./Book/Navbar/BottomBar";
import LeftSidebar from "./Book/Sidebars/LeftSidebar";
import RightSidebar from "./Book/Sidebars/RightSidebar";

// === POPUP ===
import Popup from "./Popup/Popup";
import LessonNavigator from "./StudentPages/LessonNavigator";
import workbookCover from "../assets/workpages/Page1.png";
import stbookCover from "../assets/unit1/imgs/Pages/1.png";
import  teacherPDF  from "../assets/Grand Prix A1 TB2.pdf"
// === ASSETS ===
import logo from "../assets/unit1/imgs/Page 01/PMAAlogo.svg";
import menu from "../assets/unit1/imgs/Page 01/menu.svg";
import next from "../assets/unit1/imgs/Page 01/next btn.svg";
import back from "../assets/unit1/imgs/Page 01/back btn.svg";
import home from "../assets/unit1/imgs/Page 01/home.svg";
import fullScreen from "../assets/unit1/imgs/Page 01/fullscreen.svg";
import zoomIn from "../assets/unit1/imgs/Page 01/zoom in.svg";
import zoomOut from "../assets/unit1/imgs/Page 01/zoom out.svg";
import onePage from "../assets/unit1/imgs/Page 01/one page.svg";
import openBook from "../assets/unit1/imgs/Page 01/open-book.svg";
import { FaKey } from "react-icons/fa";
import audioBtn from "../assets/unit1/imgs/Page 01/audiobtn.svg";
import arrowBtn from "../assets/unit1/imgs/Page 01/Arrow.svg";


// === PAGES DATA ===
import { studentPages, workbookPages, teacherPages } from "./BookData";

import WorkBookNavigator from "./WorkBookPages/WorkBookNavigator";

export default function Book() {
  // STATE
  const [pageIndex, setPageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "student"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState("spread");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [leftBarOpen, setLeftBarOpen] = useState(false);
  const [rightBarOpen, setRightBarOpen] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);

  // POPUP
  function openPopup(type, data) {
    setPopupContent({ type, data, tab: activeTab });
    setPopupOpen(true);
  }
  function closePopup() {
    setPopupOpen(false);
  }

  // SAFE PAGE LIST
  const pages =
    {
      student: studentPages(openPopup, goToUnit),
      work: workbookPages(openPopup, goToUnit),
      teacher: teacherPages,
    }[activeTab] || [];

  // RESIZE
  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth <= 1200;
      setIsMobile(mobile);
      setViewMode(mobile ? "single" : "spread");
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
   
    setOffset({ x: 0, y: 0 });
    setZoom(1);

    localStorage.setItem("activeTab", activeTab);
    localStorage.setItem("pageIndex", pageIndex);

    setViewMode(isMobile ? "single" : "spread");
  }, [activeTab, isMobile]);

  // PAGE NAVIGATION
  function goToUnit(index) {
    if (!pages.length || isNaN(index) || index < 1 || index > pages.length) {
      setPageIndex(0);
      return;
    }
    setPageIndex(index - 1);
  }

  const goToPage = (pageNumber) => {
    const num = Number(pageNumber);

    if (!pages.length || isNaN(num) || num < 1 || num > pages.length) {
      setPageIndex(0);
      return;
    }

    // if (activeTab === "work" && !isMobile && viewMode === "spread") {
    //   if (num === 1) return setPageIndex(0);
    //   if (num === 2) return setPageIndex(1);

    //   let leftPage = num % 2 === 0 ? num - 1 : num;
    //   let targetIndex = Math.max(leftPage - 1, 2);
    //   return setPageIndex(targetIndex);
    // }

    if (isMobile || viewMode === "single") return setPageIndex(num - 1);
    if (num === 1) return setPageIndex(0);
    if (num % 2 === 1) return setPageIndex(num - 2);

    setPageIndex(num - 1);
  };

  const nextPage = () => {
    if (!pages.length) return;

    // if (activeTab === "work" && !isMobile && viewMode === "spread") {
    //   if (pageIndex === 0) return setPageIndex(1);
    //   if (pageIndex === 1) return setPageIndex(2);
    //   if (pageIndex + 2 < pages.length) return setPageIndex(pageIndex + 2);
    //   return;
    // }

    if (isMobile || viewMode === "single") {
      if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
      return;
    }

    if (pageIndex === 0) return setPageIndex(1);
    if (pageIndex < pages.length - 2) setPageIndex(pageIndex + 2);
  };

  const prevPage = () => {
    if (isMobile || viewMode === "single") {
      if (pageIndex > 0) setPageIndex(pageIndex - 1);
      return;
    }

    if (pageIndex === 1) return setPageIndex(0);
    if (pageIndex > 1) setPageIndex(pageIndex - 2);
  };

  function goHome() {
    setPageIndex(0);
  }

  // FULLSCREEN
  function toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }

  // ZOOM + DRAG
  const start = useRef({ x: 0, y: 0 });

  function resetZoom() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function handleMouseDown(e) {
    if (zoom === 1) return;
    setIsDragging(true);
    start.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  // UNITS
  const studentUnits = [
    { id: 1, label: "Unité 1 Se présenter", start: 4, pages: 22 },
    { id: 2, label: "Unité 2 Se présenter", start: 27, pages: 25 },
    // { id: 3, label: "Student Unit 3", start: 22, pages: 9 },
    // { id: 4, label: "Student Unit 4", start: 30, pages: 10 },
    // { id: 5, label: "Student Unit 5", start: 40, pages: 10 },
    // { id: 6, label: "Student Unit 6", start: 50, pages: 10 },
  ];

  const workbookUnits = [
    { id: 1, label: "Unité 1 Se présenter", start: 4, pages: 9 },
  ];

  const teacherUnits = [{ id: 1, label: "pages", start: 1, pages: 194 }];

  const sidebarUnits =
    {
      student: studentUnits,
      work: workbookUnits,
      teacher: teacherUnits,
    }[activeTab] || [];

  // RENDER PAGE
  function renderPage(content) {
    if (typeof content === "string") {
      return <img src={content} className="w-full h-full object-contain" />;
    }
    return content;
  }

  // UI
  const tabs = [
    { id: "student", label: "MÉTHODE DE FRANÇAIS" },
    { id: "work", label: "LIVRE DE GRAMMAIRE" },
    { id: "teacher", label: "GUIDE PÉDAGOGIQUE" },
  ];
  const studentBookInfo = {
  cover: stbookCover,
  title: "Méthode de Français",
  pages: studentPages().length,
};

const workbookBookInfo = {
  cover: workbookCover,
  title: "Livre de Grammaire",
  pages: workbookPages().length,
};

const teacherBookInfo = {
  cover: stbookCover,
  title: "GUIDE PÉDAGOGIQUE",
  pages: teacherPages.length,
};

const bookInfoSelector = {
  student: studentBookInfo,
  work: workbookBookInfo,
  teacher: teacherBookInfo,
};


  // RENDER
  return (
    <>
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logo={logo}
        menuIcon={menu}
        tabs={tabs}
        mobileTabsOpen={mobileTabsOpen}
        setMobileTabsOpen={setMobileTabsOpen}
        isMobile={isMobile}
      />

      <div
        className="content-wrapper overflow-auto lg:overflow-hidden w-full h-[86vh] flex items-center justify-center relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* PREV BUTTON */}
        {pageIndex > 0 && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 90 90"
            onClick={prevPage}
            className="nav-btn absolute left-10 w-14 h-14 rounded-full flex items-center justify-center z-[9999]"
          >
            <image href={back} x="0" y="0" width="90" height="90" />
          </svg>
        )}

        {/* NEXT BUTTON */}
        {pageIndex < pages.length - 1 && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 90 90"
            onClick={nextPage}
            className="nav-btn absolute right-10 w-14 h-14 rounded-full flex items-center justify-center z-[99999]"
          >
            <image href={next} x="0" y="0" width="90" height="90" />
          </svg>
        )}

        {/* SINGLE OR SPREAD VIEW */}
        {isMobile || viewMode === "single" || pageIndex === 0 ? (
          <div
            className="bg-white rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden self-end"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
            }}
          >
            {renderPage(pages[pageIndex])}
          </div>
        ) : (
          <div
            className="bg-white rounded-2xl shadow-2xl border grid grid-cols-2 overflow-hidden self-end"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
            }}
          >
            <div className="flex items-center justify-center border-r">
              {renderPage(pages[pageIndex])}
            </div>
            <div className="flex items-center justify-center border-l">
              {renderPage(pages[pageIndex + 1])}
            </div>
          </div>
        )}
      </div>

     
      <BottomBar
        pageIndex={pageIndex}
        totalPages={pages.length}
        goToIndex={goHome}
        zoomIn={() => setZoom((z) => z + 0.2)}
        zoomOut={() => setZoom((z) => z - 0.2)}
        resetZoom={resetZoom}
        toggleFullScreen={toggleFullScreen}
        goToPage={goToPage}
        isMobile={isMobile}
        viewMode={viewMode}
        activeTab={activeTab}
        setViewMode={setViewMode}
        icons={{
          menu,
          home,
          zoomIn,
          zoomOut,
          fullScreen,
          onePage,
          openBook,
          openSidebar: () => setLeftBarOpen(true),
          openRightSidebar: () => setRightBarOpen(true),
          keyIcon: FaKey,
        }}
        teacherPdf={teacherPDF}
      />

      {/* LEFT SIDEBAR */}
   <LeftSidebar
  isOpen={leftBarOpen}
  close={() => setLeftBarOpen(false)}
  units={sidebarUnits}
  goToPage={goToPage}
  book={bookInfoSelector[activeTab]}
 />


      {/* RIGHT SIDEBAR */}
      <RightSidebar
        isOpen={rightBarOpen}
        close={() => setRightBarOpen(false)}
        menu={[
          { key: "logo", label: "logo", icon: logo },
          { key: "audio", label: "Bouton Lire le son", icon: audioBtn },
          { key: "arrow", label: "Bouton fléché", icon: arrowBtn },
          { key: "prev", label: "Bouton Précédent", icon: back },
          { key: "next", label: "Bouton Suivant", icon: next },
          { key: "zoomIn", label: "zoomer", icon: zoomIn },
          { key: "zoomout", label: "dézoomer", icon: zoomOut },
          { key: "menu", label: "Ouvrir le menu", icon: menu },
          { key: "home", label: "rentrer à la maison", icon: home },
          { key: "fullScreen", label: "Plein écran", icon: fullScreen },
          { key: "onePage", label: "vue d'une page", icon: onePage },
          { key: "openBook", label: "vue sur deux pages", icon: openBook },
        ]}
      />

      {/* MOBILE TABS */}
      {mobileTabsOpen && (
        <div className="lg:hidden bg-white shadow-md border-b px-4 py-3 absolute w-full z-[9999]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileTabsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg mb-1 
                ${
                  activeTab === tab.id
                    ? "bg-[#f6f0ff] text-[#430f68]"
                    : "text-[#430f68] hover:bg-purple-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* POPUP */}
      <Popup isOpen={popupOpen} onClose={closePopup} type={popupContent?.type}>
        {popupContent?.tab === "work" && popupContent?.type === "exercise" && (
          <WorkBookNavigator
            startIndex={popupContent.data.startIndex}
            mode="workbook"
          />
        )}

        {popupContent?.tab !== "work" && popupContent?.type === "exercise" && (
          <LessonNavigator startIndex={popupContent.data.startIndex} />
        )}

        {popupContent?.type !== "exercise" && popupContent?.data}
      </Popup>
    </>
  );
}
