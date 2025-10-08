import { createClient } from '@supabase/supabase-js';
import { PREBUILT_DECKS } from '../app/data/prebuilt-decks.js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);


async function upsertDeck({ slug, title, from_lang = 'en', to_lang = '*', description = null }) {
    const { data, error } = await supabase
    .from('prebuilt_decks')
    .upsert(
        { slug, title, from_lang, to_lang, description, is_active: true },
        { onConflict: 'slug' }
    )
    .select('id, slug')
    .single();

    if (error) throw new Error(`Deck upsert failed (${slug}): ${error.message}`);
        return data.id;
}


async function upsertCard(deck_id, { text, note }) {
    const { error } = await supabase
    .from('prebuilt_cards')
    .upsert(
        { deck_id, term: text, translation: null, note },
        { onConflict: 'deck_id,term' }
    );

    if (error) throw new Error(`Card upsert failed (${text}): ${error.message}`);
}


async function main() {
    for (const deck of PREBUILT_DECKS) {
    const deckId = await upsertDeck({
        slug: deck.slug,
        title: deck.title,
        from_lang: deck.from_lang ?? 'en',
        to_lang: deck.to_lang ?? '*',
        description: deck.description ?? null,
    });

    for (const item of deck.items) {
        await upsertCard(deckId, item);
    }

    console.log(`Seeded deck: ${deck.title} (${deck.slug})`);
    }

    console.log('Seeding complete');
}

main().catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
});
