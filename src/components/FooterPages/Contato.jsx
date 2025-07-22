import React from "react";
export default function Contato() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Contacte-nos</h1>
      <p>
        E-mail de contato:{" "}
        <a href="mailto:duckduckmga@proton.me" className="text-pink-400 underline">
          duckduckmga@proton.me
        </a>
      </p>
    </div>
  );
}
