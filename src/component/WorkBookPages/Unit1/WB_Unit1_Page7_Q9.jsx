import React, { useRef, useState, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page5_Q2.css";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const MatchingWithCanvas = () => {
  const leftItems = [
    "A- J’.",
    "B- Léa",
    "C- Mon frère",
    "D- Mes amis",
    "E- Vous",
    "F- Ma sœur et toi"
  ];
  const [score, setScore] = useState(null);

  const rightItems = [
    "1- avez dix ans ?",
    "2- a vingt ans.",
    "3- a deux ans.",
    "4- avons le même âge.",
    "5- ai dix-huit ans.",
    "6- avez quatorze ans.",
    "7- ont seize ans."
  ];

  // ✔ الإجابات الصحيحة (A إلى F توصل إلى الأرقام الصحيحة)
  const correctAnswers = {
    A: "5",
    B: "2",
    C: "3",
    D: "7",
    E: "1",
    F: "6"
  };

  const canvasRef = useRef(null);
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  const [connections, setConnections] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [checkedConnections, setCheckedConnections] = useState(null);

  useEffect(() => {
    drawLines();
  }, [connections, currentLine, checkedConnections]);

  const getCanvasPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (side, index) => () => {
    const element =
      side === "left"
        ? leftRefs.current[index]
        : rightRefs.current[index];

    const rect = element.getBoundingClientRect();
    const canvasRect = canvasRef.current.getBoundingClientRect();

    const x =
      side === "left"
        ? rect.right - canvasRect.left
        : rect.left - canvasRect.left;

    const y = rect.top + rect.height / 2 - canvasRect.top;

    setCurrentLine({
      side,
      index,
      x1: x,
      y1: y,
      x2: x,
      y2: y
    });
  };

  const handleMouseMove = (e) => {
    if (!currentLine) return;
    const pos = getCanvasPos(e);
    setCurrentLine((prev) => ({
      ...prev,
      x2: pos.x,
      y2: pos.y
    }));
  };

  const handleMouseUp = (side, index) => () => {
    if (!currentLine) return;

    let fromIndex, toIndex;

    if (currentLine.side === "left" && side === "right") {
      fromIndex = currentLine.index;
      toIndex = index;
    } else if (currentLine.side === "right" && side === "left") {
      fromIndex = index;
      toIndex = currentLine.index;
    } else {
      setCurrentLine(null);
      return;
    }

    setConnections((prev) => {
      const filtered = prev.filter(
        (c) => c.fromIndex !== fromIndex && c.toIndex !== toIndex
      );
      return [...filtered, { fromIndex, toIndex }];
    });

    setCurrentLine(null);
    setCheckedConnections(null);
  };

  const drawLines = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRect = canvasRef.current.getBoundingClientRect();

    connections.forEach(({ fromIndex, toIndex }) => {
      const leftRect = leftRefs.current[fromIndex].getBoundingClientRect();
      const rightRect = rightRefs.current[toIndex].getBoundingClientRect();

      const x1 = leftRect.right - canvasRect.left;
      const y1 = leftRect.top + leftRect.height / 2 - canvasRect.top;

      const x2 = rightRect.left - canvasRect.left;
      const y2 = rightRect.top + rightRect.height / 2 - canvasRect.top;

      let strokeColor = "orange";

      if (checkedConnections) {
        const result = checkedConnections.find(
          (r) => r.fromIndex === fromIndex && r.toIndex === toIndex
        );
        if (result) strokeColor = result.isCorrect ? "green" : "red";
      }

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.stroke();
    });

    if (currentLine) {
      ctx.beginPath();
      ctx.moveTo(currentLine.x1, currentLine.y1);
      ctx.lineTo(currentLine.x2, currentLine.y2);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  };

// ✅ RESET
const resetExercise = () => {
  setConnections([]);
  setCurrentLine(null);
  setCheckedConnections(null);
  setScore(null); // إعادة تعيين ScoreCard
};

// ✅ SHOW ANSWER
const showAnswerFunc = () => {
  const newConnections = Object.keys(correctAnswers).map((key) => ({
    fromIndex: leftItems.findIndex((item) => item.startsWith(key)),
    toIndex: rightItems.findIndex(
      (item) => item.startsWith(correctAnswers[key])
    )
  }));
  setConnections(newConnections);

  const total = Object.keys(correctAnswers).length;
  const correctCount = total;

  setCheckedConnections(
    newConnections.map(c => ({ ...c, isCorrect: true }))
  );

  // تحديث ScoreCard
  setScore({ correct: correctCount, total });

  ValidationAlert.success(
    "Answers shown",
    "All correct connections have been placed.",
    `${correctCount}/${total}`
  );
};

// ✅ CHECK ANSWER
const checkAnswer = () => {
  const results = connections.map(({ fromIndex, toIndex }) => {
    const leftKey = leftItems[fromIndex][0];
    const rightKey = rightItems[toIndex][0];
    const isCorrect = correctAnswers[leftKey] === rightKey;
    return { fromIndex, toIndex, isCorrect };
  });

  setCheckedConnections(results);

  const correctCount = results.filter(r => r.isCorrect).length;
  const total = Object.keys(correctAnswers).length;

  // تحديث ScoreCard
  setScore({ correct: correctCount, total });


    if (correctCount === total) {
      ValidationAlert.success(
        "Excellent!",
        "You got all answers right!",
        `${correctCount}/${total}`
      );
    } else if (correctCount === 0) {
      ValidationAlert.info(
        "Try Again!",
        "All answers are incorrect.",
        `${correctCount}/${total}`
      );
    } else {
      ValidationAlert.error(
        "Almost there!",
        `You got ${correctCount} out of ${total} correct.`,
        `${correctCount}/${total}`
      );
    }
};

  return (

    <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">9</span>
Associe les sujets aux phrases correspondantes.

      </header>

      <div className="matching-columns" style={{ display: "flex", gap: "300px" }}>
        <div className="left-column" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {leftItems.map((item, i) => (
            <div
              key={item}
              ref={(el) => (leftRefs.current[i] = el)}
              onMouseDown={handleMouseDown("left", i)}
              className={`item-box ${
                checkedConnections?.some(
                  (c) => c.fromIndex === i && !c.isCorrect
                )
                  ? "wrong-box"
                  : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        />

        <div className="right-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {rightItems.map((item, i) => (
            <div
              key={item}
              ref={(el) => (rightRefs.current[i] = el)}
              onMouseUp={handleMouseUp("right", i)}
              className={`item-box ${
                checkedConnections?.some(
                  (c) => c.toIndex === i && !c.isCorrect
                )
                  ? "wrong-box"
                  : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {score && <ScoreCardEnhanced score={score} />}
      <div className="spaces"></div>

      <div className="action-buttons-container" style={{ marginTop: "30px" }}>
        <button onClick={resetExercise} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={showAnswerFunc} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswer} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>

  );
};

export default MatchingWithCanvas;
