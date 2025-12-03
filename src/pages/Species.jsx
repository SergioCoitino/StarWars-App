import React from 'react'
import './pages.css'

import Header from '../components/Header'
import Footer from '../components/Footer'


function capitalize(value) {
  if (!value) return "";

  return value
    .split(",")                     
    .map(item => {
      const trimmed = item.trim(); 
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join(", ");              
}


function Species() {

let currentPageUrl = 'https://swapi.dev/api/species/';

window.onload = async () => {
    try {
      await loadSpecies(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };

  async function loadSpecies(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // limpar os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      
      responseJson.results.forEach((species) => {
        const card = document.createElement("div");
        const speciesId = species.url.replace(/\D/g, ""); // Extrai os números da URL
        const mainImageUrl = `https://starwarsgallery.netlify.app/assets/species/${speciesId}.jpg`;
        const fallbackImageUrl = "../assets/fallback-image.png";
        
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
  
        const speciesNameBG = document.createElement("div");
        speciesNameBG.className = "item-name-bg";
  
        const speciesName = document.createElement("span");
        speciesName.className = "item-title";
        speciesName.innerText = `${species.name}`;
  
        speciesNameBG.appendChild(speciesName);
        card.appendChild(speciesNameBG);
  
        card.onclick = () => {
          const modal = document.getElementById("modal");
          modal.style.visibility = "visible";
  
          const modalContent = document.getElementById("modal-content");
          modalContent.innerHTML = '';
  
          const speciesImage = document.createElement("div");
          
          // Define a imagem principal e o fallback no modal
          const modalImg = new Image();
          modalImg.src = mainImageUrl;
  
          modalImg.onload = () => {
            speciesImage.style.backgroundImage = `url('${mainImageUrl}')`;
          };
  
          modalImg.onerror = () => {
            speciesImage.style.backgroundImage = `url('${fallbackImageUrl}')`;
          };
  
          speciesImage.className = "item-image";
  
          const name = document.createElement("span");
          name.className = "item-details";
          name.innerText = `Name: ${convertName(species.name)}`;

          const formatedClasification = capitalize(species.classification)

          const classification = document.createElement("span");
          classification.className = "item-details";
          classification.innerText = `Classification: ${formatedClasification}`;          
  
          const averageHeight = document.createElement("span");
          averageHeight.className = "item-details";
          averageHeight.innerText = `Average Height: ${convertAverageHeight(species.average_height)}`;

          const formatedSkinColors = capitalize(species.skin_colors)
  
          const skinColors = document.createElement("span");
          skinColors.className = "item-details";
          skinColors.innerText = `Skin Colors: ${formatedSkinColors}`;

          const language = document.createElement("span");
          language.className = "item-details";
          language.innerText = `Language: ${convertLanguage(species.language)}`;

  
          modalContent.appendChild(speciesImage);
          modalContent.appendChild(name);
          modalContent.appendChild(classification);
          modalContent.appendChild(averageHeight);
          modalContent.appendChild(skinColors);
          modalContent.appendChild(language);
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
      alert('Erro ao carregar as especies');
      console.log(error);
    }
  }
  


async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadSpecies(responseJson.next);
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
  
      await loadSpecies(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }

  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  function convertName(name) {
    if (name === "unknown") {
      return "Desconhecido"
    }
    return `${name}`    
  };

  function convertAverageHeight(averageHeight) {
    if (averageHeight === "unknown") {
      return "Desconhecida"
    }
    return `${averageHeight} cm`
  }


function convertLanguage(language) {
    if (language === "unknown") {
      return "Desconhecido"
    }
    return language
  }
  
  return (
    <>
    <Header/>
    <div className="main-container">

        <h2>Species</h2>

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

export default Species