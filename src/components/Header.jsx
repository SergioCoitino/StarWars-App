import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

export default function Header() {
  const navItems = [
    { path: "/", label: "Home", icon: "fa-solid fa-house" },
    { path: "/characters", label: "Characters", icon: "fa-solid fa-users" },
    { path: "/starships", label: "Starships", icon: "fa-solid fa-shuttle-space" },
    { path: "/planets", label: "Planets", icon: "fa-solid fa-earth-americas" },
    { path: "/vehicles", label: "Vehicles", icon: "fa-solid fa-motorcycle" },
    { path: "/species", label: "Species", icon: "fa-solid fa-robot" },
  ];

  const socialLinks = [
    { url: "https://www.instagram.com/sergio.coitino/", label: "Instagram", icon: "fa-brands fa-instagram" },
    { url: "https://www.linkedin.com/in/sergiocoitino/", label: "LinkedIn", icon: "fa-brands fa-linkedin-in" },
    { url: "https://github.com/SergioCoitino", label: "GitHub", icon: "fa-brands fa-github" },
  ];

  return (
    <>
      {/* MOBILE NAV */}
      <div className="nav-mobile">
        <input type="checkbox" id="check" className="menu-check" />

        <label htmlFor="check" className="menu-btn">
          <i className="fas fa-bars" id="btn"></i>
          <i className="fas fa-times" id="cancel"></i>
        </label>

        <nav className="sidebar menu-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className={item.icon}></i> {item.label}
                </NavLink>
              </li>
            ))}

            {/* SOCIAL LINKS MOBILE */}
            {socialLinks.map((item, index) => (
              <li key={`s-${index}`}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <i className={item.icon}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* DESKTOP NAV */}
      <nav className="navegacao">
        <ul className="menu">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <ul className="social-media">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <a
                  className="nav-item"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </>
  );
}
