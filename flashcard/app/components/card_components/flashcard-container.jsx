'use client'
import React from "react";
import { useState } from "react";
import FlashCardDisplay from "./flashcard-display";

export default function FlashcardContainer () {

    const [cards, setCards] = useState([
  {id: 1, spanish: "Hola", english: "Hello"},
  {id: 2, spanish: "Gracias", english: "Thank you"}
]);

const [cardIndex, setCardIndex] = useState(0);
const [isFlipped, setIsFlipped] = useState(false);

const handleFlip = () => {
setIsFlipped(!isFlipped)
}

const handleNext = () => {
if (cardIndex < cards.length - 1) {
    setCardIndex(cardIndex + 1)
    setIsFlipped(false)                // resets badk to spanish
}

}

const handlePrevious = () => {
if (cardIndex > 0 ) {
    setCardIndex (cardIndex - 1)
    setIsFlipped(false)              // resets back to spanish
}
}

 return (
    <FlashCardDisplay
      card={cards[cardIndex]}    // Prop passing the current card object
      isFlipped={isFlipped}      // Prop passing the flip state
      onFlip={handleFlip}        // Prop passing the flip function
      onNext={handleNext}        // Prop passing the next function  
      onPrevious={handlePrevious} // Prop passing the previous function
    />
  );
}
//testing