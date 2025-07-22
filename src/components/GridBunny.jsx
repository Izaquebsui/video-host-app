import React, { useEffect, useState } from "react";

const API_KEY = "1205f095-11f3-4697-add5cf3533b6-6ee6-4052";
const LIBRARY_ID = "465083"; // Sua Library ID Bunny.net

export default function GridBunny() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`, {
      headers: {
        "AccessKey": API_KEY,
        "accept": "application/json",
      }
    })
      .then(r => r.json())
      .then(r => {
        setVideos(r.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-zinc-300">Carregando vídeos...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.guid}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105"
            onClick={() => setSelected(video)}
          >
            <img
              src={video.thumbnailFileName}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-4 py-2 flex items-center justify-between">
              <div className="text-white font-bold text-lg truncate">{video.title}</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-black bg-opacity-50 p-3 rounded-full">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black rounded-2xl shadow-xl max-w-3xl w-full mx-4 relative p-4">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <iframe
              src={`https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${selected.guid}?autoplay=true&responsive=true`}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen
              className="w-full aspect-video rounded"
              title={selected.title}
            />
            <div className="text-white font-bold text-xl mt-2">{selected.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
