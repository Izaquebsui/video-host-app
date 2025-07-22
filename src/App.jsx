import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SitePublico from "./components/SitePublico";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";

// Footer Pages
import Termos from "./components/FooterPages/Termos";
import Privacidade from "./components/FooterPages/Privacidade";
import DCMA from "./components/FooterPages/DCMA";
import USG2257 from "./components/FooterPages/USG2257";
import Contato from "./components/FooterPages/Contato";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white">
        <Routes>
          {/* Site público */}
          <Route path="/" element={<SitePublico />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login onClose={() => {}} />} />
          <Route path="/cadastro" element={<Cadastro onClose={() => {}} />} />
          {/* Footer pages */}
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/dcma" element={<DCMA />} />
          <Route path="/2257" element={<USG2257 />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </Router>
  );
}
