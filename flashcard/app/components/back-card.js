import React from "react"

export default function BackCard(card, onFlip) {
    return(
        <div onClick={onFlip} className="card back">
            <h2>{card.english}</h2>

        </div>
        
    )
    
}