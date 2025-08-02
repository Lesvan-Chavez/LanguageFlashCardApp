
import React from "react";
import AboutCarousel from "../contact_components/contact_us_component";

export default function AboutPage() {
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mt-12 mb-6">
            Meet the Syntax Diplomats
          </h1>
          <AboutCarousel />
        </div>
      </main>
    </>
  );
}
