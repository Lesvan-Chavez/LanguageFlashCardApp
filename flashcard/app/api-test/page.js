'use client'; // This directive is necessary for client-side components

import { useState, useEffect } from 'react';

/**
 * A client component that tests a REST API by making a POST request.
 * This example uses the Google Translate API endpoint.
 * It displays the loading state, the success message from the API, or any errors.
 */
export default function ApiRouteTester() {
  // State variables to manage the UI based on the API call's status.
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // The useEffect hook runs once when the component first mounts.
  useEffect(() => {
    // This is the full URL for the external REST API endpoint.
    // Replace 'your_api_key_here' with your actual API key from Google Cloud Console.
    const apiKey = GOOGLE_TRANSLATE_API_KEY=your_api_key_here;
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    // The data you want to send in the body of the POST request.
    // This is a sample payload for the Google Translate API.
    const postData = {
      q: 'Hello, how are you?', // The text to translate
      target: 'es', // The target language (Spanish)
      source: 'en' // The source language (English)
    };

    // Use the fetch API to make the asynchronous POST request.
    fetch(apiUrl, {
      method: 'POST', // Specify the method as POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData), // Convert the data object to a JSON string
    })
    .then(response => {
      // Check if the response status is within the success range (200-299).
      if (!response.ok) {
        // If not, throw an error to be caught by the .catch() block.
        // The error will include the HTTP status code for debugging.
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response body.
    })
    .then(data => {
      // If the request was successful, update the state with the response data.
      setResponseMessage(data);
      setIsLoading(false);
    })
    .catch(error => {
      // If there's an error, log it to the console and update the error state.
      console.error('Error fetching data:', error);
      setError(error.message);
      setIsLoading(false);
    });
  }, []); // The empty array [] ensures this effect runs only once.

  // Conditional rendering based on the component's state.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 border border-red-400 text-red-700 rounded">
        <h3 className="font-bold text-lg mb-2">Error:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-green-100 border border-green-400 text-green-700 rounded">
      <h3 className="font-bold text-lg mb-2">API Route Test Results:</h3>
      <pre className="mt-2 p-4 bg-white rounded text-sm overflow-auto">
        {JSON.stringify(responseMessage, null, 2)}
      </pre>
    </div>
  );
}

