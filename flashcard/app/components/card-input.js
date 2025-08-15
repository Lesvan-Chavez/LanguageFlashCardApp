import React, { useState } from 'react';

export default function CustomCardCreator({ onSaveCard, onCancel }) {
  // Form state
  const [englishText, setEnglishText] = useState('');
  const [spanishText, setSpanishText] = useState('');
  const [note, setNote] = useState('');
  const [showTranslator, setShowTranslator] = useState(false);
  
  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDirection, setTranslationDirection] = useState('en-to-es');
  const [translationError, setTranslationError] = useState('');

  // Translation function
  const handleTranslate = async () => {
    const sourceText = translationDirection === 'en-to-es' ? englishText : spanishText;
    
    if (!sourceText.trim()) {
      setTranslationError('Please enter text to translate');
      return;
    }

    setIsTranslating(true);
    setTranslationError('');

    try {
      // Replace with your actual API key or use your existing /api/translate endpoint
      const apiKey = 'AIzaSyAXrQUdjp0dTvGXSLUxRNMPqJEefCXGWeU';
      const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

      const postData = {
        q: sourceText,
        source: translationDirection === 'en-to-es' ? 'en' : 'es',
        target: translationDirection === 'en-to-es' ? 'es' : 'en'
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;

      // Fill in the target field
      if (translationDirection === 'en-to-es') {
        setSpanishText(translatedText);
      } else {
        setEnglishText(translatedText);
      }

    } catch (error) {
      setTranslationError('Translation failed: ' + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  // Save card
  const handleSave = () => {
    if (!englishText.trim() || !spanishText.trim()) {
      setTranslationError('Both English and Spanish text are required');
      return;
    }

    const newCard = {
      id: Date.now(), // Simple ID generation
      text: englishText.trim(),           // For your existing structure
      translation: spanishText.trim(),    // For your existing structure  
      note: note.trim()                   // For your existing structure
    };

    onSaveCard(newCard);
    
    // Reset form
    setEnglishText('');
    setSpanishText('');
    setNote('');
    setShowTranslator(false);
    setTranslationError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Custom Flashcard</h2>

        {/* English Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            English Text
          </label>
          <input
            type="text"
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            placeholder="Enter English word or phrase"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Spanish Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spanish Translation
          </label>
          <input
            type="text"
            value={spanishText}
            onChange={(e) => setSpanishText(e.target.value)}
            placeholder="Enter Spanish translation"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Translation Helper */}
        <div className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-blue-800">🔄 Need Translation Help?</h3>
            <button
              onClick={() => setShowTranslator(!showTranslator)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {showTranslator ? 'Hide' : 'Show'} Translator
            </button>
          </div>

          {showTranslator && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Translation Direction
                </label>
                <select 
                  value={translationDirection}
                  onChange={(e) => setTranslationDirection(e.target.value)}
                  className="w-full p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en-to-es">English → Spanish</option>
                  <option value="es-to-en">Spanish → English</option>
                </select>
              </div>

              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  isTranslating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isTranslating ? 'Translating...' : '✨ Translate & Fill'}
              </button>

              {translationError && (
                <p className="text-red-600 text-sm">{translationError}</p>
              )}
            </div>
          )}
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add context, usage example, or memory hint"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: "Used as a greeting in formal situations" or "Remember: sounds like 'OH-lah'"
          </p>
        </div>

        {/* Preview Card */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <p className="text-gray-500 text-xs mb-1">Front (English):</p>
              <p className="font-medium">{englishText || "Your English text"}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded border">
              <p className="text-gray-500 text-xs mb-1">Back (Spanish + Note):</p>
              <p className="font-medium text-blue-800">{spanishText || "Your Spanish text"}</p>
              {note && <p className="text-xs text-gray-600 mt-1 italic">"{note}"</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            disabled={!englishText.trim() || !spanishText.trim()}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              englishText.trim() && spanishText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            💾 Save Card
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>💡 Tip: Fill in one language, then use the translator to get the other!</p>
        </div>
      </div>
    </div>
  );
}