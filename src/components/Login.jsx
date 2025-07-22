// src/components/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Agora aceita onClose e onLoginSuccess (opcional)
export default function Login({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      if (onLoginSuccess) onLoginSuccess(); // FECHA MODAL, ATUALIZA SITE PUBLICO
      else if (onClose) onClose(); // fallback se não passar o novo prop
    } catch (error) {
      alert("Erro ao fazer login: " + error.code + " - " + error.message);
      console.error("Erro de login Firebase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-6 rounded space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white">Entrar</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 px-4 py-2 rounded text-white disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
