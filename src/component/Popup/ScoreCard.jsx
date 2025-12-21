import React, { useEffect, useState, useRef } from "react";
import "./ScoreCard.css";

const ScoreCardEnhanced = ({ score }) => {
  const cardRef = useRef(null);
  const dropIconRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDropIcon, setShowDropIcon] = useState(false);

  /* ======================
     تحريك العداد
  ====================== */
  useEffect(() => {
    if (score) {
      setIsVisible(true);
      let start = 0;
      const end = score.correct;
      const duration = 1000;
      const incrementTime = 20;
      const step = Math.ceil((end - start) / (duration / incrementTime));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAnimatedScore(start);
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setIsVisible(false);
    }
  }, [score]);

  /* ======================
     Pointer Drag (Desktop + Mobile)
  ====================== */
  const handlePointerDown = (e) => {
    setDragging(true);
    setShowDropIcon(true);

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    cardRef.current.setPointerCapture(e.pointerId);
    cardRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;

    setDragging(false);
    setShowDropIcon(false);
    cardRef.current.style.cursor = "grab";

    const cardRect = cardRef.current.getBoundingClientRect();
    const dropRect = dropIconRef.current?.getBoundingClientRect();

    if (
      dropRect &&
      cardRect.bottom > dropRect.top &&
      cardRect.left < dropRect.right &&
      cardRect.right > dropRect.left
    ) {
      setIsMinimized(true);
    }

    cardRef.current.releasePointerCapture(e.pointerId);
  };

  if (!score || !isVisible) return null;

  const { correct, total } = score;
  const percentage = Math.round((correct / total) * 100);

  let colorTheme = "good";
  let cardGradient = "linear-gradient(135deg, #430f68, #6a1fb3)";
  let progressGradient = "linear-gradient(135deg, #430f68, #6a1fb3)";

  if (percentage >= 90) {
    colorTheme = "excellent";
    cardGradient = "linear-gradient(135deg, #1d976c, #93f9b9)";
    progressGradient = "linear-gradient(to right, #1d976c, #93f9b9)";
  } else if (percentage >= 70) {
    colorTheme = "very-good";
    cardGradient = "linear-gradient(135deg, #4facfe, #00f2fe)";
    progressGradient = "linear-gradient(to right, #4facfe, #00f2fe)";
  } else if (percentage >= 50) {
    colorTheme = "good";
    cardGradient = "linear-gradient(135deg, #36d1dc, #5b86e5)";
    progressGradient = "linear-gradient(to right, #36d1dc, #5b86e5)";
  } else if (percentage >= 30) {
    colorTheme = "average";
    cardGradient = "linear-gradient(135deg, #f7971e, #ffd200)";
    progressGradient = "linear-gradient(to right, #f7971e, #ffd200)";
  } else if (percentage > 0) {
    colorTheme = "poor";
    cardGradient = "linear-gradient(135deg, #ff5e62, #ff9966)";
    progressGradient = "linear-gradient(to right, #ff5e62, #ff9966)";
  } else {
    colorTheme = "very-poor";
    cardGradient = "linear-gradient(135deg, #ff416c, #ff4b2b)";
    progressGradient = "linear-gradient(to right, #ff416c, #ff4b2b)";
  }

  let message = "";
  if (percentage >= 90) message = "excellent";
  else if (percentage >= 70) message = "très bien";
  else if (percentage >= 50) message = "Vous pouvez améliorer";
  else if (percentage >= 30) message = "Tu dois étudier";
  else if (percentage > 0) message = "faible";

  return (
    <>
      <div
        ref={cardRef}
        className="score-card-container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          left: pos.x,
          top: pos.y,
          position: "fixed",
          display: isMinimized ? "none" : "block",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <div
          className={`score-card-enhanced ${colorTheme}`}
          style={{ background: cardGradient }}
        >
          <div className="score-header">
            <div className="score-icon">
              {percentage >= 90
                ? "🏆"
                : percentage >= 70
                ? "⭐"
                : percentage >= 50
                ? "✅"
                : percentage >= 30
                ? "📝"
                : "⚠️"}
            </div>
            <h2 className="score-title">Résultat du test</h2>
            <div className="score-subtitle">
              Bravo ! Vous avez terminé le test.
            </div>
          </div>

          <div className="score-content">
            <div className="score-value-container">
              <div className="score-main-value">
                {animatedScore}
                <span className="score-total">/{total}</span>
              </div>
              <div className="score-percentage">{percentage}%</div>
            </div>

            <div className="score-progress">
              <div
                className="score-progress-bar"
                style={{
                  width: `${percentage}%`,
                  background: progressGradient,
                }}
              />
            </div>

            <div className="score-stats">
              <div className="stat-item correct-stat">
                <div className="stat-label">Les bonnes réponses</div>
                <div className="stat-value">{correct}</div>
              </div>
              <div className="stat-item incorrect-stat">
                <div className="stat-label">Réponses incorrectes</div>
                <div className="stat-value">{total - correct}</div>
              </div>
            </div>

            <div className="score-message">{message}</div>
          </div>

          <div className="score-footer">
            <div className="score-time"> le temps --:--</div>
            <button className="retry-button">Retester</button>
          </div>

          <div className="score-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
      </div>

      {showDropIcon && !isMinimized && (
        <div
          ref={dropIconRef}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#ff416c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            zIndex: 10000,
            pointerEvents: "none",
          }}
        >
          🗑️
        </div>
      )}

      {isMinimized && (
        <div
          onClick={() => setIsMinimized(false)}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#6a1fb3",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10000,
          }}
        >
          🏆
        </div>
      )}
    </>
  );
};

export default ScoreCardEnhanced;
