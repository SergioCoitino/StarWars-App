import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SwapiList from "../components/SwapiList";
import { formatValue } from "../utils/format";


export default function Characters() {
  return (
    <>
      <Header />

      <Hero 
      heroTitle="Characters"
      heroSubtitle="Discover Characters of the Star Wars Universe"
      heroSubtitle2="Click on the photo to see more details."
      />

      <SwapiList
        endpoint="people"
        imagePath={(id) =>
          `https://starwarsgallery.netlify.app/assets/people/${id}.jpg`
        }
        fallback="/assets/fallback-people.png"
        renderDetails={(item, id) => (
          <>
            <div
              className="item-image"
              style={{
                backgroundImage: `url(https://starwarsgallery.netlify.app/assets/people/${id}.jpg)`
              }}
            ></div>

            <span className="item-details">Name: {formatValue(item.name)}</span>
            <span className="item-details">Height: {formatValue(item.height)} cm</span>
            <span className="item-details">Mass: {formatValue(item.mass, { weight:true })}</span>
            <span className="item-details">Gender: {formatValue(item.gender)}</span>
            <span className="item-details">Eye Color: {formatValue(item.eye_color)}</span>
            <span className="item-details">Birth Year: {formatValue(item.birth_year)}</span>
            <span className="item-details">Hair Color: {formatValue(item.hair_color)}</span>
            <span className="item-details">Skin Color: {formatValue(item.skin_color)}</span>
          </>
        )}
      />

      <Footer />
    </>
  );
}
