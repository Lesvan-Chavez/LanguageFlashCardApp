'use client'
import React from "react";
import BackCard from "./back-card";
import FrontCard from "./front-card";

export default function FlashCardDisplay({
  card, isFlipped, onFlip, onNext, onPrevious, targetName, targetCode, loading
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 font-sans gap-6">
      <h1 className="text-5xl font-extrabold text-gray-500">English → {targetName}</h1>

      {/* NOT flipped = FRONT (English). Flipped = BACK (Translation + Hint). */}
      {isFlipped
        ? <BackCard card={card} onFlip={onFlip} targetName={targetName} targetCode={targetCode} loading={loading} />
        : <FrontCard card={card} onFlip={onFlip} />
      }

      <div className="flex gap-3">
        <button className="p-3 bg-gray-300 text-gray-800 font-bold rounded-full shadow hover:bg-gray-400" onClick={onPrevious}>Previous</button>
        <button className="p-3 bg-blue-500 text-white font-bold rounded-full shadow hover:bg-blue-600" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
