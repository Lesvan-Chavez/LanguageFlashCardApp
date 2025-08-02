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

  <button className="p-4 bg-gray-300 text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-400 transition-colors duration-200"  onClick={onPrevious}></button>        
  <button className="p-4 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200" onClick={onNext}></button>        
  
                         
    </div>



    )
}