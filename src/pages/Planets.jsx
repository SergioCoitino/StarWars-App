import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";
import FallbackPlanet from "../assets/Fallback-planet.png";


export default function Planets() {
  return (
    <>
      <Header />
      
      <Hero 
      heroTitle="Planets"
      heroSubtitle="Discover Planets of the Star Wars Universe"
      heroSubtitle2="Click on the photo to see more details."
      />

      <SwapiList
        title="Planets"
        endpoint="planets"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/planets/${id}.jpg`
        }
        fallback={FallbackPlanet}
        renderDetails={(item, id) => (
          <>
            <div
              className="item-image"
              style={{
                backgroundImage: `url(https://starwarsgallery.netlify.app/assets/planets/${id}.jpg), url(${FallbackPlanet})`,
              }}
            ></div>

            <span className="item-details">Name: {formatValue(item.name)}</span>
            <span className="item-details">Climate: {formatValue(item.climate)}</span>
            <span className="item-details">Terrain: {formatValue(item.terrain)}</span>
            <span className="item-details">Population: {formatValue(item.population, {largeNumber : true})}</span>
            <span className="item-details">Rotation Period: {formatValue(item.rotation_period)} Days</span>
            <span className="item-details">Orbital Period: {formatValue(item.orbital_period)} Days</span>
            <span className="item-details">Diameter: {formatValue(item.diameter, {largeNumber : true })} km</span>
          </>
        )}
      />

      <Footer />
    </>
  );
}
