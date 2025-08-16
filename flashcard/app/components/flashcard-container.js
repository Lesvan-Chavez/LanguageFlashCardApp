'use client';
import React, { useEffect, useMemo, useState } from 'react';
import FlashcardDisplay from './flashcard-display';
import LanguagePicker from './language-picker';
import DeckPicker from './deck-picker';
import { PREBUILT_DECKS } from '../api/deck-data/prebuilt-decks';

export default function FlashcardContainer() {
  // pick a default deck & language
  const [deckSlug, setDeckSlug] = useState(PREBUILT_DECKS[0].slug);
  const deck = useMemo(() => PREBUILT_DECKS.find(d => d.slug === deckSlug), [deckSlug]);
  const [target, setTarget] = useState({ code: 'ES', name: 'Spanish' });

  // card state / UI
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // front=English, back=Translation+Hint
  const [loading, setLoading] = useState(false);

  // simple localStorage cache
  const keyFor = (eng, tgt) => `trl:${tgt}:${eng.toLowerCase()}`;
  const getCached = (eng, tgt) =>
    typeof window !== 'undefined' ? localStorage.getItem(keyFor(eng, tgt)) : null;
  const setCached = (eng, tgt, val) =>
    typeof window !== 'undefined' ? localStorage.setItem(keyFor(eng, tgt), val) : undefined;

  // ⬇️ PASTE THE EFFECT HERE (replaces your old effects)
  useEffect(() => {
    let cancelled = false;

    async function buildAndTranslate() {
      setLoading(true);

      // 1) Build base cards from the selected deck
      const base = deck.items.map((item, i) => ({
        id: i + 1,
        english: item.text,
        note: item.note || '',
        translation: '',
        _lastTarget: target.code,
      }));

      // 2) Translate (use cache when available)
      const translated = await Promise.all(
        base.map(async (c) => {
          const cached = getCached(c.english, target.code);
          if (cached) return { ...c, translation: cached };

          const r = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: c.english, source: 'EN', target: target.code }),
          });
          const j = await r.json();
          const text = j?.text || '';
          setCached(c.english, target.code, text);
          return { ...c, translation: text };
        })
      );

      if (!cancelled) {
        setCards(translated);
        setCardIndex(0);
        setIsFlipped(false); // reset to English (front) when deck or language changes
        setLoading(false);
      }
    }

    buildAndTranslate();
    return () => {
      cancelled = true;
    };
  }, [deck.slug, target.code]);
  // ⬆️ END EFFECT

  // keep same side when navigating (don’t reset isFlipped here)
  const handleNext = () => {
    if (cardIndex < cards.length - 1) setCardIndex(i => i + 1);
  };
  const handlePrevious = () => {
    if (cardIndex > 0) setCardIndex(i => i - 1);
  };
  const handleFlip = () => setIsFlipped(f => !f);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <DeckPicker decks={PREBUILT_DECKS} valueSlug={deckSlug} onChange={setDeckSlug} />
        <LanguagePicker value={target} onChange={setTarget} />
      </div>

      <div className="text-sm text-gray-600">
        {deck.title} • {cards.length} cards • English → {target.name}
      </div>

      <FlashcardDisplay
        card={cards[cardIndex] || { english: '', translation: '' }}
        isFlipped={isFlipped}
        onFlip={handleFlip}
        onNext={handleNext}
        onPrevious={handlePrevious}
        targetName={target.name}
        targetCode={target.code}
        loading={loading}
      />
    </div>
  );
}
