'use client';
import React from 'react';

export default function FrontCard({ card, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="flex min-h-[300px] w-96 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-gray-800 shadow-lg transition-colors duration-200 hover:bg-green-600"
    >
      <h2 className="text-3xl font-bold text-gray-800">{card.spanish}</h2>
    </div>
  );
}
