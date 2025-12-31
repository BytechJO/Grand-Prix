import React, { useState} from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; 
import img1 from "../../../assets/unite2pages/svg/P28Q41.svg"
import img2 from "../../../assets/unite2pages/svg/P28Q42.svg"
import "./Page28_Q4.css"
/* 🔴 الإجابات الصحيحة */
const correctAnswers = {
  0: "Comment ça va",
  1: "Ça va bien",
  2: "l’école",
  3: "as-tu",
  4: "crayons de couleur",
  5: "un cahier.",
  6: "un stylo",
  7: "compaset d’une trousse"
};

const Page5_Q1_CleanAudio = () => {
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);

  const handleInputChange = (index, value) => {
    setInputs({
      ...inputs,
      [index]: value
    });
  };

  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach(key => {
      const userAnswer = inputs[key] ? inputs[key].toLowerCase().trim() : "";
      const correctAnswer = correctAnswers[key].toLowerCase().trim();
      
      const isCorrect = userAnswer === correctAnswer || 
                       userAnswer.includes(correctAnswer) || 
                       correctAnswer.includes(userAnswer);
      
      if (isCorrect) correctCount++;
    });

    const total = Object.keys(correctAnswers).length;
    setScore({ correct: correctCount, total });

    if (correctCount === total) {
      ValidationAlert.success(
        `Excellent! (${correctCount}/${total})`,
        "Toutes les réponses sont correctes!"
      );
    } else if (correctCount === 0) {
      ValidationAlert.error(
        `Toutes les réponses sont incorrectes (${correctCount}/${total})`,
        "Essayez encore!"
      );
    } else {
      ValidationAlert.error(
        `Vous avez ${correctCount} sur ${total} corrects.`,
        "Presque!"
      );
    }
  };

  const showAnswerFunc = () => setInputs(correctAnswers);

  const resetExercise = () => {
    setInputs({});
    setScore(null);
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">
      {/* Header */}
      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{
          marginLeft: "42%",
          color: "black",
          marginTop: "5%",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        <span className="ex-A" style={{ backgroundColor: "#df4f89" }}>A</span>
        <span className="number-of-q">4</span>{" "}
        Écoute et écris l'information manquante.
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise Container */}
<div className="page28q4-exercise-container w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          
        {/* الحوار على اليسار */}
        <div className="page28q4-dialogue-section lg:w-2/3">
    <div className="page28q4-dialogue-exercise w-full bg-white p-8 rounded-xl">
      <div className="page28q4-dialogue-text space-y-6">
              
              {/* Ligne 1 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">Salut, ma chérie. </span>
                <input
                  type="text"
                  value={inputs[0] || ""}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-48"
                />
                <span className="text"> ?</span>
              </div>

              {/* Ligne 2 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">Bonjour, maman. Ça va </span>
                <input
                  type="text"
                  value={inputs[1] || ""}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-32"
                />
                <span className="text"> ?</span>
              </div>

              {/* Ligne 3 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">Tu es prête pour </span>
                <input
                  type="text"
                  value={inputs[2] || ""}
                  onChange={(e) => handleInputChange(2, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-40"
                />
                <span className="text"> ?</span>
              </div>

              {/* Ligne 4 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">Oui, mais j'ai besoin de quelques fournitures scolaires.</span>
              </div>

              {/* Ligne 5 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">Bon. Allons au magasin.</span>
              </div>

              {/* Ligne 6 - Note */}
              <div className="note italic text-gray-500 text-sm ml-20">
                (au magasin)
              </div>

              {/* Ligne 7 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">Alors, de quoi </span>
                <input
                  type="text"
                  value={inputs[3] || ""}
                  onChange={(e) => handleInputChange(3, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-24"
                />
                <span className="text"> besoin ?</span>
              </div>

              {/* Ligne 8 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">J'ai besoin de </span>
                <input
                  type="text"
                  value={inputs[4] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
                />
                <span className="text">.</span>
              </div>

              {/* Ligne 9 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">Et ?</span>
              </div>

              {/* Ligne 10 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">J'ai besoin d'</span>
                <input
                  type="text"
                  value={inputs[5] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-40"
                />
                <span className="text">.</span>
              </div>

              {/* Ligne 11 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">As-tu besoin d'un stylo ?</span>
              </div>

              {/* Ligne 12 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">Non, j'ai déjà </span>
                <input
                  type="text"
                  value={inputs[6] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
                />
                
              <span className="text">Mais j’ai </span>
              </div>
                <div className="dialogue-line flex items-start">
               
                <span className="text">besoin d’un</span>
                  <input
                  type="text"
                  value={inputs[7] || ""}
                  onChange={(e) => handleInputChange(6, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
                />
              </div>
              {/* Ligne 13 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">Mère :</span>
                <span className="text">C'est tout ?</span>
              </div>

              {/* Ligne 14 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">Marie :</span>
                <span className="text">Oui, c'est tout ce dont j'ai besoin pour le moment.</span>
              </div>

            </div>
          </div>
        </div>

        {/* الصور على اليمين */}
       <div className="page28q4-images-section lg:w-1/3 flex flex-col gap-6">
    <div className="page28q4-image-container bg-white p-4 rounded-xl">
      <img 
        src={img1} 
        alt="Dialogue illustration 1" 
        className="page28q4-image w-full h-auto max-h-[280px] object-contain"
      />
    </div>
    <div className="page28q4-image-container bg-white p-4 rounded-xl">
      <img 
        src={img2} 
        alt="Dialogue illustration 2" 
        className="page28q4-image w-full h-auto max-h-[280px] object-contain"
      />
    </div>
  </div>

      </div>
<div className="spaces"></div>
      {/* Buttons */}
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