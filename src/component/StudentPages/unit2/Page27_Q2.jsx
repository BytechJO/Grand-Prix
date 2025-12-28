import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";

/* 🔴 الكلمات للتصنيف */
const wordsList = [
  "un stylo",
  "une paire de ciseaux",
  "un crayon",
  "une trousse",
  "un livre",
  "une règle",
  "un cahier",
  "une gomme",
  "des crayons de couleur",
  "un sac à dos",
  "un taille-crayon",
  "des surligneurs",
  "un compas"
];

/* 🔴 الإجابات الصحيحة */
const correctAnswers = {
  masculins: [
    "un stylo",
    "un crayon",
    "un livre",
    "un cahier",
    "des crayons de couleur",
    "un sac à dos",
    "un taille-crayon",
    "des surligneurs",
    "un compas"
  ],
  feminins: [
    "une paire de ciseaux",
    "une trousse",
    "une règle",
    "une gomme"
  ]
};

const Page5_Q1_CleanAudio = () => {
  const [masculinInput, setMasculinInput] = useState("");
  const [femininInput, setFemininInput] = useState("");
  const [masculinWords, setMasculinWords] = useState([]);
  const [femininWords, setFemininWords] = useState([]);
  const [score, setScore] = useState(null);
  const [checkedAnswers, setCheckedAnswers] = useState({ masculins: [], feminins: [] });
  const [showCorrections, setShowCorrections] = useState(false);

  // دالة لإضافة كلمة إلى القائمة المذكرة
  const addMasculinWord = () => {
    if (masculinInput.trim() !== "") {
      setMasculinWords([...masculinWords, masculinInput.trim()]);
      setMasculinInput("");
    }
  };

  // دالة لإضافة كلمة إلى القائمة المؤنثة
  const addFemininWord = () => {
    if (femininInput.trim() !== "") {
      setFemininWords([...femininWords, femininInput.trim()]);
      setFemininInput("");
    }
  };

  // السماح بالضغط على Enter لإضافة الكلمة
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'masculin') {
        addMasculinWord();
      } else {
        addFemininWord();
      }
    }
  };

  // إزالة كلمة من القائمة المذكرة
  const removeMasculinWord = (index) => {
    const newWords = [...masculinWords];
    newWords.splice(index, 1);
    setMasculinWords(newWords);
  };

  // إزالة كلمة من القائمة المؤنثة
  const removeFemininWord = (index) => {
    const newWords = [...femininWords];
    newWords.splice(index, 1);
    setFemininWords(newWords);
  };

  // التحقق من الإجابات
  const checkAnswer = () => {
    let correctMasculin = 0;
    let correctFeminin = 0;
    let wrongMasculin = 0;
    let wrongFeminin = 0;
    
    const correctMasculins = [];
    const wrongMasculins = [];
    const correctFeminins = [];
    const wrongFeminins = [];
    
    // التحقق من الكلمات في القائمة المذكرة
    masculinWords.forEach(word => {
      if (correctAnswers.masculins.includes(word)) {
        correctMasculin++;
        correctMasculins.push(word);
      } else {
        wrongMasculin++;
        wrongMasculins.push(word);
      }
    });
    
    // التحقق من الكلمات في القائمة المؤنثة
    femininWords.forEach(word => {
      if (correctAnswers.feminins.includes(word)) {
        correctFeminin++;
        correctFeminins.push(word);
      } else {
        wrongFeminin++;
        wrongFeminins.push(word);
      }
    });
    
    // الكلمات المفقودة (التي لم يذكرها الطالب)
    const missingMasculins = correctAnswers.masculins.filter(
      word => !masculinWords.includes(word)
    );
    
    const missingFeminins = correctAnswers.feminins.filter(
      word => !femininWords.includes(word)
    );
    
    const totalWords = wordsList.length;
    const totalCorrect = correctMasculin + correctFeminin;
    const totalWrong = wrongMasculin + wrongFeminin;
    const totalMissing = missingMasculins.length + missingFeminins.length;
    
    // حساب النقاط (الكلمات الصحيحة فقط)
    const finalScore = totalCorrect;
    
    setScore({ 
      correct: finalScore, 
      total: totalWords,
      details: {
        correctMasculin,
        correctFeminin,
        wrongMasculin,
        wrongFeminin,
        missingMasculins,
        missingFeminins
      }
    });
    
    // حفظ الإجابات للتصحيح
    setCheckedAnswers({
      masculins: {
        correct: correctMasculins,
        wrong: wrongMasculins,
        missing: missingMasculins
      },
      feminins: {
        correct: correctFeminins,
        wrong: wrongFeminins,
        missing: missingFeminins
      }
    });
    
    setShowCorrections(true);
    
    // عرض التنبيه المناسب
    if (totalCorrect === totalWords && totalWrong === 0) {
      ValidationAlert.success(
        `Excellent! (${totalCorrect}/${totalWords})`,
        "Toutes les réponses sont correctes!"
      );
    } else if (totalCorrect === 0 && totalWrong > 0) {
      ValidationAlert.error(
        `Toutes vos réponses sont incorrectes (0/${totalWords})`,
        "Essayez encore!"
      );
    } else {
      ValidationAlert.error(
        `Vous avez ${totalCorrect} réponse(s) correcte(s) et ${totalWrong} erreur(s).`,
        "Presque! Vérifiez vos réponses ci-dessous."
      );
    }
  };

  // عرض الإجابات النموذجية
  const showAnswerFunc = () => {
    setMasculinWords([...correctAnswers.masculins]);
    setFemininWords([...correctAnswers.feminins]);
    setShowCorrections(false);
  };

  // إعادة تعيين التمرين
  const resetExercise = () => {
    setMasculinInput("");
    setFemininInput("");
    setMasculinWords([]);
    setFemininWords([]);
    setScore(null);
    setCheckedAnswers({ masculins: [], feminins: [] });
    setShowCorrections(false);
  };

  // دالة للتحقق إذا كانت الكلمة صحيحة أو خاطئة (للتلوين)
  const getWordClass = (word, type) => {
    if (!showCorrections) return "";
    
    if (type === 'masculin') {
      if (checkedAnswers.masculins.correct.includes(word)) {
        return "correct-word";
      } else if (checkedAnswers.masculins.wrong.includes(word)) {
        return "wrong-word";
      }
    } else {
      if (checkedAnswers.feminins.correct.includes(word)) {
        return "correct-word";
      } else if (checkedAnswers.feminins.wrong.includes(word)) {
        return "wrong-word";
      }
    }
    
    return "";
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
        <span className="number-of-q">1</span>{" "}
        Écris les mots qui sont :
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise Container */}
      <div className="exercise-container w-full max-w-6xl flex flex-col md:flex-row gap-8">
        
        {/* التعليمات والقائمة */}
        <div className="instructions-section w-full md:w-1/3">
          <div className="instructions p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="text-lg font-bold mb-2">Instructions :</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Écrivez les mots dans les bonnes catégories</li>
              <li>Cliquez sur "Ajouter" ou appuyez sur Entrée</li>
              <li>Vous pouvez faire des erreurs</li>
              <li>Les corrections s'affichent après vérification</li>
            </ul>
          </div>
          
          <div className="words-reference p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-3 text-center">Liste des mots :</h3>
            <div className="words-grid grid grid-cols-2 gap-2">
              {wordsList.map((word, index) => (
                <div 
                  key={index}
                  className="word-ref p-2 bg-blue-50 rounded text-sm text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* التصنيف */}
        <div className="classification-section w-full md:w-2/3">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* القسم المذكر */}
            <div className="masculin-column w-full md:w-1/2">
              <div className="category-header p-3 bg-blue-600 text-white rounded-t-lg text-center font-bold text-lg">
                Masculins
              </div>
              
              {/* حقل الإدخال */}
              <div className="input-group p-4 bg-blue-100 border-x-2 border-blue-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={masculinInput}
                    onChange={(e) => setMasculinInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'masculin')}
                    placeholder="Écrivez un mot masculin..."
                    className="flex-1 p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addMasculinWord}
                    className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              
              {/* قائمة الكلمات المضافة */}
              <div className="words-container min-h-[300px] p-4 bg-blue-50 border-2 border-blue-300 border-t-0 rounded-b-lg">
                {masculinWords.length === 0 ? (
                  <div className="empty-message text-gray-400 italic text-center mt-20">
                    Aucun mot ajouté. Écrivez des mots masculins ci-dessus.
                  </div>
                ) : (
                  <div className="words-grid grid grid-cols-1 gap-3">
                    {masculinWords.map((word, index) => (
                      <div 
                        key={index}
                        className={`word-item p-3 rounded-lg border flex justify-between items-center shadow-sm ${getWordClass(word, 'masculin')}`}
                      >
                        <span>{word}</span>
                        <button 
                          onClick={() => removeMasculinWord(index)}
                          className="remove-btn text-red-500 hover:text-red-700 text-lg font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* التصحيح (إذا كان مفعلاً) */}
              {showCorrections && (
                <div className="correction-section mt-4 p-3 bg-white rounded border">
                  <h4 className="font-bold mb-2 text-blue-700">Correction :</h4>
                  <div className="space-y-1">
                    {checkedAnswers.masculins.correct.length > 0 && (
                      <div className="text-green-600">
                        ✓ Correct: {checkedAnswers.masculins.correct.join(", ")}
                      </div>
                    )}
                    {checkedAnswers.masculins.wrong.length > 0 && (
                      <div className="text-red-600">
                        ✗ Erreur: {checkedAnswers.masculins.wrong.join(", ")}
                      </div>
                    )}
                    {checkedAnswers.masculins.missing.length > 0 && (
                      <div className="text-yellow-600">
                        ⓘ Manquant: {checkedAnswers.masculins.missing.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="count-display mt-2 text-center text-blue-700 font-medium">
                {masculinWords.length} mot(s) ajouté(s)
              </div>
            </div>

            {/* القسم المؤنث */}
            <div className="feminin-column w-full md:w-1/2">
              <div className="category-header p-3 bg-pink-600 text-white rounded-t-lg text-center font-bold text-lg">
                Féminins
              </div>
              
              {/* حقل الإدخال */}
              <div className="input-group p-4 bg-pink-100 border-x-2 border-pink-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={femininInput}
                    onChange={(e) => setFemininInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'feminin')}
                    placeholder="Écrivez un mot féminin..."
                    className="flex-1 p-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={addFemininWord}
                    className="px-4 bg-pink-500 hover:bg-pink-600 text-white rounded font-medium transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              
              {/* قائمة الكلمات المضافة */}
              <div className="words-container min-h-[300px] p-4 bg-pink-50 border-2 border-pink-300 border-t-0 rounded-b-lg">
                {femininWords.length === 0 ? (
                  <div className="empty-message text-gray-400 italic text-center mt-20">
                    Aucun mot ajouté. Écrivez des mots féminins ci-dessus.
                  </div>
                ) : (
                  <div className="words-grid grid grid-cols-1 gap-3">
                    {femininWords.map((word, index) => (
                      <div 
                        key={index}
                        className={`word-item p-3 rounded-lg border flex justify-between items-center shadow-sm ${getWordClass(word, 'feminin')}`}
                      >
                        <span>{word}</span>
                        <button 
                          onClick={() => removeFemininWord(index)}
                          className="remove-btn text-red-500 hover:text-red-700 text-lg font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* التصحيح (إذا كان مفعلاً) */}
              {showCorrections && (
                <div className="correction-section mt-4 p-3 bg-white rounded border">
                  <h4 className="font-bold mb-2 text-pink-700">Correction :</h4>
                  <div className="space-y-1">
                    {checkedAnswers.feminins.correct.length > 0 && (
                      <div className="text-green-600">
                        ✓ Correct: {checkedAnswers.feminins.correct.join(", ")}
                      </div>
                    )}
                    {checkedAnswers.feminins.wrong.length > 0 && (
                      <div className="text-red-600">
                        ✗ Erreur: {checkedAnswers.feminins.wrong.join(", ")}
                      </div>
                    )}
                    {checkedAnswers.feminins.missing.length > 0 && (
                      <div className="text-yellow-600">
                        ⓘ Manquant: {checkedAnswers.feminins.missing.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="count-display mt-2 text-center text-pink-700 font-medium">
                {femininWords.length} mot(s) ajouté(s)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-8 flex gap-4">
        <button 
          onClick={resetExercise} 
          className="try-again-button px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Recommencer ↻
        </button>
        <button 
          onClick={showAnswerFunc} 
          className="show-answer-btn px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Afficher la réponse
        </button>
        <button 
          onClick={checkAnswer} 
          className="check-button2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Vérifier la réponse✓
        </button>
      </div>
    </div>
  );
};

export default Page5_Q1_CleanAudio;