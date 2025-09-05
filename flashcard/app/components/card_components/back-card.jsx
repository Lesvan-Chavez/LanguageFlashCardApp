'use client';
import React from 'react';

export default function BackCard({ card, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="flex min-h-[300px] w-96 cursor-pointer items-center justify-center rounded-lg bg-white p-8 text-gray-800 shadow-lg transition-colors duration-200 hover:bg-green-600"
    >
      <h2 className="text-center text-2xl font-bold">{card.english}</h2>
    </div>
  );
}
