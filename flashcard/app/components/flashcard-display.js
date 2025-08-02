
export default function flashCardDisplay({card, isFlipped, onFlip, onNext, onPrevious }) {
    return (
        <div>
            <h1>Spanish Flashcards</h1>
              <div onClick={onFlip}>{isFlipped ? 
              card[cardIndex].english : card[cardIndex].spanish}
               
                </div>
                <button onClick={onNext}></button>        
                <button onClick={onPrevious}></button>        
                <button onClick={OnNeedWork}></button>        
        
        
              </div>



    )
}