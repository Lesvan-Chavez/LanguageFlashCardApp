import { createClient } from "@supabase/supabase-js";
import React from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler (req, res) {
    
    if(req.method !== 'POST') {
         return res.status(405).json({ error: 'Method not allowed' });
    }
    const {original_word, translated_word, source_language, target_language,} = req.body
      
    try{
         //const { data: { user }, error: authError } = await supabase.auth.getUser();
    const {data, error} = await supabase
      .from ('flashcard-input')
      .insert ([{
        original_word,
        translated_word,
        source_language,
        target_language,
        //user_id

      }]);
      if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Flashcard saved successfully', data });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save flashcard' });
  }

  
}


  