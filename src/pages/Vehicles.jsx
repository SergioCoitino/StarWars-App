import React from 'react'
import './pages.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Vehicles() {

let currentPageUrl = 'https://swapi.dev/api/vehicles/';

window.onload = async () => {
    try {
      await loadVehicles(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };

  async function loadVehicles(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // limpar os resultados anteriores
  
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      
      responseJson.results.forEach((vehicle) => {
        const card = document.createElement("div");
        const vehicleId = vehicle.url.replace(/\D/g, ""); // Extrai os números da URL
        const mainImageUrl = `https://starwarsgallery.netlify.app/assets/vehicles/${vehicleId}.jpg`;
        const fallbackImageUrl = "./assets/fallback-image-vehicles.png";
        
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
  
        const vehicleNameBG = document.createElement("div");
        vehicleNameBG.className = "item-name-bg";
  
        const vehicleName = document.createElement("span");
        vehicleName.className = "item-title";
        vehicleName.innerText = `${vehicle.name}`;
  
        vehicleNameBG.appendChild(vehicleName);
        card.appendChild(vehicleNameBG);
  
        card.onclick = () => {
          const modal = document.getElementById("modal");
          modal.style.visibility = "visible";
  
          const modalContent = document.getElementById("modal-content");
          modalContent.innerHTML = '';
  
          const vehicleImage = document.createElement("div");
          
          // Define a imagem principal e o fallback no modal
          const modalImg = new Image();
          modalImg.src = mainImageUrl;
  
          modalImg.onload = () => {
            vehicleImage.style.backgroundImage = `url('${mainImageUrl}')`;
          };
  
          modalImg.onerror = () => {
            vehicleImage.style.backgroundImage = `url('${fallbackImageUrl}')`;
          };
  
          vehicleImage.className = "item-image";
  
          const name = document.createElement("span");
          name.className = "item-details";
          name.innerText = `Nome: ${convertName(vehicle.name)}`;

          const comprimento = document.createElement("span");
          comprimento.className = "item-details";
          comprimento.innerText = `Comprimento: ${convertComprimento(vehicle.length)}`;          
  
          const speed = document.createElement("span");
          speed.className = "item-details";
          speed.innerText = `Velocidade: ${convertSpeed(vehicle.max_atmosphering_speed)}`;
  
          const capacity = document.createElement("span");
          capacity.className = "item-details";
          capacity.innerText = `Carga: ${convertCapacity(vehicle.cargo_capacity)}`;

          const passengers = document.createElement("span");
          passengers.className = "item-details";
          passengers.innerText = `Passengers: ${vehicle.passengers}`;

          const crew = document.createElement("span");
          crew.className = "item-details";
          crew.innerText = `Crew: ${vehicle.crew}`;

  
          modalContent.appendChild(vehicleImage);
          modalContent.appendChild(name);
          modalContent.appendChild(comprimento);
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
      alert('Erro ao carregar os vehiculos');
      console.log(error);
    }
  }
  


async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadVehicles(responseJson.next);
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
  
      await loadVehicles(responseJson.previous);
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

function convertComprimento(comprimento) {
    if (comprimento === "unknown") {
      return "Desconhecido"
    }
    return `${comprimento} m`
  }

  function convertSpeed(speed) {
    if (speed === "unknown") {
      return "Desconhecida"
    }
    return `${speed} km/h`
  }

function convertCapacity(capacity) {
    if (capacity === "unknown") {
      return "Desconhecido"
    }
    return `${capacity} Kg`
  }

  return (
    <>
    <Header/>
    <div className="main-container">

        <h2>Vehicles</h2>

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

export default Vehicles