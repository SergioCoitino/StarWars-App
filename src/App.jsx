import React from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import useSEO from "./hooks/useSEO";

import Img2 from "./assets/2.jpg";
import Img3 from "./assets/3.jpg";
import Img4 from "./assets/4.jpg";
import Img5 from "./assets/5.jpg";

import "./App.css";

const Img1 = "/1.jpg";

export default function App() {
  useSEO({
    title: "Star Wars App | Explore Characters, Starships & Planets",
    description: "Explore the Star Wars universe with interactive data on characters, starships, planets, vehicles, and species, powered by SWAPI and Star Wars Gallery."
  });

  const pages = [
    { img: Img1, label: "Characters", path: "/characters" },
    { img: Img2, label: "Starships", path: "/starships" },
    { img: Img3, label: "Planets", path: "/planets" },
    { img: Img4, label: "Vehicles", path: "/vehicles" },
    { img: Img5, label: "Species", path: "/species" }    
  ];

  return (
    <>
      <Header />

      <Hero 
        heroTitle="Explore the Star Wars Universe"
        heroSubtitle="Discover characters, starships, planets, vehicles and species powered by SWAPI & Star Wars Gallery."
      />

      {/* HOME GRID */}
      <div className="content-container">
        <div className="container">

          {/* FILA SUPERIOR */}
          <div className="cards-page">
            {pages.map((item, index) => (
              <Link className="col" key={item.path} to={item.path}>
                <img
                  className="col-imagem"
                  src={item.img}
                  alt={item.label}
                  width="430"
                  height="350"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding={index === 0 ? "sync" : "async"}
                />
                <span className="col-title">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
