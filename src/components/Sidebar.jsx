// src/components/Sidebar.jsx
import React from "react";

const categories = [
  "Atrizes",
  "Favoritos",
  "Fotos",
  "Tags",
  "Empregada",
  "Incesto",
  "Interracial",
  "Legendados com IA",
  "Lesbicas",
  "Todos os Vídeos",
  "Meia Irmã",
  "Enteada",
  "Enteado",
  "Madrasta",
  "Padrasto",
  "Prima",
  "Amiga",
  "Milf",
  "Porno Com Legenda",
  "Porno Legendado",
];

export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
  user,
  onLogout,
  open,
  setOpen,
}) {
  return (
    <aside className={`w-64 min-h-screen bg-zinc-900 border-r border-zinc-700 p-4 flex flex-col justify-between sticky top-0`}>
      {/* Topo: usuário e categorias */}
      <div>
        {/* Usuário logado */}
        {user && (
          <div className="mb-6 p-3 rounded-xl bg-zinc-800 flex flex-col items-start">
            <span className="text-zinc-200 text-sm">Logado como</span>
            <span className="font-bold text-pink-400">{user.email}</span>
          </div>
        )}

        {/* Categorias */}
        <h2 className="text-lg font-semibold text-pink-500 mb-4">Categorias</h2>
        <div className="space-y-2 overflow-y-auto max-h-[60vh]">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`cursor-pointer px-3 py-2 rounded-md hover:bg-zinc-800 transition ${
                selectedCategory === item
                  ? "bg-pink-600 text-white font-bold shadow"
                  : "text-zinc-300"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé: botão de sair */}
      <div className="mt-6">
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full bg-pink-600 hover:bg-pink-700 transition text-white font-semibold rounded-md px-4 py-2"
          >
            Sair
          </button>
        )}
      </div>
    </aside>
  );
}
