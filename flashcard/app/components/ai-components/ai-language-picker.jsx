'use client';
import { useEffect, useState } from 'react';

export default function AILanguagePicker({ value, onChange }) {
  const [langs, setLangs] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/ai/ai-languages');
        const j = await r.json();
        if (j.error) throw new Error(j.error);
        setLangs(j);
      } catch (e) {
        setErr(e.message || 'Failed to load languages');
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-white">Languages</label>
      <select
        className="rounded-xl border p-2"
        value={value?.code || ''}
        onChange={(e) => {
          const code = e.target.value;
          const name = langs.find((l) => l.language === code)?.name || code;
          onChange({ code, name });
        }}
      >
        {langs.map((l) => (
          <option key={l.language} value={l.language}>
            {l.name} ({l.language})
          </option>
        ))}
      </select>
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}
