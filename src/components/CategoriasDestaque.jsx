// src/components/CategoriasDestaque.jsx

import React from "react"; // <--- IMPORTANTE!

const categorias = [
  { nome: "ANAL", thumb: "https://cdni.pornpics.com/1280/7/162/47931717/47931717_067_7d20.jpg" },
  { nome: "MADRASTA", thumb: "https://cdni.pornpics.com/1280/5/227/70131975/70131975_011_8421.jpg" },
  { nome: "MEIA-IRMÃ", thumb: "https://cdni.pornpics.com/1280/7/77/78713609/78713609_108_3915.jpg" },
  { nome: "EMPREGADA", thumb: "https://cdni.pornpics.com/1280/1/290/96319778/96319778_008_91a2.jpg" },
  { nome: "ENTEADA", thumb: "https://cdni.pornpics.com/1280/7/632/43401540/43401540_067_5b64.jpg" },

  { nome: "ENTEADO", thumb: "https://cdni.pornpics.com/1280/7/683/22603999/22603999_009_1577.jpg" },
  { nome: "MÃE", thumb: "https://cdni.pornpics.com/1280/7/432/24859156/24859156_299_9b8b.jpg" },
  { nome: "LÉSBICAS", thumb: "https://cdni.pornpics.com/1280/7/533/97579618/97579618_082_f417.jpg" },
  { nome: "PROFESSORA", thumb: "https://cdni.pornpics.com/1280/5/170/59881254/59881254_010_0bd9.jpg" },
  { nome: "LATINAS", thumb: "https://cdni.pornpics.com/1280/7/127/29344513/29344513_032_33d1.jpg" },
];

export default function CategoriasDestaque({ onCategoriaClick }) {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título e botão 'View More' */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-black text-white text-xl font-bold px-4 py-2 rounded-sm">
            Top porn categories
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow">
            Ver Mais
          </button>
        </div>

        {/* Grid 5x2 de categorias */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {categorias.map((cat) => (
            <div key={cat.nome} className="flex flex-col items-center">
              <button
                onClick={() => onCategoriaClick && onCategoriaClick(cat.nome)}
                className="relative w-full aspect-[4/3] rounded overflow-hidden group"
              >
                <img
                  src={cat.thumb}
                  alt={cat.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2 left-2 bg-yellow-400 text-black font-extrabold px-2 py-1 text-sm rounded">
                  {cat.nome}
                </span>
              </button>
              {/* Nome abaixo da imagem */}
              <span className="mt-2 text-lg font-bold text-black">
                {cat.nome}
              </span>
            </div>
          ))}
        </div>

        {/* Botões abaixo das categorias */}
        <div className="flex justify-center gap-6 mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded">
            Ver Mais
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded">
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}
