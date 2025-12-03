import React from 'react'
import './pages.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function Characters() {

let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try {
      await loadCharacters(currentPageUrl);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar cards');
    }
  
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
  };

async function loadCharacters(url) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    
    responseJson.results.forEach((character) => {
      const card = document.createElement("div")
      card.style.backgroundImage = 
      `url(https://starwarsgallery.netlify.app/assets/people/${character.url.replace(/\D/g, "")}.jpg)`
      card.className = "cards"

      const characterNameBG = document.createElement("div")
      characterNameBG.className = "item-name-bg"

      const characterName = document.createElement("span")
      characterName.className = "item-title"
      characterName.innerText = `${character.name}`

      characterNameBG.appendChild(characterName)
      card.appendChild(characterNameBG)

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.style.visibility = "visible"

        const modalContent = document.getElementById("modal-content")
        modalContent.innerHTML = ''

        const characterImage = document.createElement("div")
        characterImage.style.backgroundImage = 
      `url(https://starwarsgallery.netlify.app/assets/people/${character.url.replace(/\D/g, "")}.jpg)`
        characterImage.className = "item-image"

        const name = document.createElement("span")
        name.className = "item-details"
        name.innerText = `Name: ${character.name}`

        const characterHeight = document.createElement("span")
        characterHeight.className = "item-details"
        characterHeight.innerText = `Height: ${convertHeight(character.height)} m`

        const mass = document.createElement("span");
        mass.className = "item-details"
        mass.innerText = `Mass: ${character.mass} kg`

        const formatedEyeColor = capitalize(character.eye_color);

        const eyeColor = document.createElement("span");
        eyeColor.className = "item-details";
        eyeColor.innerText = `Eye Color: ${formatedEyeColor}`;

        const birthYear = document.createElement("span")
        birthYear.className = "item-details"
        birthYear.innerText = `Birth Year: ${character.birth_year}`

        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characterHeight)
        modalContent.appendChild(mass)
        modalContent.appendChild(eyeColor)
        modalContent.appendChild(birthYear)


      }

      mainContent.appendChild(card);

    });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error)
        
      }
}


async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadCharacters(responseJson.next);
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
  
      await loadCharacters(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }

  function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }

  function convertHeight(height) {
    if (height === "unknown") {
      return "desconhecida"
    }
    return (height / 100).toFixed(2)
  }


  return (
    <>
    <Header/>
    <div className="main-container">

        <h2>Characters</h2>

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

export default Characters