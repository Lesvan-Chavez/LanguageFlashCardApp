import React from "react";
import { useState } from "react";

export default function UserInputForm() {
  const [word, setWord] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!word.trim()) {
      alert('Please enter a word to translate');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Get translation from Google
      const translateResponse = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: word.trim(),
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage
        })
      });

      if (!translateResponse.ok) {
        throw new Error('Translation failed');
      }

      const translateData = await translateResponse.json();
      console.log('Translation result:', translateData);

      // Step 2: Save to Supabase database
      const saveResponse = await fetch('/api/flashcard-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          original_word: word.trim(),
          translated_word: translateData.translatedText,
          source_language: sourceLanguage,
          target_language: targetLanguage
        })
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        console.error('Save error:', errorData);
        throw new Error('Failed to save flashcard');
      }

      const saveData = await saveResponse.json();
      console.log('Save result:', saveData);

      // Success - both operations completed
      setWord('');
      alert('Flashcard created successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Flashcard
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-1">
            Word to Translate
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Creating Flashcard...' : 'Add Flashcard'}
        </button>
      </form>
    </div>
  );
}
