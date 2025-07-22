// src/components/Cadastro.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Cadastro({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro realizado com sucesso!");
      onClose();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está cadastrado. Tente fazer login.");
      } else if (error.code === "auth/invalid-email") {
        alert("E-mail inválido. Verifique e tente novamente.");
      } else if (error.code === "auth/weak-password") {
        alert("A senha precisa ter pelo menos 6 caracteres.");
      } else {
        alert("Erro inesperado: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <form onSubmit={handleRegister} className="bg-zinc-900 p-6 rounded space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white">Cadastrar</h2>
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <button onClick={onClose} className="text-zinc-400 hover:underline">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
