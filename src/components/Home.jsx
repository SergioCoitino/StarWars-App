import React from 'react'
import './components.css'
import Img1 from '../assets/1.jpg' 
import Img2 from '../assets/2.png' 
import Img3 from '../assets/3.jpg' 
import Img4 from '../assets/4.jpg' 
import Img5 from '../assets/5.jpg' 

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="content-container">
        <div className="container">  
                <div class="col">
                    <img class="col-imagem"
                    src={Img1} alt=""/>
                    <Link className='col-title' to="/characters">Characters</Link>
                </div>
                <div class="col">
                    <img class="col-imagem"
                    src={Img2} alt=""/>
                    <Link className='col-title' to="/starships">Starships</Link>
                </div>
                <div class="col">
                    <img class="col-imagem"
                    src={Img3} alt=""/>
                    <Link className='col-title' to="/planets">Planets</Link>
                </div>
                <div class="col">
                    <img class="col-imagem"
                    src={Img4} alt=""/>
                    <Link className='col-title' to="/vehicles">Vehicles</Link>
                </div>
                <div class="col">
                    <img class="col-imagem"
                    src={Img5} alt=""/>
                    <Link className='col-title' to="/species">Species</Link>
                </div>
        </div>
    </div>



  )
}

export default Home