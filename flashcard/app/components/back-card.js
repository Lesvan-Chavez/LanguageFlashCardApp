'use client'
import React from "react"

export default function BackCard({card, onFlip}) {
    return(
        <div onClick={onFlip} className="bg-green-500 text-white p-8 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition-colors duration-200 min-h-[200px] flex items-center justify-center">
            <h2 className="text-2xl font-bold text-center">{card.english}</h2>

        </div>
        
    )
    
}