import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";
import useSEO from "../hooks/useSEO";
import FallbackImg from "../assets/Fallback-planet.png";

export default function Species() {
  useSEO({
    title: "Species | Star Wars App",
    description: "Discover diverse species across the Star Wars galaxy including Wookiees, Twi'leks, and Droids."
  });

  return (
    <>
      <Header />

      <Hero 
      heroTitle="Species"
      heroSubtitle="Discover Species of the Star Wars Universe"
      heroSubtitle2="Click on the photo to see more details."
      />

      <SwapiList
        title="Species"
        endpoint="species"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/species/${id}.jpg`
        }
        fallback={FallbackImg}
        renderDetails={(item, id) => (
          <>
            <div
              className="item-image"
              style={{
                backgroundImage: `url(https://starwarsgallery.netlify.app/assets/species/${id}.jpg), url(${FallbackImg})`
              }}
            ></div>

            <span className="item-details">Name: {formatValue(item.name)}</span>
            <span className="item-details">Language: {formatValue(item.language)}</span>
            <span className="item-details">Classification: {formatValue(item.classification)}</span>
            <span className="item-details">Hair Colors: {formatValue(item.hair_colors)}</span>
            <span className="item-details">Skin Colors: {formatValue(item.skin_colors)}</span>
            <span className="item-details">Average Height: {formatValue(item.average_height, { unit: "cm" })}</span>
          </>
        )}
      />

      <Footer />
    </>
  );
}
