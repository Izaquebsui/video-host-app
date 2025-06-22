import React, { useEffect } from "react";
import Plyr from "plyr";
import Hls from "hls.js";

const App = () => {
  useEffect(() => {
    const video = document.getElementById("video-player") as HTMLVideoElement | null;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("https://stream.mux.com/Of4u2vfz13MgxHx2nLHvR3iGuA02YqUU33Eb6IjyjWW8.m3u8");
        hls.attachMedia(video);
      }

      const player = new Plyr(video, { captions: { active: true } });
      return () => player.destroy();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Plataforma de Vídeos</h1>
      <video id="video-player" controls className="w-full max-w-4xl rounded shadow-lg" />
    </div>
  );
};

export default App;
