import React from 'react'
import "./components.css";

function Hero({heroTitle, heroSubtitle, heroSubtitle2}) {
  return (
      <section className="hero">
        <div className="hero-content">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <p>{heroSubtitle2}</p>
        </div>
      </section>
  )
}

export default Hero