import React from 'react'
import './pages.css'
import Header from '../components/Header'
import Footer from '../components/Footer'


function Starships() {
  let currentPageUrl = 'https://swapi.dev/api/starships/';

window.onload = async () => {
    try {
      await loadStarships(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };

  async function loadStarships(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // limpar os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      
      responseJson.results.forEach((starship) => {
        const card = document.createElement("div");
        const starshipId = starship.url.replace(/\D/g, ""); // Extrai os números da URL
        const mainImageUrl = `https://starwarsgallery.netlify.app/assets/starships/${starshipId}.jpg`;
        const fallbackImageUrl = "/src/assets/fallback-image-starships.png";
        
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
  
        const starshipNameBG = document.createElement("div");
        starshipNameBG.className = "item-name-bg";
  
        const starshipName = document.createElement("span");
        starshipName.className = "item-title";
        starshipName.innerText = `${starship.name}`;
  
        starshipNameBG.appendChild(starshipName);
        card.appendChild(starshipNameBG);
  
        card.onclick = () => {
          const modal = document.getElementById("modal");
          modal.style.visibility = "visible";
  
          const modalContent = document.getElementById("modal-content");
          modalContent.innerHTML = '';
  
          const starshipImage = document.createElement("div");
          
          // Define a imagem principal e o fallback no modal
          const modalImg = new Image();
          modalImg.src = mainImageUrl;
  
          modalImg.onload = () => {
            starshipImage.style.backgroundImage = `url('${mainImageUrl}')`;
          };
  
          modalImg.onerror = () => {
            starshipImage.style.backgroundImage = `url('${fallbackImageUrl}')`;
          };
  
          starshipImage.className = "item-image";
  
          const name = document.createElement("span");
          name.className = "item-details";
          name.innerText = `Name: ${starship.name}`;

          const formatedLength = formatLength(starship.length)

          const length = document.createElement("span");
          length.className = "item-details";
          length.innerText = `Length: ${formatedLength}`;          

          const formatedSpeed = formatSpeed(starship.max_atmosphering_speed);
  
          const speed = document.createElement("span");
          speed.className = "item-details";
          speed.innerText = `Speed: ${formatedSpeed} km/h`;

          const formatedCapacity = formatCapacity(starship.cargo_capacity);
  
          const capacity = document.createElement("span");
          capacity.className = "item-details";
          capacity.innerText = `Cargo Capacity: ${formatedCapacity}`;

          const formatedPassengers = formatPassengers(starship.passengers);

          const passengers = document.createElement("span");
          passengers.className = "item-details";
          passengers.innerText = `Passengers: ${formatedPassengers}`;

          const crew = document.createElement("span");
          crew.className = "item-details";
          crew.innerText = `Crew: ${starship.crew}`;
  
          modalContent.appendChild(starshipImage);
          modalContent.appendChild(name);
          modalContent.appendChild(length);
          modalContent.appendChild(speed);
          modalContent.appendChild(capacity);
          modalContent.appendChild(passengers);
          modalContent.appendChild(crew);
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
      alert('Erro ao carregar as naves');
      console.log(error);
    }
  }

async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadStarships(responseJson.next);
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
  
      await loadStarships(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }

  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

const invalidValues = ["unknown", "n/a", "none"];


function formatLength(length) {
  if (invalidValues.includes(length.toLowerCase())) {
      return "Unknown";
    }
    return `${length} m`;
}

function formatSpeed(speed) {
  if (invalidValues.includes(speed.toLowerCase())) {
    return "Unknown";
  }

  const cleaned = speed.replace(/\D/g, "");

  return cleaned === "" ? "0" : cleaned;
}

function formatPassengers(passengers) {
  if (invalidValues.includes(passengers.toLowerCase())) {
    return "Unknown";
  }

  return passengers;
}

function formatCapacity(capacity) {

  if (invalidValues.includes(capacity.toLowerCase())) {
    return "Unknown";
  }

  const num = Number(capacity);

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + " Mt";  // Megatoneladas
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + " kt";      // Kilotoneladas
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + " t";           // Toneladas
  } else {
    return num + " kg";                               // Kilogramos
  }
}

  return (
    <>
    <Header/>
    <div className="main-container">

        <h2>STARSHIPS</h2>

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

export default Starships