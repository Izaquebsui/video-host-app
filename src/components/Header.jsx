// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-black bg-opacity-80 w-full border-b border-zinc-800 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tight text-pink-500 mb-1 drop-shadow" style={{ letterSpacing: "-2px" }}>
          PornocomLegendaHD
        </h1>
        <nav className="mt-2 flex gap-8">
          <a href="#" className="text-zinc-200 font-semibold hover:text-pink-400 transition">Vídeos</a>
          <a href="#" className="text-zinc-200 font-semibold hover:text-pink-400 transition">Top Avaliados</a>
          <a href="#" className="text-zinc-200 font-semibold hover:text-pink-400 transition">Categorias</a>
          <a href="#" className="text-zinc-200 font-semibold hover:text-pink-400 transition">Entrar</a>
          <a href="#" className="text-zinc-200 font-semibold hover:text-pink-400 transition">Cadastrar-se</a>
        </nav>
      </div>
    </header>
  );
}
