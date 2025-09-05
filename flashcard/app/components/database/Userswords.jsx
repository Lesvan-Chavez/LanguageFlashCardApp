'use client';
import { useEffect, useState } from 'react';
import { onAddWord, listWords, deleteWord } from '@/lib/userswords';

export default function MyWords({ targetLang = 'ES' }) {
  const [items, setItems] = useState([]);
  const [english, setEnglish] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function refresh() {
    const data = await listWords({ targetLang });
    setItems(data);
  }
  useEffect(() => {
    refresh();
  }, [targetLang]);

  async function handleAdd(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddWord({ english, targetLang, note });
      setEnglish('');
      setNote('');
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="English phrase"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <input
          className="w-60 rounded border px-3 py-2"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="rounded bg-green-600 px-4 text-white" disabled={loading || !english}>
          {loading ? 'Saving…' : 'Add'}
        </button>
      </form>

      <ul className="divide-y rounded border">
        {items.map((w) => (
          <li key={w.id} className="flex items-center justify-between p-3">
            <div>
              <div className="font-medium">
                {w.source_text} → {w.translation_text}
              </div>
              <div className="text-xs text-gray-500">
                {w.target_lang}
                {w.note ? ` • ${w.note}` : ''}
              </div>
            </div>
            <button
              onClick={() => deleteWord(w.id).then(refresh)}
              className="rounded border px-3 py-1 text-sm hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
