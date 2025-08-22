import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request) {
  try {
    const { original_word, translated_word, source_language, target_language } = await request.json();

    // Add validation
    if (!original_word || !translated_word) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting to insert:', {
      original_word,
      translated_word,
      source_language,
      target_language
    });

    const { data, error } = await supabase
      .from('flashcard-input')  // Make sure this matches your table name
      .insert([{
        original_word,
        translated_word,
        source_language,
        target_language
      }]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save flashcard', details: error.message },
        { status: 500 }
      );
    }

    console.log('Successfully inserted:', data);
    return NextResponse.json({
      message: 'Flashcard saved successfully',
      data
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save flashcard', details: error.message },
      { status: 500 }
    );
  }
}

  