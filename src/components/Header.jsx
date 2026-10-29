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
    { url: "https://www.linkedin.com/in/sergio-coitino/", label: "LinkedIn", icon: "fa-brands fa-linkedin-in" },
    { url: "https://github.com/SergioCoitino", label: "GitHub", icon: "fa-brands fa-github" },
    { url: "https://sergio-coitino.netlify.app/", label: "Portfolio", icon: "fa-solid fa-user-tie" },
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
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className={item.icon}></i> {item.label}
                </NavLink>
              </li>
            ))}

            {/* SOCIAL LINKS MOBILE */}
            {socialLinks.map((item) => (
              <li key={item.label}>
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
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li>
            <ul className="social-media">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    className="nav-item"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <i className={item.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
