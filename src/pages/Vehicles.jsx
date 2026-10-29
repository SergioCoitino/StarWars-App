import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";
import useSEO from "../hooks/useSEO";
import FallbackImg from "../assets/Fallback-planet.png";

export default function Vehicles() {
  useSEO({
    title: "Vehicles | Star Wars App",
    description: "Discover ground and atmospheric vehicles of Star Wars like the AT-AT, Snowspeeder, and Speeder Bike."
  });

  return (
    <>
      <Header />

      <Hero 
      heroTitle="Vehicles"
      heroSubtitle="Discover Vehicles of the Star Wars Universe"
      heroSubtitle2="Click on the photo to see more details."
      />

      <SwapiList
        title="Vehicles"
        endpoint="vehicles"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/vehicles/${id}.jpg`
        }
        fallback={FallbackImg}
        renderDetails={(item, id) => {

          return (
            <>
              <div
                className="item-image"
                style={{
                  backgroundImage: `url(https://starwarsgallery.netlify.app/assets/vehicles/${id}.jpg), url(${FallbackImg})`
                }}
              ></div>

              <span className="item-details">Name: {formatValue(item.name)}</span>
              <span className="item-details">Model: {formatValue(item.model)}</span>
              <span className="item-details">Length: {formatValue(item.length, { distance: true })}</span>
              <span className="item-details">Speed: {formatValue(item.max_atmosphering_speed, { speed: true })}</span>
              <span className="item-details">Cargo: {formatValue(item.cargo_capacity, { weight: true, largeNumber: true })}</span>
              <span className="item-details">Passengers: {formatValue(item.passengers)}</span>
              <span className="item-details">Crew: {formatValue(item.crew)}</span>
            </>
          );
        }}
      />

      <Footer />
    </>
  );
}
