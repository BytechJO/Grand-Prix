import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page9_Q14.css";

import f2 from "../../../assets/WBU1/flags/F02.svg";
import f3 from "../../../assets/WBU1/flags/F03.svg";
import f4 from "../../../assets/WBU1/flags/F04.svg";
import f5 from "../../../assets/WBU1/flags/F05.svg";
import f6 from "../../../assets/WBU1/flags/F06.svg";
import f7 from "../../../assets/WBU1/flags/F07.svg";
import f8 from "../../../assets/WBU1/flags/F08.svg";
import f9 from "../../../assets/WBU1/flags/F09.svg";
import f10 from "../../../assets/WBU1/flags/F10.svg";
import f11 from "../../../assets/WBU1/flags/F11.svg";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; // عدّل المسار حسب مكانه

const NationalitiesPuzzle = () => {
  // ✅ الكلمات الصحيحة
  const words = [
    "americaine",
    "australien", 
    "indien",
    "chinoise",
    "francaise",
    "sudafricaine",
    "finlandais",
    "suedoise",
    "italien",
    "bresilienne"
  ];
  const [score, setScore] = useState(null);

  // ✅ إنشاء شبكة من الحروف الفارغة
  const createEmptyGrid = () => {
    return words.map(word => 
      Array.from({ length: word.length }, () => '')
    );
  };

  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentFocus, setCurrentFocus] = useState({ row: 0, col: 0 });

  // ✅ الصور لكل دولة - باستخدام الصور المستوردة
  const countryImages = [
 
    f2,  // ألمانيا  
    f3,  // إسبانيا
    f4,  // إيطاليا
    f5,  // البرتغال
    f6,  // إنجلترا
    f7,  // أمريكا
    f8,  // اليابان
    f9,
    f10,
    f11
   
  ];

  // ✅ معالجة إدخال الحرف
  const handleLetterInput = (rowIndex, cellIndex, value) => {
    // أخذ الحرف الأول فقط (الحرف الواحد)
    const letter = value.toUpperCase().charAt(0);
    
    const newGrid = [...grid];
    newGrid[rowIndex][cellIndex] = letter;
    setGrid(newGrid);

    // الانتقال التلقائي للخلية التالية
    if (letter && cellIndex < words[rowIndex].length - 1) {
      setCurrentFocus({ row: rowIndex, col: cellIndex + 1 });
    }
  };

  // ✅ التحكم بالسهمين
  const handleKeyDown = (e, rowIndex, cellIndex) => {
    if (e.key === "Backspace" && !grid[rowIndex][cellIndex] && cellIndex > 0) {
      // الانتقال للخلف عند الضغط على backspace في خلية فارغة
      setCurrentFocus({ row: rowIndex, col: cellIndex - 1 });
    } else if (e.key === "ArrowRight" && cellIndex < words[rowIndex].length - 1) {
      setCurrentFocus({ row: rowIndex, col: cellIndex + 1 });
    } else if (e.key === "ArrowLeft" && cellIndex > 0) {
      setCurrentFocus({ row: rowIndex, col: cellIndex - 1 });
    } else if (e.key === "ArrowDown" && rowIndex < words.length - 1) {
      setCurrentFocus({ row: rowIndex + 1, col: Math.min(cellIndex, words[rowIndex + 1].length - 1) });
    } else if (e.key === "ArrowUp" && rowIndex > 0) {
      setCurrentFocus({ row: rowIndex - 1, col: Math.min(cellIndex, words[rowIndex - 1].length - 1) });
    }
  };

  // ✅ التحقق من الإجابة
  const checkAnswer = () => {
    // التحقق من تعبئة جميع الخلايا
    const isComplete = grid.every((row, rowIndex) => 
      row.every((cell, cellIndex) => cell !== '')
    );

    if (!isComplete) {
      ValidationAlert.info("Attention!", "Veuillez remplir toutes les cases.");
      return;
    }

    // حساب الحروف الصحيحة
    let correctCount = 0;
    let totalLetters = 0;

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        totalLetters++;
        if (cell === words[rowIndex].charAt(cellIndex)) {
          correctCount++;
        }
      });
    });

    const percentage = (correctCount / totalLetters) * 100;
    const correctWords = grid.reduce((count, row, rowIndex) => {
      const word = row.join('');
      return word === words[rowIndex] ? count + 1 : count;
    }, 0);

    let color, title;
    if (percentage === 100) {
      color = "green";
      title = "Excellent! 🎉";
    } else if (percentage >= 70) {
      color = "orange";
      title = "Pas mal! 👍";
    } else {
      color = "red";
      title = "À revoir! 📚";
    }

    const msg = `
      <div style="text-align:center; padding:20px;">
        <h3 style="color:${color}; margin-bottom:15px;">${title}</h3>
        <div style="font-size:24px; font-weight:bold; color:${color}; margin-bottom:10px;">
          ${correctWords} / ${words.length} mots corrects
        </div>
        <div style="font-size:18px; color:#333; margin-bottom:10px;">
          ${correctCount} / ${totalLetters} lettres correctes
        </div>
        <div style="font-size:16px; color:#666;">
          Score: ${Math.round(percentage)}%
        </div>
      </div>
    `;

    if (percentage === 100) ValidationAlert.success(msg);
    else if (percentage >= 70) ValidationAlert.warning(msg);
    else ValidationAlert.error(msg);
  };

  // ✅ إظهار الإجابة
  const showAnswerFunc = () => {
    const newGrid = words.map(word => 
      word.split('')
    );
    setGrid(newGrid);
  };

  // ✅ إعادة التعيين
  const resetExercise = () => {
    setGrid(createEmptyGrid());
    setCurrentFocus({ row: 0, col: 0 });
  };

  // ✅ تلميح: أول حرف من كل كلمة
  const giveHint = () => {
    const newGrid = [...grid];
    words.forEach((word, rowIndex) => {
      if (!newGrid[rowIndex][0]) {
        newGrid[rowIndex][0] = word.charAt(0);
      }
    });
    setGrid(newGrid);
  };

  return (

      
        <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">14</span>

Trouve les nationalités et complète la grille.

      </header>
 
     

        {/* اللعبة الرئيسية */}
        <div className="puzzle-container">
          {words.map((word, rowIndex) => (
            <div key={rowIndex} className="puzzle-row">
              {/* العلم/الصورة */}
              <div className="country-flag">
                <div className="flag-icon">
                  <img 
                    src={countryImages[rowIndex]} 
                    alt={`Flag ${rowIndex + 1}`} 
                    className="flag-img"
                  />
                </div>
                <div className="flag-number">{rowIndex + 1}.</div>
              </div>

              {/* الخلايا للحروف */}
              <div className="letters-container">
                {Array.from({ length: word.length }).map((_, cellIndex) => (
                  <input
                    key={cellIndex}
                    type="text"
                    value={grid[rowIndex][cellIndex]}
                    onChange={(e) => handleLetterInput(rowIndex, cellIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, cellIndex)}
                    onFocus={() => setCurrentFocus({ row: rowIndex, col: cellIndex })}
                    maxLength="1"
                    className={`letter-cell ${
                      currentFocus.row === rowIndex && currentFocus.col === cellIndex ? 'focused' : ''
                    } ${
                      grid[rowIndex][cellIndex] && 
                      grid[rowIndex][cellIndex] === word.charAt(cellIndex) 
                        ? 'correct' 
                        : grid[rowIndex][cellIndex] 
                        ? 'incorrect' 
                        : ''
                    }`}
                    autoFocus={currentFocus.row === rowIndex && currentFocus.col === cellIndex}
                  />
                ))}
              </div>

              {/* مساعدة: عدد الحروف */}
              <div className="word-length">
                <span className="length-badge">{word.length} lettres</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="spaces"></div>
      {score && <ScoreCardEnhanced score={score} />}

        {/* أزرار التحكم */}
    <div className="action-buttons-container">
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

export default NationalitiesPuzzle;