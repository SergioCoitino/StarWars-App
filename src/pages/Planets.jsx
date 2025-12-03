import React from 'react'
import './pages.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Planets() {

function formatNumber(num) {
  if (num === "unknown") return "Unknown";

  const number = Number(num);

  if (number >= 1_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  } else if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}


let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
    try {
      await loadPlanets(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };

  async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // limpar os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      
      responseJson.results.forEach((planet) => {
        const card = document.createElement("div");
        const planetId = planet.url.replace(/\D/g, ""); // Extrai os números da URL
        const mainImageUrl = `https://starwarsgallery.netlify.app/assets/planets/${planetId}.jpg`;
        const fallbackImageUrl = `/src/assets/fallback-image.png`;
        
        
        card.className = "cards";
  
        // Define a imagem principal e o fallback
        const img = new Image();
        img.src = mainImageUrl;
  
        img.onload = () => {
          card.style.backgroundImage = `url('${mainImageUrl}')`;
        };
  
        img.onerror = () => {
          card.style.backgroundImage = `url('${fallbackImageUrl}')`;
        };
  
        const planetNameBG = document.createElement("div");
        planetNameBG.className = "item-name-bg";
  
        const planetName = document.createElement("span");
        planetName.className = "item-title";
        planetName.innerText = `${planet.name}`;
  
        planetNameBG.appendChild(planetName);
        card.appendChild(planetNameBG);
  
        card.onclick = () => {
          const modal = document.getElementById("modal");
          modal.style.visibility = "visible";
  
          const modalContent = document.getElementById("modal-content");
          modalContent.innerHTML = '';
  
          const planetImage = document.createElement("div");
          
          // Define a imagem principal e o fallback no modal
          const modalImg = new Image();
          modalImg.src = mainImageUrl;
  
          modalImg.onload = () => {
            planetImage.style.backgroundImage = `url('${mainImageUrl}')`;
          };
  
          modalImg.onerror = () => {
            planetImage.style.backgroundImage = `url('${fallbackImageUrl}')`;
          };
  
          planetImage.className = "item-image";

  
          const name = document.createElement("span");
          name.className = "item-details";
          name.innerText = `Name: ${planet.name}`;
  
          const rotacao = document.createElement("span");
          rotacao.className = "item-details";
          rotacao.innerText = `Rotation: ${planet.rotation_period} hs`;
  
          const orbital = document.createElement("span");
          orbital.className = "item-details";
          orbital.innerText = `Orbital Period: ${planet.orbital_period} days`;
  
          const diametro = document.createElement("span");
          diametro.className = "item-details";
          diametro.innerText = `Diameter: ${planet.diameter} km`;
  
          const formatedPopulation = formatNumber(planet.population);

          const population = document.createElement("span");
          population.className = "item-details";
          population.innerText = `Population: ${formatedPopulation}`;
  
          modalContent.appendChild(planetImage);
          modalContent.appendChild(name);
          modalContent.appendChild(rotacao);
          modalContent.appendChild(orbital);
          modalContent.appendChild(diametro);
          modalContent.appendChild(population);
        };
  
        mainContent.appendChild(card);
      });
  
      const nextButton = document.getElementById('next-button');
      const backButton = document.getElementById('back-button');
  
      nextButton.disabled = !responseJson.next;
      backButton.disabled = !responseJson.previous;
  
      backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
      nextButton.style.visibility = responseJson.next ? "visible" : "hidden";
  
      currentPageUrl = url;
  
    } catch (error) {
      alert('Erro ao carregar os planetas');
      console.log(error);
    }
  }
  

  async function loadNextPage() {
      if (!currentPageUrl) return;
    
      try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();
    
        await loadPlanets(responseJson.next);
      } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
      }
    }
    
  async function loadPreviousPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadPlanets(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }

  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  
  return (
    <>
    <Header/>
    <div className="main-container">

        <h2>Planets</h2>

        <div className="main-content" id="main-content" ></div>

        <div className="modal" id="modal" onClick={hideModal}>

            <div className="modal-content" id="modal-content"></div>

        </div>

        <div className="buttons">
            <button id="back-button" disabled>Anterior</button>
            <button id="next-button" disabled>Próxima</button>
        </div>

    </div> 
    <Footer/>
    </>
  )
}

export default Planets