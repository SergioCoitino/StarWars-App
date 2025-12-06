import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";


export default function Vehicles() {
  return (
    <>
      <Header />

      <SwapiList
        title="Vehicles"
        endpoint="vehicles"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/vehicles/${id}.jpg`
        }
        fallback="/assets/fallback-image-vehicles.png"
        renderDetails={(item, id) => {

          return (
            <>
              <div
                className="item-image"
                style={{
                  backgroundImage: `url(https://starwarsgallery.netlify.app/assets/vehicles/${id}.jpg)`
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
