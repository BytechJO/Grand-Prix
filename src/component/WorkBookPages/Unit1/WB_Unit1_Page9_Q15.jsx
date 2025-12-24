import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page9_Q15.css"
const Page5_Q1_CleanAudio = () => {
  // ✅ STATE FOR TABLE ROWS - جدول 6 صفوف فارغة
  const [rows, setRows] = useState(Array(6).fill({ masc: "", fem: "" }));

  // ✅ HANDLE INPUT CHANGE
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // ✅ CHECK ANSWER
  const checkAnswer = () => {
    const correctAnswers = [
      { masc: "canadien", fem: "américaine" },
      { masc: "australien", fem: "chinoise" },
      { masc: "indien", fem: "française" },
      { masc: "finlandais", fem: "sud-africaine" },
      { masc: "italien", fem: "suédoise" },
      { masc: "brésilien", fem: "brésilienne" }, // الصف السادس - المذكر موجود لكن الخانة معطلة
    ];

    let correctCount = 0;
    let total = 0;

    // ✅ التحقق من التعبئة
    const allFilled = rows.every((row, index) => {
      if (index === 5) {
        // الصف السادس: فقط العامود المؤنث (لأن المذكر معطل)
        return row.fem.trim() !== "";
      }
      return row.masc.trim() !== "" && row.fem.trim() !== "";
    });

    if (!allFilled) {
      ValidationAlert.info(
        "Attention!",
        "Veuillez remplir les champs requis."
      );
      return;
    }

    // ✅ مقارنة الإجابات
    rows.forEach((row, index) => {
      const correctRow = correctAnswers[index];
      if (!correctRow) return;

      // التحقق من المذكر (لا يدخل في الصف السادس)
      if (index !== 5 && row.masc.trim()) {
        total++;
        if (row.masc.trim().toLowerCase() === correctRow.masc.toLowerCase()) {
          correctCount++;
        }
      }

      // التحقق من المؤنث (جميع الصفوف)
      if (row.fem.trim()) {
        total++;
        if (row.fem.trim().toLowerCase() === correctRow.fem.toLowerCase()) {
          correctCount++;
        }
      }
    });

    const color =
      correctCount === total ? "green" :
      correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ✅ SHOW ANSWER
  const showAnswerFunc = () => {
    const answers = [
      { masc: "canadien", fem: "américaine" },
      { masc: "australien", fem: "chinoise" },
      { masc: "indien", fem: "française" },
      { masc: "finlandais", fem: "sud-africaine" },
      { masc: "italien", fem: "suédoise" },
      { masc: "brésilien", fem: "brésilienne" }, // القيمة موجودة لكن الخانة معطلة
    ];
    
    setRows(answers);
  };

  // ✅ RESET
  const resetExercise = () => {
    setRows(Array(6).fill({ masc: "", fem: "" }));
  };

  return (

   
           <div className="page-wrapper2 flex flex-col items-center justify-start gap-8 p-4">
  <header
className="header-title-page1 w-full text-left mb-4"
  style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span style={{backgroundColor:"#73C8D2"}} className="ex-A">A</span> <span style={{color:"black"}} className="number-of-q">15</span>

Complète le tableau en utilisant les adjectifs de nationalité de
l’exercice précédent.

      </header>
   

      {/* ✅ TABLE WITH 6 ROWS */}
   <div className="table-container">
  <table className="nationality-table">
    <thead>
      <tr className="table-header-row">
        <th className="table-header">MASCULIN</th>
        <th className="table-header">FÉMININ</th>
      </tr>
    </thead>

    <tbody>
      {rows.map((row, index) => (
        <tr key={index} className="table-row">
          
          {/* العمود الأول */}
          <td className={`table-cell ${index === 5 ? "disabled-cell" : ""}`}>
            <input
              type="text"
              value={row.masc}
              onChange={(e) =>
                handleInputChange(index, "masc", e.target.value)
              }
              disabled={index === 5}
              className={`table-input ${index === 5 ? "disabled-input" : ""}`}
            />
          </td>

          {/* العمود الثاني */}
          <td className="table-cell">
            <input
              type="text"
              value={row.fem}
              onChange={(e) =>
                handleInputChange(index, "fem", e.target.value)
              }
              className="table-input"
            />
          </td>

        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="spces"></div>
<div className="spces"></div>
      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
          Recommencer ↻
        </button>
        <button onClick={showAnswerFunc} className="show-answer-btn">
         Afficher la réponse
        </button>
        <button onClick={checkAnswer} className="check-button2">
         Vérifier la réponse✓
        </button>
      </div>
    </div>
     
  );
};

export default Page5_Q1_CleanAudio;