/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2, Trophy, Star, RotateCcw, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  start: string;
  end: string;
  options: string[];
  answer: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    start: "I like apples",
    end: "I love oranges even more.",
    options: ["and", "but", "or", "so"],
    answer: "but",
    explanation: "We use 'but' to show a contrast or something unexpected."
  },
  {
    id: 2,
    start: "Do you want to play soccer",
    end: "basketball?",
    options: ["and", "but", "or", "so"],
    answer: "or",
    explanation: "We use 'or' when we have a choice between two things."
  },
  {
    id: 3,
    start: "It was raining outside,",
    end: "we stayed indoors.",
    options: ["because", "but", "so", "and"],
    answer: "so",
    explanation: "We use 'so' to show the result of something."
  },
  {
    id: 4,
    start: "She studied hard",
    end: "she wanted to pass the test.",
    options: ["but", "because", "so", "and"],
    answer: "because",
    explanation: "We use 'because' to explain the reason why something happens."
  },
  {
    id: 5,
    start: "I bought a pen",
    end: "some paper at the shop.",
    options: ["and", "but", "or", "so"],
    answer: "and",
    explanation: "We use 'and' to join two similar ideas or add information."
  },
  {
    id: 6,
    start: "The cake was delicious",
    end: "it was too small.",
    options: ["so", "and", "but", "because"],
    answer: "but",
    explanation: "The second part of the sentence contrasts with the first."
  },
  {
    id: 7,
    start: "He was very tired,",
    end: "he went to bed early.",
    options: ["or", "but", "so", "because"],
    answer: "so",
    explanation: "Going to bed early is the result of being tired."
  },
  {
    id: 8,
    start: "I'll go for a walk",
    end: "it stops raining.",
    options: ["and", "but", "if", "or"],
    answer: "if",
    explanation: "'If' is a conjunction used for a condition."
  },
  {
    id: 9,
    start: "I don't like broccoli",
    end: "do I like spinach.",
    options: ["and", "but", "nor", "or"],
    answer: "nor",
    explanation: "'Nor' is used to connect two negative ideas together."
  },
  {
    id: 10,
    start: "It was a long journey,",
    end: "they arrived safely.",
    options: ["yet", "so", "or", "and"],
    answer: "yet",
    explanation: "'Yet' functions like 'but', showing something unexpected happened."
  },
  {
    id: 11,
    start: "We can go to the zoo",
    end: "to the park.",
    options: ["and", "but", "either", "or"],
    answer: "or",
    explanation: "Use 'or' to present a choice between two alternatives."
  },
  {
    id: 12,
    start: "I brought my umbrella",
    end: "it was forecast to rain.",
    options: ["so", "but", "because", "and"],
    answer: "because",
    explanation: "The forecast was the reason I brought the umbrella."
  },
  {
    id: 13,
    start: "The dog barked loudly",
    end: "the postman arrived.",
    options: ["when", "but", "so", "or"],
    answer: "when",
    explanation: "'When' is a conjunction used to talk about time."
  },
  {
    id: 14,
    start: "You should brush your teeth",
    end: "you go to bed.",
    options: ["after", "before", "so", "and"],
    answer: "before",
    explanation: "'Before' connects the sequence of two events."
  },
  {
    id: 15,
    start: "I'll help you",
    end: "you help me.",
    options: ["so", "and", "provided", "but"],
    answer: "provided",
    explanation: "'Provided (that)' means only if a specific condition is met."
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('conjunction-highscore');
      if (saved) setHighScore(parseInt(saved));
    } catch (e) {
      console.warn('LocalStorage access denied:', e);
    }
  }, []);

  const handleStart = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback('none');
    setSelectedOption(null);
  };

  const checkAnswer = (option: string) => {
    if (showFeedback !== 'none') return;
    
    setSelectedOption(option);
    const correct = option === QUESTIONS[currentIndex].answer;
    
    if (correct) {
      const newScore = score + 10;
      setScore(newScore);
      setShowFeedback('correct');
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('conjunction-highscore', newScore.toString());
        } catch (e) {
          console.warn('Could not save high score:', e);
        }
      }
    } else {
      setShowFeedback('wrong');
    }

    setTimeout(() => {
      if (correct) {
        if (currentIndex < QUESTIONS.length - 1) {
          setCurrentIndex(i => i + 1);
          setShowFeedback('none');
          setSelectedOption(null);
        } else {
          setGameState('end');
        }
      } else {
        setShowFeedback('none');
        setSelectedOption(null);
      }
    }, 2000);
  };

  const currentQuestion = QUESTIONS[currentIndex];

  if (gameState === 'start') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 font-sans text-slate-800">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(186,230,253,0.5)] border-4 border-white relative text-center"
        >
          <div className="absolute -top-10 -right-4 bounce-subtle bg-amber-400 p-5 rounded-3xl shadow-[0_6px_0_#D97706] transform rotate-12 border-4 border-white">
            <Link2 size={40} className="text-white" />
          </div>
          
          <h1 className="text-5xl font-black mb-4 leading-tight tracking-tighter text-sky-900">
            CONJUNCTION<br />
            <span className="text-sky-400">CONNECTOR</span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
            Master the art of joining ideas! Pick the best word to link sentences and earn massive points.
          </p>

          <div className="space-y-4">
            <button 
              onClick={handleStart}
              className="group w-full bg-emerald-400 text-white py-6 rounded-3xl text-2xl font-black shadow-[0_10px_0_#047857] hover:translate-y-1 hover:shadow-[0_6px_0_#047857] transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              Play Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            {highScore > 0 && (
              <div className="pt-4 flex items-center justify-center gap-2 text-sky-400 font-bold uppercase text-sm tracking-widest">
                <Trophy size={16} /> High Score: {highScore}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 font-sans text-slate-800">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(186,230,253,0.5)] border-4 border-white text-center"
        >
          <div className="bg-amber-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-400">
            <Trophy size={48} className="text-amber-500 drop-shadow-md" />
          </div>
          <h1 className="text-4xl font-black mb-2 text-sky-900 uppercase tracking-tighter">Awesome!</h1>
          <p className="text-lg text-slate-400 font-medium mb-10">You're a conjunction master!</p>
          
          <div className="bg-sky-50 rounded-[32px] p-8 mb-10 border-4 border-sky-100">
            <div className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Total Score</div>
            <div className="text-7xl font-black text-sky-900">{score}</div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-rose-500 text-white py-5 rounded-3xl text-xl font-black shadow-[0_8px_0_#BE123C] hover:translate-y-1 hover:shadow-[0_4px_0_#BE123C] transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            <RotateCcw /> Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  const optionColors = [
    { bg: 'bg-sky-400', shadow: 'shadow-[0_10px_0_#0369A1]', hoverShadow: 'hover:shadow-[0_6px_0_#0369A1]' },
    { bg: 'bg-rose-400', shadow: 'shadow-[0_10px_0_#BE123C]', hoverShadow: 'hover:shadow-[0_6px_0_#BE123C]' },
    { bg: 'bg-emerald-400', shadow: 'shadow-[0_10px_0_#047857]', hoverShadow: 'hover:shadow-[0_6px_0_#047857]' },
    { bg: 'bg-violet-400', shadow: 'shadow-[0_10px_0_#6D28D9]', hoverShadow: 'hover:shadow-[0_6px_0_#6D28D9]' },
  ];

  return (
    <div className="min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-400 p-3 rounded-2xl shadow-[0_4px_0_#D97706] transform -rotate-2 border-2 border-white">
              <span className="text-white font-black text-xl uppercase tracking-tighter">Level {currentIndex + 1}</span>
            </div>
            <div className="flex space-x-1">
              {QUESTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                    i < currentIndex ? 'bg-emerald-400' : 
                    i === currentIndex ? 'bg-white border-2 border-emerald-400 scale-125' : 
                    'bg-white border-2 border-slate-200'
                  }`} 
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white px-6 py-2 rounded-full border-4 border-sky-200 shadow-sm flex items-center">
            <Star className="text-amber-400 fill-amber-400 mr-2" size={18} />
            <span className="text-sky-500 font-bold mr-2 uppercase text-xs tracking-widest">Score</span>
            <span className="text-sky-900 font-black text-2xl">{score}</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative w-full mb-12">
          <div className="absolute -top-12 -left-8 bounce-subtle z-10">
            <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-sky-400 relative">
              <div className="text-3xl">🔗</div>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r-4 border-b-4 border-sky-400 rotate-45"></div>
            </div>
          </div>
          
          <motion.div 
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[40px] p-12 lg:p-20 shadow-[0_20px_50px_rgba(186,230,253,0.5)] border-4 border-white text-center relative overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-relaxed max-w-2xl">
                {currentQuestion.start}
                <motion.span 
                  animate={showFeedback === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
                  className={`inline-block min-w-[120px] h-14 md:h-16 border-b-8 border-dashed mx-4 transition-all duration-300 relative translate-y-2 text-sky-500 font-black ${
                    showFeedback === 'correct' ? 'border-emerald-400 text-emerald-500 scale-110' : 
                    showFeedback === 'wrong' ? 'border-rose-400 text-rose-500' : 
                    'border-sky-400'
                  }`}
                >
                  {selectedOption || ""}
                </motion.span>
                {currentQuestion.end}
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                {showFeedback === 'none' ? 'Choose the best word to link these ideas!' : 'Processing result...'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
          {currentQuestion.options.map((option, idx) => {
            const color = optionColors[idx % optionColors.length];
            return (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => checkAnswer(option)}
                disabled={showFeedback !== 'none'}
                className={`
                  group rounded-3xl p-6 md:p-8 transition-all relative border-4 border-transparent flex items-center justify-center
                  ${color.bg} ${color.shadow} ${color.hoverShadow}
                  ${showFeedback !== 'none' && selectedOption !== option ? 'opacity-30 grayscale cursor-not-allowed translate-y-2 shadow-none' : ''}
                  ${showFeedback === 'correct' && selectedOption === option ? 'border-white ring-8 ring-emerald-100 ring-opacity-50' : ''}
                  ${showFeedback === 'wrong' && selectedOption === option ? 'border-white ring-8 ring-rose-100 ring-opacity-50' : ''}
                  ${showFeedback === 'none' ? 'hover:translate-y-1' : ''}
                `}
              >
                <span className={`block text-white font-black uppercase tracking-tighter transition-transform group-hover:scale-110 ${
                  option.length > 6 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
                }`}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback !== 'none' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-white/80 backdrop-blur-md p-8 rounded-[32px] border-4 flex items-center space-x-6 shadow-xl ${
                showFeedback === 'correct' ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 ${
                showFeedback === 'correct' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'
              }`}>
                {showFeedback === 'correct' ? '✨' : '🧐'}
              </div>
              <div>
                <p className={`font-black text-xl uppercase tracking-tight mb-1 ${
                  showFeedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {showFeedback === 'correct' ? 'Incredible Job!' : 'Let\'s think again!'}
                </p>
                <p className="text-slate-600 font-medium">
                  {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <div className="flex justify-between items-center mt-8">
          <div className="bg-white/50 backdrop-blur px-6 py-3 rounded-2xl flex items-center space-x-3 border-2 border-white/50">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl">💡</div>
            <p className="text-indigo-900 font-bold text-sm tracking-tight capitalize">
              Conjunctions are the "glue" of sentences!
            </p>
          </div>
          <button 
            onClick={() => setGameState('start')}
            className="bg-slate-200 text-slate-600 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-300 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
