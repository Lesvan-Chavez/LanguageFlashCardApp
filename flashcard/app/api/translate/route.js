import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text, targetLanguage, sourceLanguage = 'auto' } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Text and target language are required' }, { status: 400 });
    }

    if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
      return NextResponse.json(
        { error: 'Google Translate API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage,
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Translate API error:', errorData);
      return NextResponse.json({ error: 'Translation failed' }, { status: response.status });
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    const detectedLanguage = data.data.translations[0].detectedSourceLanguage;

    return NextResponse.json({
      translatedText,
      detectedLanguage,
      sourceText: text,
      targetLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
