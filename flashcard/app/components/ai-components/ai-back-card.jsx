'use client';
import React, { useEffect, useState } from 'react';

export default function AIBackCard({ card, onFlip, targetName, targetCode, loading }) {
  const [showHint, setShowHint] = useState(false);

  // Reset hint whenever we switch to a new card or language
  useEffect(() => {
    setShowHint(false);
  }, [card?.id, targetCode]);

  return (
    <div
      onClick={onFlip}
      className="relative flex min-h-[300px] w-96 cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-8 text-gray-800 shadow-lg transition-colors duration-200 hover:bg-green-50"
    >
      <div className="absolute left-4 top-3 text-xs text-gray-400">Back • {targetName}</div>
      <div className="absolute right-4 top-3 text-xs text-gray-500">{targetCode}</div>

      <h2 className="text-center text-2xl font-bold">
        {loading ? 'Translating…' : card.translation || '—'}
      </h2>

      {!!card.note && (
        <div className="mt-4">
          {showHint ? (
            <p className="text-center text-sm text-gray-500">{card.note}</p>
          ) : (
            <button
              className="rounded-full bg-gray-900 px-3 py-1 text-sm text-white hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation(); // don’t flip when revealing hint
                setShowHint(true);
              }}
            >
              Hint
            </button>
          )}
        </div>
      )}
    </div>
  );
}
