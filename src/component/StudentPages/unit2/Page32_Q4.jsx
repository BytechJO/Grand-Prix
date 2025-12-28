import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";
import img1 from "../../../assets/unite2pages/svg/page32Q4.svg";

/* 🔴 الإجابات الصحيحة */
const correctAnswers = {
  0: "m’appelle",
  1: "la fenêtre.",
  2: "Merci.",
  3: "Comment ça va ",
  4: "as besoin de",
 
};

const Page5_Q1_CleanAudio = () => {
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);

  const handleInputChange = (index, value) => {
    setInputs({
      ...inputs,
      [index]: value,
    });
  };

  const checkAnswer = () => {
    let correctCount = 0;
    Object.keys(correctAnswers).forEach((key) => {
      const userAnswer = inputs[key] ? inputs[key].toLowerCase().trim() : "";
      const correctAnswer = correctAnswers[key].toLowerCase().trim();

      const isCorrect =
        userAnswer === correctAnswer ||
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
        <span className="ex-A" style={{ backgroundColor: "#df4f89" }}>
          A
        </span>
        <span className="number-of-q">4</span> Écoute et écris l'information
        manquante.
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise Container */}
      <div className="exercise-container w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* الحوار على اليسار */}
        <div className="dialogue-section lg:w-2/3">
          <div className="dialogue-exercise w-full bg-white p-8 rounded-xl ">
            <div className="dialogue-text space-y-6">
              {/* Ligne 1 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">
                  Marie :
                </span>
                <span className="text">Bonjour, madame Bouton. Je</span>
                <input
                  type="text"
                  value={inputs[0] || ""}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-48"
                />
                <span className="text">Marie. Je suis </span>
                <br />
              </div>

              {/* Ligne 2 */}
              <div className="dialogue-line flex items-start">
                <span className="text">une nouvelle élève.</span>

                <span className="text"> ?</span>
              </div>

              {/* Ligne 3 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">
                  Mme Bouton :
                </span>
                <span className="text">
                  Bonjour, Marie. Bienvenue dans ma classe. Tout le monde, c’est
                  Marie, votre nouvelle camarade.
                </span>
              </div>
              <span>La classe : Bonjour, Marie.</span>
              {/* Ligne 4 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">
             Mme Bouton :
                </span>
            
                <span className="text">
                 Assieds-toi près de
                </span>
                        <input
                  type="text"
                  value={inputs[1] || ""}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 w-48"
                />
              </div>

              {/* Ligne 5 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">
                  Marie :
                </span>
                         <input
                  type="text"
                  value={inputs[2] || ""}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-48"
                />
              </div>

           

              {/* Ligne 7 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-600 min-w-[80px]">
                 Mme Bouton :
                </span>
                <span className="text">Alors, nous... . </span>
               
               
              </div>
                <span className="text"> (à sa table)</span>
              {/* Ligne 8 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-900 min-w-[80px]">
                  Chloé :
                </span>
                <span className="text">Psst… Salut, Marie. Je m’appelle Chloé. </span>
                <br />
                <input
                  type="text"
                  value={inputs[3] || ""}
                  onChange={(e) => handleInputChange(4, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
                />
             
              </div>

              {/* Ligne 9 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">
                 Marie
                </span>
                <span className="text">Salut ! Ça va pas mal.</span>
              </div>

              {/* Ligne 10 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-blue-900 min-w-[80px]">
               Chloé
                </span>
                <span className="text">Si tu</span>
                <input
                  type="text"
                  value={inputs [4] || ""}
                  onChange={(e) => handleInputChange(5, e.target.value)}
                  className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-40"
                />
                <span className="text">quelque chose,demande-moi. Ok ?</span>
              </div>

              {/* Ligne 11 */}
              <div className="dialogue-line flex items-start">
                <span className="speaker font-bold text-pink-600 min-w-[80px]">
                  Marie :
                </span>
                <span className="text">Merci.</span>
              </div>

          
          
            </div>
          </div>
        </div>

        {/* الصور على اليمين */}
        <div className="images-section lg:w-1/3 flex flex-col gap-6">
          <div className="image-container" style={{ width: "100%" }}>
            <img
              src={img1}
              alt="Dialogue illustration 1"
              className="w-full h-auto max-h-[300px] max-w-[300px] object-contain"
            />
          </div>
        </div>
      </div>

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
