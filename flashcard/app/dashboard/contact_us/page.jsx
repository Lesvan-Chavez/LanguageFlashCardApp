import React from 'react';

import AboutCarousel from '@/app/components/contact_components/contact_us_component';

export default async function AboutPage({ searchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.person) ? sp.person[0] : sp?.person;
  const p = parseInt(raw ?? '1', 10);
  const initialIndex = Number.isFinite(p) ? Math.max(0, p - 1) : 0;
  return (
    <>
      <main className="bg-gray min-h-screen">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 mt-12 text-center text-5xl font-bold">Meet The Syntax Diplomats</h1>
          <AboutCarousel initialIndex={initialIndex} />
        </div>
      </main>
    </>
  );
}
