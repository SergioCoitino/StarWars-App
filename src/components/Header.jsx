import React from "react";
import {  NavLink } from "react-router-dom";

import "./components.css";

function Header() {
  return (
    <>      
    
    {/* <div className="nav-mobile">
        <input type="checkbox" id="check" className="menu-check" />

        <label htmlFor="check" className="menu-btn">
          <i className="fas fa-bars" id="btn"></i>
          <i className="fas fa-times" id="cancel"></i>
        </label>

        <nav className="sidebar menu-nav">
          <ul>

            <li><Link to="/characters"><i className="fa-solid fa-users"></i> Characters</Link></li>

            <li><Link to="/starships"><i className="fa-solid fa-shuttle-space"></i> Starships</Link></li>


            <li><Link to="/planets"><i className="fa-solid fa-earth-americas"></i> Planets</Link></li>

            <li><Link to="/vehicles"><i className="fa-solid fa-motorcycle"></i> Vehicles</Link></li>

            <li><Link to="/species"><i className="fa-solid fa-robot"></i> Species</Link></li>

            <li><a href="https://github.com/SergioCoitino" target="_blank"><i className="fa-brands fa-github"></i> Github</a></li>

            <li><a href="https://www.instagram.com/sergio.coitino/" target="_blank"><i className="fa-brands fa-instagram"></i> Instagram</a></li>

            <li><a href="https://www.linkedin.com/in/sergiocoitino/" target="_blank"><i className="fa-brands fa-linkedin-in"></i> LinkedIn</a></li>

          </ul>
        </nav>        
    </div> */}
    <nav className="navegacao">
      <ul className="menu">

            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/">Home</NavLink></li>

            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/characters">Characters</NavLink></li>
            
            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/starships">Starships</NavLink></li>

            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/planets">Planets</NavLink></li>

            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/vehicles">Vehicles</NavLink></li>

            <li ><NavLink className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} to="/species">Species</NavLink></li>

            <ul class="social-media">

                  <a className="nav-item" href="https://www.instagram.com/sergio.coitino/" target="_blank">
                      <i class="fa-brands fa-instagram"></i>
                  </a>
                  
                  <a className="nav-item" href="https://www.linkedin.com/in/sergiocoitino/" target="_blank" >
                      <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  
                  <a className="nav-item" href="https://github.com/SergioCoitino" target="_blank">
                      <i class="fa-brands fa-github"></i>
                  </a>

            </ul>          
      </ul>        
        

    </nav>   
    </>

  );
}

export default Header;
