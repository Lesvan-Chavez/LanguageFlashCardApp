'use client'
import React, { useEffect, useState } from "react";

export default function BackCard({ card, onFlip, targetName, targetCode, loading }) {
  const [showHint, setShowHint] = useState(false);

  // Reset hint whenever we switch to a new card or language
  useEffect(() => { setShowHint(false); }, [card?.id, targetCode]);

  return (
    <div
      onClick={onFlip}
      className="relative bg-white text-gray-800 p-8 rounded-lg shadow-lg cursor-pointer hover:bg-green-50 transition-colors duration-200 min-h-[300px] w-96 flex flex-col items-center justify-center"
    >
      <div className="absolute top-3 left-4 text-xs text-gray-400">Back • {targetName}</div>
      <div className="absolute top-3 right-4 text-xs text-gray-500">{targetCode}</div>

      <h2 className="text-2xl font-bold text-center">
        {loading ? "Translating…" : (card.translation || "—")}
      </h2>

      {!!card.note && (
        <div className="mt-4">
          {showHint ? (
            <p className="text-sm text-gray-500 text-center">{card.note}</p>
          ) : (
            <button
              className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();     // don’t flip when revealing hint
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
