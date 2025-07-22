// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const PLAYBACK_DOMAIN = import.meta.env.VITE_BUNNY_PLAYBACK_DOMAIN;

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [guid, setGuid] = useState("");
  const [legendas, setLegendas] = useState({}); // Novo: armazena legendas editadas

  const videosPerPage = 32;

  // Carrega usuário logado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  // Busca vídeos
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, []);

  async function fetchVideos() {
    try {
      const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedVideos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setVideos(fetchedVideos);

      // Carregar legendas nos campos locais (para editar)
      const legendasObj = {};
      fetchedVideos.forEach((v) => {
        legendasObj[v.id] = v.legenda || "";
      });
      setLegendas(legendasObj);
    } catch (error) {
      console.error("Erro ao buscar vídeos do Firestore:", error);
    }
  }

  const filteredVideos = searchTerm.trim()
    ? videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : videos;

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Erro ao fazer login");
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
  };

  // ADICIONAR VÍDEO
  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const newDoc = await addDoc(collection(db, "videos"), {
        title,
        guid,
        createdAt: serverTimestamp(),
        legenda: "", // Começa sem legenda
      });
      alert("Vídeo adicionado com sucesso!");
      setTitle("");
      setGuid("");
      fetchVideos();
    } catch (error) {
      console.error("Erro ao adicionar vídeo:", error);
    }
  };

  // EXCLUIR VÍDEO
  const handleDeleteVideo = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este vídeo?")) {
      try {
        await deleteDoc(doc(db, "videos", id));
        fetchVideos();
      } catch (error) {
        alert("Erro ao excluir vídeo!");
      }
    }
  };

  // SALVAR LEGENDA
  const handleSaveLegenda = async (id) => {
    try {
      await updateDoc(doc(db, "videos", id), {
        legenda: legendas[id] || "",
      });
      alert("Legenda salva!");
      fetchVideos();
    } catch (error) {
      alert("Erro ao salvar legenda.");
    }
  };

  // Atualiza campo de legenda local
  const handleLegendaChange = (id, value) => {
    if (value.length <= 100) {
      setLegendas((prev) => ({ ...prev, [id]: value }));
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
        <h2 className="text-2xl font-bold mb-6">Login do Administrador</h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white">
      <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-700 px-6 py-4 shadow-md relative h-20 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-center whitespace-nowrap">
          <span className="text-pink-500">Painel Admin</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Sair
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-bold mb-4">Adicionar Vídeo</h2>
        <form onSubmit={handleAddVideo} className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Título do vídeo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
            required
          />
          <input
            type="text"
            placeholder="GUID do vídeo"
            value={guid}
            onChange={(e) => setGuid(e.target.value)}
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded font-medium"
          >
            Adicionar
          </button>
        </form>

        <input
          type="text"
          placeholder="Buscar vídeos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-600 placeholder:text-zinc-400 mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedVideos.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-900 rounded-lg p-4 shadow-md hover:shadow-pink-500/30 transition flex flex-col"
            >
              <h3 className="text-sm font-semibold mb-2">{video.title}</h3>
              <div className="aspect-video mb-2">
                <iframe
                  src={`https://${PLAYBACK_DOMAIN}/${video.guid}/playlist.m3u8`}
                  loading="lazy"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                  title={video.title}
                ></iframe>
              </div>
              {/* CAMPO DE LEGENDA */}
              <input
                type="text"
                value={legendas[video.id] || ""}
                onChange={(e) => handleLegendaChange(video.id, e.target.value)}
                maxLength={100}
                placeholder="Legenda (até 100 caracteres)"
                className="w-full p-2 mb-2 bg-zinc-800 border border-zinc-700 rounded text-white"
              />
              <button
                onClick={() => handleSaveLegenda(video.id)}
                className="mb-2 px-3 py-1 rounded bg-green-600 text-white"
              >
                Salvar Legenda
              </button>
              {/* BOTÃO EXCLUIR */}
              <button
                onClick={() => handleDeleteVideo(video.id)}
                className="px-2 py-1 rounded text-xs bg-red-600 text-white hover:bg-red-800"
                title="Deletar vídeo"
              >
                🗑 Excluir
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-pink-600 text-white"
                  : "bg-zinc-700 text-zinc-300 hover:bg-pink-600 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
