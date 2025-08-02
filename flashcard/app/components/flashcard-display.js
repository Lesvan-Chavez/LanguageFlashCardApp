'use client'
import React from "react"
import BackCard from "./back-card"
import FrontCard from "./front-card"

export default function FlashCardDisplay({card, isFlipped, onFlip, onNext, onPrevious }) {
    return (
     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 font-sans">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-10">Spanish Flashcards</h1>
        
         {isFlipped ? 
        <BackCard card={card} onFlip={onFlip} /> : 
        <FrontCard card={card} onFlip={onFlip} />
      }
 
   <button onClick={onNext}></button>        
   <button onClick={onPrevious}></button>        
                    
        
        
    </div>



    )
}