import { useState } from "react";
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
}

}

const handlePrevious = () => {
if (cardIndex > 0 ) {
    setCardIndex (cardIndex - 1)
}
}
}