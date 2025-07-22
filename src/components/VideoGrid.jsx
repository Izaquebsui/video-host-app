import React, { useEffect, useState } from "react";

export default function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Busca os vídeos do backend Render
  useEffect(() => {
    fetch("https://backend-pornocomlegenda1.onrender.com/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []))
      .catch((err) => {
        console.error("Erro ao buscar vídeos:", err);
        setVideos([]);
      });
  }, []);

  if (!videos || videos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="col-span-full text-center text-zinc-400">
          Nenhum vídeo encontrado.
        </div>
      </div>
    );
  }

  return (
    <div id="videos" className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos.slice(0, 15).map((video, idx) => (
          <div
            key={video.guid || idx}
            className="group cursor-pointer transition-all"
            onClick={() => setSelectedVideo(video)}
          >
            <div
              className="relative rounded-lg overflow-hidden border border-zinc-900 bg-zinc-900 shadow-none transition-transform group-hover:scale-[1.03] group-hover:z-20"
              style={{
                aspectRatio: "16/9",
                minHeight: 220,
                background: "#171717"
              }}
            >
              <img
                src={video.thumb || "https://placehold.co/640x360/png"}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute bottom-0 left-0 flex items-center mb-2 ml-2">
                <span className="bg-black/85 px-2 py-1 rounded text-xs font-semibold text-white tracking-wide">
                  RANK
                </span>
                <span className="bg-pink-500 text-white text-lg rounded ml-2 px-3 py-1 font-bold">{idx + 1}</span>
              </div>
            </div>

            <div className="mt-4 mb-1">
              <div className="text-white font-bold text-xl leading-tight truncate">
                {video.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 relative p-4">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <iframe
              src={selectedVideo.playerUrl}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen
              className="w-full h-[48vw] max-h-[60vh] rounded"
              title={selectedVideo.title}
            ></iframe>
            <div className="text-white font-bold text-xl mt-2">{selectedVideo.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
