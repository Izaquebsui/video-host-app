// src/components/MiniPlayerList.jsx
import React from "react";

// 8 vídeos (ajuste os nomes conforme seus arquivos)
const videos = [
  { type: "video", src: "/miniplayers/bangbros-01.mp4" },
  { type: "video", src: "/miniplayers/bangbros-02.mp4" },
  { type: "video", src: "/miniplayers/bangbros-03.mp4" },
  { type: "video", src: "/miniplayers/brazzers-01.mp4" },
  { type: "video", src: "/miniplayers/brazzers-02.mp4" },
  { type: "video", src: "/miniplayers/brazzers-03.mp4" },
  { type: "video", src: "/miniplayers/brazzers-04.mp4" },
  { type: "video", src: "/miniplayers/brazzers-05.mp4" },
];

// 8 thumbs (ajuste os nomes conforme seus arquivos)
const thumbs = [
  { type: "thumb", src: "/thumbs/thumb-01.jpg" },
  { type: "thumb", src: "/thumbs/thumb-02.jpg" },
  { type: "thumb", src: "/thumbs/thumb-03.jpg" },
  { type: "thumb", src: "/thumbs/thumb-04.jpg" },
  { type: "thumb", src: "/thumbs/thumb-05.jpg" },
  { type: "thumb", src: "/thumbs/thumb-06.jpg" },
  { type: "thumb", src: "/thumbs/thumb-07.jpg" },
  { type: "thumb", src: "/thumbs/thumb-08.jpg" },
];

// Função para embaralhar array
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MiniPlayerList() {
  // Embaralha ao renderizar (mistura tudo)
  const items = shuffle([...videos, ...thumbs]);

  // Play/Pause em 2x no hover
  const handleMouseEnter = (e) => {
    e.currentTarget.play();
    e.currentTarget.playbackRate = 2;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-4 gap-0">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative w-full aspect-[5/6] bg-black overflow-hidden"
            style={{ border: 0, margin: 0, padding: 0 }}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                muted
                preload="auto"
                playsInline
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  background: "#111",
                }}
                className="transition duration-150 select-none pointer-events-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tabIndex={-1}
                draggable={false}
              />
            ) : (
              <img
                src={item.src}
                alt=""
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  background: "#111",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
