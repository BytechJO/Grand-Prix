import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ScoreCardEnhanced from "../../Popup/ScoreCard";
import "./Page27_Q2.css"

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
  masculins: [0, 2, 4, 6, 8, 9, 10, 11, 12],
  feminins: [1, 3, 5, 7]
};

const Page5_Q1_CleanAudio = () => {
  const [masculinInput, setMasculinInput] = useState("");
  const [femininInput, setFemininInput] = useState("");
  const [masculinNumbers, setMasculinNumbers] = useState([]);
  const [femininNumbers, setFemininNumbers] = useState([]);
  const [score, setScore] = useState(null);
  const [checkedAnswers, setCheckedAnswers] = useState({ 
    masculins: { correct: [], wrong: [], missing: [] }, 
    feminins: { correct: [], wrong: [], missing: [] } 
  });
  const [showCorrections, setShowCorrections] = useState(false);
  const [lastAddedNumber, setLastAddedNumber] = useState(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  
  // Refs للسكرول
  const wordsGridRef = useRef(null);
  const wordRowRefs = useRef([]);
  const masculinInputRef = useRef(null);
  const femininInputRef = useRef(null);

  // تهيئة refs للكلمات
  useEffect(() => {
    wordRowRefs.current = wordRowRefs.current.slice(0, wordsList.length);
  }, []);

  // السكرول التلقائي عند اختيار رقم
  useEffect(() => {
    if (lastAddedNumber !== null && wordsGridRef.current) {
      const index = lastAddedNumber;
      
      // تأخير بسيط للتأكد من تحديث DOM
      setTimeout(() => {
        if (wordRowRefs.current[index]) {
          wordRowRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          
          // تمييز الكلمة مؤقتاً
          setSelectedWordIndex(index);
          
          // إزالة التمييز بعد 2 ثانية
          setTimeout(() => {
            setSelectedWordIndex(null);
          }, 2000);
        }
      }, 100);
    }
  }, [lastAddedNumber]);

  // دالة محسنة لإضافة رقم مع السكرول
  const addNumberWithScroll = (num, type) => {
    const index = num - 1;
    
    if (type === 'masculin') {
      if (!masculinNumbers.includes(index) && !femininNumbers.includes(index)) {
        setMasculinNumbers([...masculinNumbers, index]);
        setMasculinInput("");
        setLastAddedNumber(index);
        // التركيز على حقل المؤنث بعد الإضافة
        setTimeout(() => femininInputRef.current?.focus(), 100);
      } else {
        ValidationAlert.warning("Ce numéro est déjà utilisé", "Choisissez un autre numéro");
      }
    } else {
      if (!femininNumbers.includes(index) && !masculinNumbers.includes(index)) {
        setFemininNumbers([...femininNumbers, index]);
        setFemininInput("");
        setLastAddedNumber(index);
        // التركيز على حقل المذكر بعد الإضافة
        setTimeout(() => masculinInputRef.current?.focus(), 100);
      } else {
        ValidationAlert.warning("Ce numéro est déjà utilisé", "Choisissez un autre numéro");
      }
    }
  };

  // دالة لإضافة رقم إلى القائمة المذكرة
  const addMasculinNumber = () => {
    const num = parseInt(masculinInput.trim());
    if (!isNaN(num) && num >= 1 && num <= wordsList.length) {
      addNumberWithScroll(num, 'masculin');
    } else {
      ValidationAlert.warning("Numéro invalide", `Veuillez entrer un numéro entre 1 et ${wordsList.length}`);
    }
  };

  // دالة لإضافة رقم إلى القائمة المؤنثة
  const addFemininNumber = () => {
    const num = parseInt(femininInput.trim());
    if (!isNaN(num) && num >= 1 && num <= wordsList.length) {
      addNumberWithScroll(num, 'feminin');
    } else {
      ValidationAlert.warning("Numéro invalide", `Veuillez entrer un numéro entre 1 et ${wordsList.length}`);
    }
  };

  // السماح بالضغط على Enter لإضافة الرقم
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'masculin') {
        addMasculinNumber();
      } else {
        addFemininNumber();
      }
    }
  };

  // إزالة رقم من القائمة المذكرة
  const removeMasculinNumber = (index) => {
    const newNumbers = masculinNumbers.filter(num => num !== index);
    setMasculinNumbers(newNumbers);
  };

  // إزالة رقم من القائمة المؤنثة
  const removeFemininNumber = (index) => {
    const newNumbers = femininNumbers.filter(num => num !== index);
    setFemininNumbers(newNumbers);
  };

  // التحقق من الإجابات
  const checkAnswer = () => {
    let correctMasculin = 0;
    let correctFeminin = 0;
    let wrongMasculin = 0;
    let wrongFeminin = 0;
    
    const correctMasculinNumbers = [];
    const wrongMasculinNumbers = [];
    const correctFemininNumbers = [];
    const wrongFemininNumbers = [];
    
    // التحقق من الأرقام في القائمة المذكرة
    masculinNumbers.forEach(num => {
      if (correctAnswers.masculins.includes(num)) {
        correctMasculin++;
        correctMasculinNumbers.push(num);
      } else {
        wrongMasculin++;
        wrongMasculinNumbers.push(num);
      }
    });
    
    // التحقق من الأرقام في القائمة المؤنثة
    femininNumbers.forEach(num => {
      if (correctAnswers.feminins.includes(num)) {
        correctFeminin++;
        correctFemininNumbers.push(num);
      } else {
        wrongFeminin++;
        wrongFemininNumbers.push(num);
      }
    });
    
    // الأرقام المفقودة (التي لم يذكرها الطالب)
    const missingMasculins = correctAnswers.masculins.filter(
      num => !masculinNumbers.includes(num)
    );
    
    const missingFeminins = correctAnswers.feminins.filter(
      num => !femininNumbers.includes(num)
    );
    
    const totalWords = wordsList.length;
    const totalCorrect = correctMasculin + correctFeminin;
    const totalWrong = wrongMasculin + wrongFeminin;
    
    // حساب النقاط
    const finalScore = totalCorrect;
    
    setScore({ 
      correct: finalScore, 
      total: totalWords,
      details: {
        correctMasculin,
        correctFeminin,
        wrongMasculin,
        wrongFeminin,
        totalCorrect,
        totalWrong
      }
    });
    
    // حفظ الإجابات للتصحيح
    setCheckedAnswers({
      masculins: {
        correct: correctMasculinNumbers,
        wrong: wrongMasculinNumbers,
        missing: missingMasculins
      },
      feminins: {
        correct: correctFemininNumbers,
        wrong: wrongFemininNumbers,
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

  // عرض الإجابات النموذجية - الدالة المفقودة
  const showAnswerFunc = () => {
    setMasculinNumbers([...correctAnswers.masculins]);
    setFemininNumbers([...correctAnswers.feminins]);
    setShowCorrections(false);
    setScore(null);
    ValidationAlert.success(
      "Réponses affichées",
      "Les réponses correctes sont maintenant affichées dans les colonnes."
    );
  };

  // إعادة تعيين التمرين
  const resetExercise = () => {
    setMasculinInput("");
    setFemininInput("");
    setMasculinNumbers([]);
    setFemininNumbers([]);
    setScore(null);
    setCheckedAnswers({ 
      masculins: { correct: [], wrong: [], missing: [] }, 
      feminins: { correct: [], wrong: [], missing: [] } 
    });
    setShowCorrections(false);
    setLastAddedNumber(null);
    setSelectedWordIndex(null);
    // التركيز على حقل المذكر بعد الإعادة
    setTimeout(() => masculinInputRef.current?.focus(), 100);
  };

  // دالة للتحقق إذا كان الرقم صحيح أو خاطئ (للتلوين)
  const getNumberClass = (num, type) => {
    if (!showCorrections) return "";
    
    if (type === 'masculin') {
      if (checkedAnswers.masculins.correct.includes(num)) {
        return "correct-number";
      } else if (checkedAnswers.masculins.wrong.includes(num)) {
        return "wrong-number";
      }
    } else {
      if (checkedAnswers.feminins.correct.includes(num)) {
        return "correct-number";
      } else if (checkedAnswers.feminins.wrong.includes(num)) {
        return "wrong-number";
      }
    }
    
    return "";
  };

  // دالة للحصول على كلاس الكلمة في القائمة
  const getWordRowClass = (index) => {
    let classes = '';
    
    if (masculinNumbers.includes(index)) {
      classes += ' bg-blue-50 border-blue-300';
    } else if (femininNumbers.includes(index)) {
      classes += ' bg-pink-50 border-pink-300';
    } else {
      classes += ' bg-gray-50 border-gray-200';
    }
    
    if (selectedWordIndex === index) {
      classes += ' selected recently-added';
    }
    
    return classes;
  };

  // الحصول على الكلمة من رقمها
  const getWordByNumber = (num) => {
    return wordsList[num];
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
        <span className="number-of-q">3</span>{" "}
        Écris les mots qui sont
      </header>

      {score && <ScoreCardEnhanced score={score} />}

      {/* Exercise Container */}
      <div className="exercise-container27 ">
        
        {/* جدول الكلمات المرقمة */}
        <div className="words-table-section27 ">
          <div className="words-table-container27 ">
            <h3 className="text-base ">
              Tableau des mots :
            </h3>

            {/* شبكة الكلمات مع ref للسكرول */}
            <div 
              className="words-grid "
              ref={wordsGridRef}
            >
              {wordsList.map((word, index) => (
                <div 
                  key={index}
                  ref={el => wordRowRefs.current[index] = el}
                  className={`word-row p-2 sm:p-3 rounded border flex items-center gap-2 sm:gap-3 transition-all duration-300 ${getWordRowClass(index)}`}
                  data-index={index}
                >
                  <div className={`number-circle w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full font-bold text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                    masculinNumbers.includes(index) ? 'bg-blue-500 text-white' : 
                    femininNumbers.includes(index) ? 'bg-pink-500 text-white' : 
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="word-text text-sm sm:text-base truncate">{word}</span>
                  
                  {/* مؤشر حالة الكلمة */}
                  {(masculinNumbers.includes(index) || femininNumbers.includes(index)) && (
                    <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                      masculinNumbers.includes(index) ? 'bg-blue-100 text-blue-800' : 
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {masculinNumbers.includes(index) ? '♂' : '♀'}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* تعليمات السكرول */}
            <div className="mt-3 text-xs text-gray-500 text-center">
              ✓ Le défilement automatique s'active lors de la sélection d'un numéro
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
                    ref={masculinInputRef}
                    type="number"
                    min="1"
                    max={wordsList.length}
                    value={masculinInput}
                    onChange={(e) => setMasculinInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'masculin')}
                    placeholder={`Entrez un numéro (1-${wordsList.length})...`}
                    className="flex-1 p-3 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addMasculinNumber}
                    className="px-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              
              {/* قائمة الأرقام المضافة */}
              <div className="numbers-container min-h-[300px] p-4 bg-blue-50 border-2 border-blue-300 border-t-0 rounded-b-lg">
                {masculinNumbers.length === 0 ? (
                  <div className="empty-message text-gray-400 italic text-center mt-20">
                    Aucun numéro ajouté. Écrivez des numéros ci-dessus.
                  </div>
                ) : (
                  <div className="numbers-grid grid grid-cols-1 gap-3">
                    {masculinNumbers.map((num, index) => (
                      <div 
                        key={index}
                        className={`number-item p-3 rounded-lg border flex justify-between items-center shadow-sm ${getNumberClass(num, 'masculin')}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="number-badge bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                            {num + 1}
                          </span>
                          <span className="word-text">{wordsList[num]}</span>
                        </div>
                        <button 
                          onClick={() => removeMasculinNumber(num)}
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
                        ✓ Correct: {checkedAnswers.masculins.correct.map(n => n + 1).join(", ")}
                      </div>
                    )}
                    {checkedAnswers.masculins.wrong.length > 0 && (
                      <div className="text-red-600">
                        ✗ Erreur: {checkedAnswers.masculins.wrong.map(n => n + 1).join(", ")}
                      </div>
                    )}
                    {checkedAnswers.masculins.missing.length > 0 && (
                      <div className="text-yellow-600">
                        ⓘ Manquant: {checkedAnswers.masculins.missing.map(n => n + 1).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="count-display mt-2 text-center text-blue-700 font-medium">
                {masculinNumbers.length} numéro(s) ajouté(s)
              </div>
            </div>

            {/* القسم المؤنث */}
            <div className="feminin-column w-full md:w-1/2">
              <div className="category-header p-3 bg-pink-600 text-white rounded-t-lg text-center font-bold text-lg">
                Féminins
              </div>
              
              {/* حقل الإدخال */}
              <div className="input-group27 p-4 bg-pink-100 border-x-2 border-pink-300">
                <div className="flex gap-2">
                  <input
                    ref={femininInputRef}
                    type="number"
                    min="1"
                    max={wordsList.length}
                    value={femininInput}
                    onChange={(e) => setFemininInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'feminin')}
                    placeholder={`Entrez un numéro (1-${wordsList.length})...`}
                    className="flex-1 p-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={addFemininNumber}
                    className="px-4 bg-pink-500 hover:bg-pink-600 text-white rounded font-medium transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              
              {/* قائمة الأرقام المضافة */}
              <div className="numbers-container min-h-[300px] p-4 bg-pink-50 border-2 border-pink-300 border-t-0 rounded-b-lg">
                {femininNumbers.length === 0 ? (
                  <div className="empty-message text-gray-400 italic text-center mt-20">
                    Aucun numéro ajouté. Écrivez des numéros ci-dessus.
                  </div>
                ) : (
                  <div className="numbers-grid grid grid-cols-1 gap-3">
                    {femininNumbers.map((num, index) => (
                      <div 
                        key={index}
                        className={`number-item p-3 rounded-lg border flex justify-between items-center shadow-sm ${getNumberClass(num, 'feminin')}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="number-badge bg-pink-100 text-pink-800 px-2 py-1 rounded font-bold">
                            {num + 1}
                          </span>
                          <span className="word-text">{wordsList[num]}</span>
                        </div>
                        <button 
                          onClick={() => removeFemininNumber(num)}
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
                        ✓ Correct: {checkedAnswers.feminins.correct.map(n => n + 1).join(", ")}
                      </div>
                    )}
                    {checkedAnswers.feminins.wrong.length > 0 && (
                      <div className="text-red-600">
                        ✗ Erreur: {checkedAnswers.feminins.wrong.map(n => n + 1).join(", ")}
                      </div>
                    )}
                    {checkedAnswers.feminins.missing.length > 0 && (
                      <div className="text-yellow-600">
                        ⓘ Manquant: {checkedAnswers.feminins.missing.map(n => n + 1).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="count-display mt-2 text-center text-pink-700 font-medium">
                {femininNumbers.length} numéro(s) ajouté(s)
              </div>
            </div>
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