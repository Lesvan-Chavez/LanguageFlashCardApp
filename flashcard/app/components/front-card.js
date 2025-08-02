'use client'
import React from "react"

export default function FrontCard(card, onFlip) {
    return(
        <div onClick={onFlip} className="bg-green-500 text-white p-8 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition-colors duration-200 min-h-[200px] flex items-center justify-center">
            <h2 text-3xl font-bold text-gray-800>{card.spanish}</h2>

        </div>
        
    )
    
}