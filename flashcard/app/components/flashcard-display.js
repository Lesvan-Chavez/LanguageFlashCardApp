
export default function flashCardDisplay({card, isFlipped, onFlip, onNext, onPrevious }) {
    return (
     <div>
        <h1>Spanish Flashcards</h1>
        
         {isFlipped ? 
        <BackCard card={card} onFlip={onFlip} /> : 
        <FrontCard card={card} onFlip={onFlip} />
      }
 
   <button onClick={onNext}></button>        
   <button onClick={onPrevious}></button>        
                    
        
        
    </div>



    )
}