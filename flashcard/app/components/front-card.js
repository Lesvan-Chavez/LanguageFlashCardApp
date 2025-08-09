'use client'
import React from "react";

export default function FrontCard({ card, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="relative bg-white text-gray-800 p-8 rounded-lg shadow-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 min-h-[300px] w-96 flex items-center justify-center"
    >
      <div className="absolute top-3 left-4 text-xs text-gray-400">Front • English</div>
      <h2 className="text-2xl font-bold text-center">{card.english}</h2>
    </div>
  );
}
