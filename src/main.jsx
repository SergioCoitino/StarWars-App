import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Starships from "./pages/Starships.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Characters from "./pages/Characters.jsx";
import Species from "./pages/Species.jsx";
import Planets from "./pages/Planets.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<App />} />

        {/* Rutas internas */}
        <Route path="/characters" element={<Characters />} />
        <Route path="/starships" element={<Starships />} /> 
        <Route path="/planets" element={<Planets />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/species" element={<Species />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
