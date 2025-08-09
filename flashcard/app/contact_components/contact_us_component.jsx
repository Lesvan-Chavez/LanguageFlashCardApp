"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const people = [
  { id: 1, name: "Aaron Franklin", role: "Founder & CEO", bio: "Testing", image: "/team/alice.jpg" },
  { id: 2, name: "Lesvan Chavez",  role: "Lead Developer", bio: "…", image: "/team/bob.jpg" },
  { id: 3, name: "Brittany Pizarro", role: "Product Designer", bio: "…", image: "/team/cara.jpg" },
];

// Pure horizontal slide (no scale, no vertical)
const variants = {
  enter: (dir) => ({ x: dir > 0 ? 160 : -160, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 160 : -160, opacity: 0 }),
};

export default function AboutCarousel() {
  // read initial from URL (1-based), but DON'T use Next router to sync each change
  const initialFromURL = (() => {
    if (typeof window === "undefined") return 0;
    const p = parseInt(new URL(window.location.href).searchParams.get("person") || "1", 10);
    return ((p - 1 + people.length) % people.length + people.length) % people.length;
  })();

  const [[index, direction], setIndex] = useState([initialFromURL, 0]);

  const setUrlParamWithoutRerender = useCallback((i) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("person", String(i + 1)); // 1-based in URL
    // Use History API so the App Router doesn't re-render the page/layout
    window.history.replaceState(null, "", url.toString());
  }, []);

  useEffect(() => {
    setUrlParamWithoutRerender(index);
  }, [index, setUrlParamWithoutRerender]);

  const paginate = useCallback((dir) => {
    setIndex(([prev]) => [ (prev + dir + people.length) % people.length, dir ]);
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft")  paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  // simple swipe
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const threshold = 50;
    const down = (e) => {
      draggingRef.current = true;
      startXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const up = (e) => {
      if (!draggingRef.current) return;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const delta = endX - startXRef.current;
      if (delta > threshold) paginate(-1);
      else if (delta < -threshold) paginate(1);
      draggingRef.current = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchend", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchend", up);
    };
  }, [paginate]);

  const person = people[index];

  return (
    <div className="relative max-w-4xl mx-auto py-16 px-6">
      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow focus:outline-none"
      >
        ←
      </button>
      <button
        aria-label="Next"
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow focus:outline-none"
      >
        →
      </button>

      {/* FIXED HEIGHT wrapper → no vertical motion or reflow */}
      <div
        ref={containerRef}
        className="
          relative overflow-hidden
          bg-white rounded-xl shadow-xl
          h-[520px] md:h-[420px]   /* pick a height tall enough for your tallest card */
          p-8
        "
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={person.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 w-full md:w-1/3 h-56 md:h-full">
              <img
                src={person.image}
                alt={person.name}
                className="rounded-lg object-cover w-full h-full shadow"
                loading="lazy"
              />
            </div>

            <div className="md:w-2/3 space-y-4 overflow-auto pr-1">
              <div>
                <div className="text-sm uppercase text-green-700 font-semibold">
                  {person.role}
                </div>
                <h2 className="text-4xl font-bold">{person.name}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{person.bio}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => paginate(-1)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-500 mt-2">
                {index + 1} of {people.length}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {people.map((p, idx) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.name}`}
            onClick={() => setIndex([idx, idx > index ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition ${idx === index ? "bg-green-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
