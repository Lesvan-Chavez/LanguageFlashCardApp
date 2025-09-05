import React from 'react';
import { useState } from 'react';

export default function UserInputForm() {
  const [word, setWord] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
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
          targetLanguage: targetLanguage,
        }),
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_word: word.trim(),
          translated_word: translateData.translatedText,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        }),
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
    <div className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Add New Flashcard</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="word" className="mb-1 block text-sm font-medium text-gray-700">
            Word to Translate
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="sourceLanguage" className="mb-1 block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label htmlFor="targetLanguage" className="mb-1 block text-sm font-medium text-gray-700">
            To
          </label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Creating Flashcard...' : 'Add Flashcard'}
        </button>
      </form>
    </div>
  );
}
