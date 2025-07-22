import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ajuste o caminho se necessário
import VideoGrid from "./VideoGrid";

// Suas categorias
const categories = [
  "Anal", "Padrasto", "Madrasta", "Meia irmã", "Meio irmão", "Enteada",
  "Enteado", "Empregada", "Sogra", "Lesbica", "Professora", "Traição", "Milf", "Adotada"
];

export default function SitePublico() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Buscar vídeos do Firestore
  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "videos"));
      const fetched = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      setVideos(fetched);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  const videosPerPage = 15;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const videosDaPaginaAtual = videos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* HEADER */}
      <header className="w-full flex items-center px-8 py-5 bg-black justify-center shadow-lg">
        <span className="font-extrabold text-3xl text-pink-500 drop-shadow tracking-tight">
          Pornocom<span className="text-white">LegendaHD</span>
        </span>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="relative h-[42vw] min-h-[340px] max-h-[55vh] flex items-end overflow-hidden mb-8">
        <img
          src="https://i.imgur.com/7b7W13T.jpg"
          alt="Destaque"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="relative z-10 p-10 flex flex-col gap-3 max-w-2xl">
          <h2 className="text-3xl font-bold mb-1">Título do Vídeo em Destaque</h2>
          <span className="text-lg text-zinc-200 mb-2">Nome da Atriz</span>
          <div className="flex gap-4">
            <div className="bg-black/80 px-6 py-2 rounded-xl flex flex-col items-center">
              <span className="text-zinc-400 text-xs">NOTA</span>
              <span className="text-2xl font-bold text-green-400">9.2</span>
            </div>
            <div className="bg-black/80 px-6 py-2 rounded-xl flex flex-col items-center">
              <span className="text-zinc-400 text-xs">RANK</span>
              <span className="text-2xl font-bold text-pink-400">385</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <div className="flex flex-wrap justify-center items-center gap-3 px-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="bg-zinc-900 hover:bg-pink-600/80 text-zinc-100 text-base px-6 py-2 rounded-xl font-semibold transition shadow-lg"
          >
            {cat}
          </button>
        ))}
        <button className="bg-zinc-900 hover:bg-blue-600/80 text-blue-300 px-6 py-2 rounded-xl font-semibold transition shadow-lg ml-2">
          Ver mais
        </button>
      </div>

      {/* TÍTULO CENTRALIZADO */}
      <div className="flex justify-center mt-4 mb-8">
        <h2 className="text-3xl font-extrabold text-pink-400 text-center drop-shadow">
          Top Vídeos PornocomLegendaHD
        </h2>
      </div>

      {/* GRID DE VÍDEOS */}
      {loading ? (
        <div className="flex justify-center my-20 text-lg text-zinc-400">Carregando vídeos...</div>
      ) : (
        <VideoGrid
          videos={videosDaPaginaAtual}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-zinc-400 text-sm py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-2">
            Este site é exclusivo para maiores de 18 anos.<br />
            Denuncie Conteúdo Inadequado.
          </div>
          <div>
            Copyright © 2025 PornocomLegendaHD. Todos os direitos reservados.<br />
          </div>
        </div>
      </footer>
    </div>
  );
}
