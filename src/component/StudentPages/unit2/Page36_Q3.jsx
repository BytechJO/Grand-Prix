import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard"; 
import img1 from "../../../assets/unite2pages/svg/P36Q3.png"
import "../unit1/CSSPAGE/Q11.css";

const Page5_Q1_CleanAudio = () => {
  const audioRef = useRef(null);
  const [inputs, setInputs] = useState({});

  const handleInputChange = (index, value) => {
    setInputs({
      ...inputs,
      [index]: value
    });
    setAnswers(prev => ({
      ...prev,
      [`blank${index + 1}`]: value
    }));
  };

  const [answers, setAnswers] = useState({
    blank1: '',
    blank2: '',
    blank3: '',
    blank4: '',
    blank5: '',
    blank6: '',
    blank7: '',
    blank8: '',
    blank9: '',
    blank10: '',
    blank11: '',
    blank12: '',
    blank13: '',
  });

const correctAnswers = {
  blank1: "emploi du temps",
  blank2: "voir",
  blank3: "bien sûr",
  blank4: "leçons de technologie",
  blank5: "mercredi",
  blank6: "ça",
  blank7: "cours d’anglais",
  blank8: "matière préférée",
  blank9: "l’art",
  blank10: "Qu’est-ce que c’est la SVT",
  blank11: "le prof",
  blank12: "espagnol",
};



  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const checkAnswer = () => {
    const blanks = Object.keys(correctAnswers);
    let correctCount = 0;
    let incomplete = false;

    blanks.forEach(blank => {
      const val = answers[blank]?.trim();
      if (!val) incomplete = true;
      if (val?.toLowerCase() === correctAnswers[blank].toLowerCase()) {
        correctCount++;
      }
    });

    const total = blanks.length;

    if (incomplete) {
      ValidationAlert.info(
        "Incomplete",
        "Some answers are missing.",
        `${correctCount}/${total}`
      );
    } else {
      setScore({ correct: correctCount, total });

      if (correctCount === total) {
        ValidationAlert.success(
          "Good Job!",
          "You got all answers right!",
          `${correctCount}/${total}`
        );
      } else if (correctCount === 0) {
        ValidationAlert.error(
          "Try Again!",
          "All answers are incorrect.",
          `${correctCount}/${total}`
        );
      } else {
        ValidationAlert.warning(
          "Some answers are incorrect",
          `You got ${correctCount} out of ${total} correct.`,
          `${correctCount}/${total}`
        );
      }
    }

    setShowResults(true);
  };

  const showAnswerFunc = () => {
    setAnswers(correctAnswers);
    const newInputs = {};
    Object.keys(correctAnswers).forEach((key, index) => {
      newInputs[index] = correctAnswers[key];
    });
    setInputs(newInputs);

    const total = Object.keys(correctAnswers).length;
    const correctCount = total;

    setScore({ correct: correctCount, total });

    ValidationAlert.success(
      "Answers shown",
      "All correct answers have been filled in.",
      `${correctCount}/${total}`
    );

    setShowResults(true);
  };

  const resetExercise = () => {
    const emptyAnswers = {};
    Object.keys(correctAnswers).forEach(blank => {
      emptyAnswers[blank] = "";
    });
    setAnswers(emptyAnswers);
    setInputs({});
    setShowResults(false);
    setScore(null);
  };

  const isCorrect = (blank) => {
    if (!showResults) return null;
    return answers[blank].trim().toLowerCase() === correctAnswers[blank].toLowerCase();
  };

  const getInputClass = (blank) => {
    if (!showResults) return 'q11-input-default';
    return isCorrect(blank) ? 'q11-input-correct' : 'q11-input-incorrect';
  };

  return (
    <div className="page-wrapper1 flex flex-col items-center justify-start gap-8 p-4">

      <header
        className="header-title-page1 w-full text-left mb-4"
        style={{ marginLeft: "42%", color:"black",marginTop:"5%",fontSize:"25px", fontWeight:"bold" }}
      >
        <span  style={{ backgroundColor: "#df4f89" }} className="ex-A">C</span> <span style={{color:"black"}} className="number-of-q">3</span>
         Écoute la conversation entre Carole et Jenna. Complète le dialogue <br /> en utilisant lesmots proposés.
      </header>

      <div className="q11-word-bank-36"
        style={{
          backgroundColor:"#ffe7b1",
          padding:"5px",
          borderRadius:"8px",
          justifyContent:"center",
          border:"5px dashed  #7c529c"
        }}
      >
        <div className="q11-word-list-36">
          {Object.values(correctAnswers).map((word, index) => (
            <React.Fragment key={index}>
              <span className="q11-word">{word}</span>
              {(index + 1) % 6 === 0 ? <br /> : null}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="q11-questions-container">
        <div className="imgexrsize">
          <img src={img1} alt="" />
        </div>

        <div className="page28q4-dialogue-text space-y-6">
          {/* الحوار الأصلي مع كل input مرتبط بـ correctAnswers */}
          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">Carole:</span>
            <span className="text">Bonjour, Jenna. Comment ça va ? </span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Jenna :</span>
            <span className="text">Salut, Carole. Ça va bien, merci. Et toi ?</span>
          
           
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">Carole:</span>
            <span className="text">Bien. Tu as vu notre</span>
            <input
              type="text"
              value={inputs[0] || ""}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-40"
            />
            <span className="text"> ?</span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Jenna:</span>
            <span className="text">Non. On peut aller</span>
             <input
              type="text"
              value={inputs[1] || ""}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-900 focus:outline-none focus:border-blue-500 w-40"
            />
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">Carole :</span>
            <span className="text">Oui,</span>
             <input
              type="text"
              value={inputs[2] || ""}
              onChange={(e) => handleInputChange(2, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-pink-300 focus:outline-none focus:border-blue-500 w-40"
            />

          </div>

          <div className="note italic text-gray-500 text-sm ml-20" ><strong>(à côté du tableau d’affichage)</strong></div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Jenna :</span>
            <span className="text">Nous n’avons pas beaucoup de</span>
            <input
              type="text"
              value={inputs[3] || ""}
              onChange={(e) => handleInputChange(3, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-900 focus:outline-none focus:border-blue-500 w-24"
            />
            <span className="text"> J’aime beaucoup le prof.</span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Carole :</span>
            <span className="text">Oui c'est vrai. Nous avons maths chaque jour sauf le</span>
            <input
              type="text"
              value={inputs[4] || ""}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
            <span className="text">Le prof</span>
          </div>
          <div className="dialogue-line flex items-start">
            <span className="text">de maths pose beaucoup de questions. J’aime</span>
            <input
              type="text"
              value={inputs[5] || ""}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
          
          </div>
<div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Jenna :</span>
            <span className="text">Oh mon Dieu !!! Combien de</span>
            <input
              type="text"
              value={inputs[6] || ""}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
            <span className="text">?Un, deux, trois. Magnifique</span>
          </div>
          <div className="dialogue-line flex items-start">
            <span className="text">c’est ma</span>
            <input
              type="text"
              value={inputs[7] || ""}
              onChange={(e) => handleInputChange(4, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
             <span className="text">Quelle est ta matière préférée ?</span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">Carole :</span>
            <span className="text">Ma matière préférée,c'est</span>
            <input
              type="text"
              value={inputs[8] || ""}
              onChange={(e) => handleInputChange(5, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-40"
            />
            <span className="text">Mais, malheureusement, nous n’avons</span>
          </div>
           <div className="dialogue-line flex items-start"><span>pas beaucoup de cours.</span></div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">Jenna:</span>
            <span className="text">Nous avons aussi des cours de physique, d’EPS et de SVT.</span>
              <input
              type="text"
              value={inputs[9] || ""}
              onChange={(e) => handleInputChange(5, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-40"
            />
            <span className="text">?</span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Carole :</span>
            <span className="text">SVT , ça veut dire Sciences de la Vie et de la Terre. </span>
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-pink-400 min-w-[80px]">jenna :</span>
            <span className="text">Oh mon Dieu !!! Nous avons les nouvelles leçons</span>
             <input
              type="text"
              value={inputs[10] || ""}
              onChange={(e) => handleInputChange(6, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
          </div>

          <div className="dialogue-line flex items-start">
            <span className="speaker font-bold text-blue-900 min-w-[80px]">Carole : </span>
            <span className="text">Oui, je sais</span>
   <input
              type="text"
              value={inputs[11] || ""}
              onChange={(e) => handleInputChange(6, e.target.value)}
              className="missing-word-input ml-2 px-3 py-1 border-b-2 border-blue-300 focus:outline-none focus:border-pink-500 w-48"
            />
              <span className="text">n’est pas bon. Il est exigeant.</span>
          </div>

        </div>
      </div>

      <div className="spaces"></div>
      {score && <ScoreCardEnhanced score={score} />}

      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">Recommencer ↻</button>
        <button onClick={showAnswerFunc} className="show-answer-btn swal-continue">Afficher la réponse</button>
        <button onClick={checkAnswer} className="check-button2">Vérifier la réponse✓</button>
      </div>

    </div>
  );
};

export default Page5_Q1_CleanAudio;
