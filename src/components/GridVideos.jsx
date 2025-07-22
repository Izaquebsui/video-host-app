// src/components/GridVideos.jsx
import React, { useRef } from "react";

// 1. EXEMPLO DE ARRAY DE VÍDEOS
const videos = [
  {
    id: "1",
    title: "Video Anal da Madrasta",
    thumb: "/videos/thumbs/video1.jpg", // troque para sua thumb real
    miniPlayer: "/videos/miniplayers/video1.mp4", // troque para seu mp4 real
  },
  {
    id: "2",
    title: "Video Interracial Estudante",
    thumb: "/videos/thumbs/video2.jpg",
    miniPlayer: "/videos/miniplayers/video2.mp4",
  },
  {
    id: "3",
    title: "Video de Professora Gata",
    thumb: "/videos/thumbs/video3.jpg",
    // miniPlayer: "/videos/miniplayers/video3.mp4", // ainda sem miniplayer
  },
  // ...adicione mais vídeos conforme for subindo os arquivos!
];

// 2. COMPONENTE DO CARD DE VÍDEO (MINIPLAYER NO HOVER)
function VideoCard({ video }) {
  const videoRef = useRef();

  // Inicia o vídeo do começo ao passar mouse
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Para o vídeo ao sair do mouse
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 shadow-md hover:shadow-pink-500/30 transition flex flex-col">
      <h3 className="text-sm font-semibold mb-2">{video.title}</h3>
      <div
        className="aspect-video relative rounded overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumb visível sempre, mas some no hover */}
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
        />
        {/* Mini player aparece no hover */}
        {video.miniPlayer && (
          <video
            ref={videoRef}
            src={video.miniPlayer}
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            loop
            muted
            playsInline
            preload="auto"
          />
        )}
      </div>
    </div>
  );
}

// 3. GRID DOS VÍDEOS (USA OS CARDS)
export default function GridVideos() {
  return (
    <div className="w-full px-2 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
