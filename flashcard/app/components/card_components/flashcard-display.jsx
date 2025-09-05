'use client';
import React from 'react';
import BackCard from './back-card';
import FrontCard from './front-card';

export default function FlashCardDisplay({ card, isFlipped, onFlip, onNext, onPrevious }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 font-sans">
      <h1 className="mb-10 text-5xl font-extrabold text-gray-500">Spanish Flashcards</h1>

      {isFlipped ? (
        <BackCard card={card} onFlip={onFlip} />
      ) : (
        <FrontCard card={card} onFlip={onFlip} />
      )}

      <button
        className="rounded-full bg-gray-300 p-4 font-bold text-gray-800 shadow-lg transition-colors duration-200 hover:bg-gray-400"
        onClick={onPrevious}
      >
        Previous
      </button>
      <button
        className="rounded-full bg-blue-500 p-4 font-bold text-white shadow-lg transition-colors duration-200 hover:bg-blue-600"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
