
export default function flashCardDisplay() {
    return (
        <div>
            <h1>Spanish Flashcards</h1>
              <div onClick={handleFlip}>{isFlipped ? 
              cards[cardIndex].english : cards[cardIndex].spanish}
               
                </div>
                <button onClick={OnNext}></button>        
                <button onClick={onPrevious}></button>        
                <button onClick={OnNeedWork}></button>        
        
        
              </div>



    )
}