'use client';
import React from 'react';
import AIBackCard from './ai-back-card';
import AIFrontCard from './ai-front-card';

export default function AIFlashCardDisplay({
  card,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
  targetName,
  targetCode,
  loading,
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 p-4 font-sans">
      <h1 className="text-5xl font-extrabold text-gray-500">English → {targetName}</h1>

      {/* NOT flipped = FRONT (English). Flipped = BACK (Translation + Hint). */}
      {isFlipped ? (
        <AIBackCard
          card={card}
          onFlip={onFlip}
          targetName={targetName}
          targetCode={targetCode}
          loading={loading}
        />
      ) : (
        <AIFrontCard card={card} onFlip={onFlip} />
      )}

      <div className="flex gap-3">
        <button
          className="rounded-full bg-gray-300 p-3 font-bold text-gray-800 shadow hover:bg-gray-400"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="rounded-full bg-blue-500 p-3 font-bold text-white shadow hover:bg-blue-600"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
