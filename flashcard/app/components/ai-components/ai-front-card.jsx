'use client';
import React from 'react';

export default function AIFrontCard({ card, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="relative flex min-h-[300px] w-96 cursor-pointer items-center justify-center rounded-lg bg-white p-8 text-gray-800 shadow-lg transition-colors duration-200 hover:bg-blue-50"
    >
      <div className="absolute left-4 top-3 text-xs text-gray-400">Front • English</div>
      <h2 className="text-center text-2xl font-bold">{card.english}</h2>
    </div>
  );
}
