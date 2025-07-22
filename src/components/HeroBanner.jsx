// src/components/HeroBanner.jsx
import React from "react";

export default function HeroBanner() {
  return (
    <section className="w-full bg-black bg-opacity-85 flex items-center justify-center py-8 mb-10 border-b border-zinc-800">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Banner do vídeo */}
        <div className="relative w-full md:w-3/5 rounded-2xl overflow-hidden shadow-lg border border-zinc-700">
          <iframe
            src="https://iframe.mediadelivery.net/embed/465083/b314bf71-7dd3-44a4-bfd1-8b7e329a753a?autoplay=false&responsive=true"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen
            className="w-full aspect-video min-h-[220px] max-h-[340px] bg-black"
            title="Vídeo em destaque"
            loading="lazy"
          ></iframe>
        </div>
        {/* Texto de destaque */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start">
          <div className="text-pink-400 font-black text-2xl mb-2 text-center md:text-left">🔥 Novidade Exclusiva!</div>
          <div className="text-white font-bold text-xl mb-2 text-center md:text-left">
            Os melhores vídeos legendados em HD <span className="text-pink-400">GRÁTIS</span>
          </div>
          <div className="text-zinc-300 mb-4 text-center md:text-left">
            Aproveite vídeos premium com legendas em português, qualidade máxima e acesso rápido. Experimente agora!
          </div>
          <a
            href="#videos"
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 text-white font-bold rounded-lg shadow transition text-lg"
          >
            Assistir Agora
          </a>
        </div>
      </div>
    </section>
  );
}
