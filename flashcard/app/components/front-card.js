'use client'
import React from "react"

export default function FrontCard({card, onFlip}) {
    return(
        <div onClick={onFlip} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg cursor-pointer hover:bg-green-600 transition-colors duration-200 min-h-[300px] w-96 flex items-center justify-center border border-gray-200">
            <h2 className= "text-3xl font-bold text-gray-800">{card.spanish}</h2>

        </div>
        
    )
    
}