import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";


export default function Starships() {
  return (
    <>
      <Header />

      <Hero 
      heroTitle="Starships"
      heroSubtitle="Discover Starships of the Star Wars Universe"
      heroSubtitle2="Click on the photo to see more details."
      />

      <SwapiList
        title="Starships"
        endpoint="starships"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/starships/${id}.jpg`
        }
        fallback="/assets/fallback-starships.png"
        renderDetails={(item, id) => (
          <>
            <div
              className="item-image"
              style={{
                backgroundImage: `url(https://starwarsgallery.netlify.app/assets/starships/${id}.jpg)`
              }}
            ></div>

            <span className="item-details">Name: {formatValue(item.name)}</span>
            <span className="item-details">Model: {formatValue(item.model)}</span>
            <span className="item-details">Passengers: {formatValue(item.passengers, {largeNumber : true})}</span>
            <span className="item-details">Crew: {formatValue(item.crew, {largeNumber : true})}</span>
            <span className="item-details">Cargo: {formatValue(item.cargo_capacity, { weight: true, largeNumber: true })}</span>
            <span className="item-details">Length: {formatValue(item.length, {largeNumber : true, distance : true})}</span>
            <span className="item-details">Speed: {formatValue(item.max_atmosphering_speed, { speed: true })}</span>
          </>
        )}
      />

      <Footer />
    </>
  );
}
