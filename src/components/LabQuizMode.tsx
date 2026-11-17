import React, { useState } from 'react';
import { QuizQuestion, BotanicalSample } from '../types';
import { QUIZ_QUESTIONS } from '../data/samplesData';
import { HelpCircle, CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface LabQuizModeProps {
  currentSample: BotanicalSample;
  onNavigateToQuestionSetup?: (question: QuizQuestion) => void;
}

export const LabQuizMode: React.FC<LabQuizModeProps> = ({ currentSample, onNavigateToQuestionSetup }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const sampleQuestions = QUIZ_QUESTIONS.filter((q) => q.sampleId === currentSample.id);
  const activeQuestion = sampleQuestions[currentIdx] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === activeQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentIdx < sampleQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="bg-[#12151B] border border-slate-800 rounded-lg p-4 shadow-xl text-slate-300 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Practical Exam Quiz</h3>
            <p className="text-[10px] text-slate-500 font-mono">LAB EXAMINATION VERIFICATION</p>
          </div>
        </div>

        <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
          SCORE: {score}
        </span>
      </div>

      {activeQuestion ? (
        <div className="space-y-3 text-xs">
          <div className="bg-[#0A0C10] p-3 rounded border border-slate-800">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono block mb-1">
              Question {currentIdx + 1} of {sampleQuestions.length || 1}
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">{activeQuestion.prompt}</p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === activeQuestion.correctAnswer;

              let optionBg = 'bg-[#0A0C10] border-slate-800 text-slate-300 hover:bg-slate-800/80';
              if (isSubmitted) {
                if (isCorrect) optionBg = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                else if (isSelected && !isCorrect) optionBg = 'bg-rose-500/20 border-rose-500 text-rose-200';
              } else if (isSelected) {
                optionBg = 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-2.5 rounded border transition-all flex items-center justify-between text-xs ${optionBg}`}
                >
                  <span className="leading-snug">{option}</span>
                  {isSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isSubmitted && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block font-mono">Instructor Diagnostic</span>
              <p className="text-emerald-200 text-[11px] leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold uppercase tracking-wider rounded text-xs disabled:opacity-50 transition-colors shadow-md"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold uppercase tracking-wider rounded text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-500 text-xs font-mono">
          Select a syllabus drug sample to start its practical quiz.
        </div>
      )}
    </div>
  );
};
