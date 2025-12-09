import React from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Img1 from "./assets/1.jpg";
import Img2 from "./assets/2.png";
import Img3 from "./assets/3.jpg";
import Img4 from "./assets/4.jpg";
import Img5 from "./assets/5.jpg";

import "./App.css";

export default function App() {
  // Lista de páginas con imágenes → más limpio, escalable y mantenible
  const pages = [
    { img: Img1, label: "Characters", path: "/characters" },
    { img: Img2, label: "Starships", path: "/starships" },
    { img: Img3, label: "Planets", path: "/planets" },
    { img: Img4, label: "Vehicles", path: "/vehicles" },
    { img: Img5, label: "Species", path: "/species" },
  ];

  return (
    <>
      <Header />

      <div className="content-container">
        <div className="container">
          {pages.map((item, index) => (
            <div className="col" key={index}>
              <img
                className="col-imagem"
                src={item.img}
                alt={`${item.label} section`}
                loading="lazy" // Mejora rendimiento
              />

              <Link className="col-title" to={item.path}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
