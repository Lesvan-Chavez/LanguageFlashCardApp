"use client";


//Probably deleting or turning into an about me page


import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const people = [
  { id: 1, name: "Aaron Franklin", role: "Fullstack Developer", bio: "Worked On: Card Display, Database for cards, API for the translation", image: "Aaron-Profile.png" },
  { id: 2, name: "Lesvan Chavez",  role: "Fullstack Developer", bio: "Worked On: Home Page, About Us Page, AI for the Pre-built Decks", image: "Lesvan-Profile.png" },
  { id: 3, name: "Brittany Pizarro", role: "Fullstack Developer", bio: "Worked On: Login Page, Login Authentication, Card Dashboard", image: "Brittany-Profile.png" },
];

// horizontal slide (treat dir=0 as "no slide")
const variants = {
  enter: (dir = 0) => ({ x: dir === 0 ? 0 : dir > 0 ? 160 : -160, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir = 0) => ({ x: dir === 0 ? 0 : dir < 0 ? 160 : -160, opacity: 0 }),
};

export default function AboutCarousel({ initialIndex = 0 }) {
  const normalize = (i) => ((i % people.length) + people.length) % people.length;

  const [[index, direction], setIndex] = useState([normalize(initialIndex), 0]);

  // keep ?person= synced after mount 
  const hasMounted = useRef(false);
  useEffect(() => { hasMounted.current = true; }, []);
  useEffect(() => {
    if (!hasMounted.current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("person", String(index + 1));
    window.history.replaceState(null, "", url.toString());
  }, [index]);

  const paginate = useCallback((dir) => {
    setIndex(([prev]) => [ normalize(prev + dir), dir ]);
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
      <div
        ref={containerRef}
        className="
          relative overflow-hidden
          bg-white rounded-xl shadow-xl
          h-[520px] md:h-[420px]
          p-8
        "
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={person.id}
            custom={direction}
            variants={variants}
            initial={direction === 0 ? false : "enter"}  
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
            className="absolute inset-0 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex w-full md:w-1/3 h-56 md:h-full items-center justify-center">
              <img
                src={`/${person.image}`}
                alt={person.name}
                className="shadow rounded-xl max-w-full max-h-full object-contain"
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

      <div className="flex justify-center gap-3 mt-8">
        {people.map((p, idx) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.name}`}
            onClick={() => setIndex([ normalize(idx), idx > index ? 1 : -1 ])}
            className={`w-3 h-3 rounded-full transition ${idx === index ? "bg-green-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
