'use client';
import React, { useEffect, useMemo, useState } from 'react';
import AIFlashCardDisplay from './ai-flashcards';
import AILanguagePicker from './ai-language-picker';
import AIDeckPicker from './ai-deck-picker';
import { PREBUILT_DECKS } from '@/app/ai/prebuilt-decks';

export default function AIFlashcardContainer() {
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

  // RESILIENT EFFECT
  useEffect(() => {
    let cancelled = false;

    async function buildAndTranslate() {
      setLoading(true);
      try {
        const baseItems = Array.isArray(deck?.items) ? deck.items : [];
        const base = baseItems.map((item, i) => ({
          id: i + 1,
          english: item.text,
          note: item.note || '',
          translation: '',
          _lastTarget: target.code,
        }));

        // Show base immediately so card count is correct even if translation fails
        setCards(base);
        setCardIndex(0);
        setIsFlipped(false); // keep your behavior on deck/lang change

        if (base.length === 0) return;

        const results = await Promise.allSettled(
          base.map(async (c) => {
            const cached = getCached(c.english, target.code);
            if (cached) return cached;

            const r = await fetch('/ai/ai-translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ q: c.english, source: 'EN', target: target.code }),
            });

            if (!r.ok) {
              const body = await r.text().catch(() => '');
              console.error('translate failed', r.status, body);
              throw new Error(`translate ${r.status}`);
            }

            const j = await r.json();
            const text = j?.text || '';
            setCached(c.english, target.code, text);
            return text;
          })
        );

        if (cancelled) return;

        const merged = base.map((c, i) =>
          results[i].status === 'fulfilled'
            ? { ...c, translation: results[i].value }
            : c
        );

        setCards(merged);
      } catch (err) {
        console.error('buildAndTranslate error', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    buildAndTranslate();
    return () => {
      cancelled = true;
    };
  }, [deck?.slug, target.code]);

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
        <AIDeckPicker decks={PREBUILT_DECKS} valueSlug={deckSlug} onChange={setDeckSlug} />
        <AILanguagePicker value={target} onChange={setTarget} />
      </div>

      <div className="text-sm text-gray-600">
        {deck?.title ?? 'Deck'} • {cards.length} cards • English → {target.name}
      </div>

      <AIFlashCardDisplay
        card={cards[cardIndex] || { english: '', translation: '', note: '' }}
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
