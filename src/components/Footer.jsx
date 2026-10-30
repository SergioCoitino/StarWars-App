import React from 'react'
import "./components.css";

function Footer() {
  return (
    <footer>
      <div className="coffee-container">
        <a
          href="https://buymeacoffee.com/csergioferh"
          target="_blank"
          rel="noopener noreferrer"
          className="coffee-btn"
          title="Buy Me a Coffee"
        >
          Buy Me a Coffee
        </a>
      </div>
      <p>
        Developed by <a href="https://github.com/SergioCoitino" className="copyrigth" target="_blank" rel="noopener noreferrer">&copy; Sergio Coitiño</a>
        {" • "}
        Images powered by <a href="https://starwarsgallery.netlify.app/" className="copyrigth" target="_blank" rel="noopener noreferrer">Star Wars Gallery</a>
      </p>
      <p> Star Wars and all associated names and/or images are copyright Lucasfilm Ltd. Images were freely collected from <a href="https://starwars.fandom.com/wiki/Main_Page" className="copyrigth" target="_blank" rel="noopener noreferrer">Wookiepedia</a></p>
    </footer>
  )
}

export default Footer
