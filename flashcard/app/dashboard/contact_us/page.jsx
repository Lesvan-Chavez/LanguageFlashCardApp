
import React from "react";

import AboutCarousel from "../../components/contact_components/contact_us_component";


export default async function AboutPage({ searchParams }) {  
  const sp = await searchParams;
  const raw = Array.isArray(sp?.person) ? sp.person[0] : sp?.person;
  const p = parseInt(raw ?? "1", 10);
  const initialIndex = Number.isFinite(p) ? Math.max(0, p - 1) : 0;
  return (
    <>
      <main className="bg-gray min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mt-12 mb-6">
            Meet The Syntax Diplomats
          </h1>
          <AboutCarousel initialIndex={initialIndex} />
        </div>
      </main>
    </>
  );
}
