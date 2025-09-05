'use client';
import { useMemo } from 'react';

export default function AIDeckPicker({ decks, valueSlug, onChange }) {
  const options = useMemo(() => decks.map((d) => ({ slug: d.slug, title: d.title })), [decks]);
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-white">Pre-Built Decks</label>
      <select
        className="rounded-xl border p-2"
        value={valueSlug}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.slug} value={opt.slug}>
            {opt.title}
          </option>
        ))}
      </select>
    </div>
  );
}
