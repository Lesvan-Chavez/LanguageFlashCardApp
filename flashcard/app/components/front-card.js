'use client'
import React from "react"

export default function FrontCard(card, onFlip) {
    return(
        <div onClick={onFlip} className="card front">
            <h2>{card.spanish}</h2>

        </div>
        
    )
    
}