import React from "react";
import { useState } from "react";

export default function UserInputForm() {
  const [word, setWord] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fixed: Added missing comma and proper array structure
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
      // ✅ Fixed: translateRespone → translateResponse
      const translateResponse = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: word.trim(),
          from: sourceLanguage,
          to: targetLanguage
        })
      });

      if (!translateResponse.ok) {
        throw new Error('Translation failed');
      }

      const translateData = await translateResponse.json();
      
      // ✅ Success actions moved inside try block
      setWord('');
      alert('Flashcard created successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
}
  return(

  )