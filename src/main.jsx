import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Importación de página principal
import App from "./App.jsx";

// Carga diferida de rutas internas para optimizar el bundle inicial
const Characters = lazy(() => import("./pages/People.jsx"));
const Starships = lazy(() => import("./pages/Starships.jsx"));
const Planets = lazy(() => import("./pages/Planets.jsx"));
const Vehicles = lazy(() => import("./pages/Vehicles.jsx"));
const Species = lazy(() => import("./pages/Species.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Suspense fallback={null}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
