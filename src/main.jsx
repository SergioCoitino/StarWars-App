import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Importación de páginas
import App from "./App.jsx";
import Characters from "./pages/People.jsx";
import Starships from "./pages/Starships.jsx";
import Planets from "./pages/Planets.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Species from "./pages/Species.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<App />} />

        {/* Rutas internas */}
        <Route path="/characters" element={<Characters />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/species" element={<Species />} />

        {/* Manejo de página no encontrada */}
        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 – Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
