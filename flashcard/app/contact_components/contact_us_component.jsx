"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const people = [
  {
    id: 1,
    name: "Aaron Franklin",
    role: "Founder & CEO",
    bio: "I build language learning tools that feel personal. My background is in linguistics and full-stack engineering.",
    image: "/team/alice.jpg",
  },
  {
    id: 2,
    name: "Lesvan Chavez",
    role: "Lead Developer",
    bio: "I focus on performance and smooth UX. I believe learning should be playful and adaptive.",
    image: "/team/bob.jpg",
  },
  {
    id: 3,
    name: "Brittany Pizarro",
    role: "Product Designer",
    bio: "Design meets empathy. I help shape interfaces that feel intuitive and joyful.",
    image: "/team/cara.jpg",
  },
];

// animation variants
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function AboutCarousel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialParam = parseInt(searchParams.get("person") || "1", 10);
  const normalizeIndex = (i) => {
    // convert 1-based param to 0-based index with wrap
    return ((i - 1 + people.length) % people.length + people.length) % people.length;
  };

  // state stores [index, direction]
  const [[index, direction], setIndex] = useState([normalizeIndex(initialParam), 0]);

  // keep URL in sync when index changes
  useEffect(() => {
    const personParam = index + 1; // expose 1-based
    const search = new URLSearchParams(Array.from(searchParams.entries()));
    search.set("person", String(personParam));
    router.replace(`?${search.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // handle external query param changes (back/forward)
  useEffect(() => {
    const param = parseInt(searchParams.get("person") || "1", 10);
    const targetIndex = normalizeIndex(param);
    setIndex(([current]) => {
      if (current === targetIndex) return [current, 0];
      const dir = targetIndex > current || (current === people.length - 1 && targetIndex === 0) ? 1 : -1;
      return [targetIndex, dir];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const paginate = useCallback(
    (newDirection) => {
      setIndex(([prev]) => {
        const nextIndex = (prev + newDirection + people.length) % people.length;
        return [nextIndex, newDirection];
      });
    },
    [setIndex]
  );

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  // swipe handling
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const threshold = 50; // pixels to consider swipe
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      isDraggingRef.current = true;
      startXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    };
    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
    };
    const onTouchEnd = (e) => {
      if (!isDraggingRef.current) return;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const delta = endX - startXRef.current;
      if (delta > threshold) paginate(-1);
      else if (delta < -threshold) paginate(1);
      isDraggingRef.current = false;
    };

    el.addEventListener("pointerdown", onTouchStart);
    el.addEventListener("pointerup", onTouchEnd);
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("pointerdown", onTouchStart);
      el.removeEventListener("pointerup", onTouchEnd);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
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

      <div ref={containerRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={person.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-xl p-8"
          >
            <div className="flex-shrink-0 w-full md:w-1/3">
              <img
                src={person.image}
                alt={person.name}
                className="rounded-lg object-cover w-full h-full shadow"
                loading="lazy"
              />
            </div>
            <div className="md:w-2/3 space-y-4">
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

      {/* Indicator dots */}
      <div className="flex justify-center gap-3 mt-8">
        {people.map((p, idx) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.name}`}
            onClick={() => setIndex([idx, idx > index ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition ${
              idx === index ? "bg-green-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
