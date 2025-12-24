export default function BottomBar({
  pageIndex,
  totalPages,
  goToIndex,
  zoomIn,
  zoomOut,
  resetZoom,
  toggleFullScreen,
  goToPage,
  isMobile,
  viewMode,
  setViewMode,
  icons,
  activeTab,
}) {
  return (
    <footer
      className="w-full bg-white border-t shadow 
  flex items-center justify-center gap-2 
  py-1 fixed bottom-0 left-0 z-[9999] h-[40px]"
    >
      {/* MENU */}
      <button onClick={icons.openSidebar} className="absolute left-3">
        <img
          src={icons.menu}
          className="h-1 w-1"
          style={{ height: "25px", width: "25px" }}
        />
      </button>

      {/* HOME */}
      {/* HOME */}
      {pageIndex > 1 && activeTab !== "flash" && activeTab !== "poster" && (
        <button onClick={goToIndex} className="absolute left-12">
          <img
            src={icons.home}
            className="h-1 w-1"
            style={{ height: "25px", width: "25px" }}
          />
        </button>
      )}

      {/* ZOOM IN */}
      <button onClick={zoomIn}>
        <img
          src={icons.zoomIn}
          className="h-1 w-1"
          style={{ height: "25px", width: "25px" }}
        />
      </button>

      {/* RESET ZOOM */}
      <button onClick={resetZoom}>
        <img
          src={icons.zoomOut}
          className="h-1 w-1"
          style={{ height: "25px", width: "25px" }}
        />
      </button>

      {/* FULLSCREEN */}
      <button onClick={toggleFullScreen}>
        <img
          src={icons.fullScreen}
          className="h-1 w-1"
          style={{ height: "25px", width: "25px" }}
        />
      </button>

      {/* PAGE INPUT */}
      <div  className="flex items-center gap-1 px-1 py-0.5 border-2 border-[#430f68] rounded text-sm">
        {activeTab === "work" || viewMode === "single" ? (
          <>
           
            <input
              type="text"
              onKeyDown={(e) =>
                e.key === "Enter" && goToPage(Number(e.target.value))
              }
              className="w-10 text-center outline-none text-[#430f68] text-sm"
                 placeholder={`${pageIndex + 1}`}
            />
            <span className="text-[#430f68] text-sm">| {totalPages}</span>
          </>
        ) : (
          <>
            <input
              type="text"
              onKeyDown={(e) =>
                e.key === "Enter" && goToPage(Number(e.target.value))
              }
              className="w-10 text-center outline-none text-[#430f68] text-sm"
              placeholder={`${pageIndex + 1}-${pageIndex + 2}`}
            />
            <span className="text-[#430f68] text-sm">| {totalPages}</span>
          </>
        )}
      </div>

      {/* VIEW MODES */}
      {!isMobile && (
        <>
          <button onClick={() => setViewMode("single")}>
            <img
              style={{ height: "25px", width: "25px" }}
              src={icons.onePage}
              className={`h-1 w-1 ${
                viewMode === "single" ? "opacity-100" : "opacity-40"
              }`}
            />
          </button>

          <button onClick={() => setViewMode("spread")}>
            <img
              style={{ height: "25px", width: "25px" }}
              src={icons.openBook}
              className={`h-1 w-1 ${
                viewMode === "spread"  ? "opacity-100" : "opacity-40"
              }`}
            />
          </button>
        </>
      )}

      {/* RIGHT SIDEBAR */}
<div
  className="right"
  style={{
    position: "fixed",
    right: "20px",     // أقصى اليمين
    bottom: "13px",    // ⬅️ هذا الذي يضعه في الأسفل
    display: "flex",
    alignItems: "center",
  }}
>


  <button
    onClick={icons.openRightSidebar}
    style={{
      padding: 0,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",

    }}
  >  <span style={{ marginRight: "5px", fontSize: "16px" }}>
  Clé d'icône  </span>
    <icons.keyIcon size={20} color="#430f68" />
  </button>
</div>


    </footer>
  );
}
