'use client'
import React from "react"
import BackCard from "./back-card"
import FrontCard from "./front-card"

export default function FlashCardDisplay({card, isFlipped, onFlip, onNext, onPrevious }) {
    return (
     <div>
        <h1>Spanish Flashcards</h1>
        
         {isFlipped ? 
        <BackCard card={card} onFlip={onFlip} /> : 
        <FrontCard card={card} onFlip={onFlip} />
      }
 
   <button onClick={onNext}>Next</button>        
   <button onClick={onPrevious}>Previous</button>        
                    
        
        
    </div>



    )
}