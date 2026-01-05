# Star Wars Data Explorer

> 📘 **Read this documentation in Spanish:** [README.es.md](README.es.md)

---

## 📌 Project Overview

**Star Wars Data Explorer** is a web application designed to consume and display structured data from the public **SWAPI (Star Wars API)** while integrating a **custom-built image API** that provides visual representations aligned 1:1 with SWAPI resources.

This project is **not a portfolio**, but a functional application focused on:

* Robust API consumption
* Correct data-to-image mapping
* Graceful handling of external API instability
* Clean and scalable frontend architecture

---

## 🎯 Main Objectives

* Consume paginated data from SWAPI
* Integrate a secondary, custom image API
* Guarantee correct ID mapping between APIs
* Handle API failures without breaking the UI
* Deploy a production-ready Single Page Application (SPA)

---

## 🧠 Architectural Principles

### Separation of Concerns

The project follows a clear separation of responsibilities:

* **Pages**: Route-level views (Characters, Planets, etc.)
* **Components**: Reusable UI elements
* **Hooks**: Data fetching and pagination logic
* **Utils**: Formatting helpers and ID resolvers

This structure allows scalability, maintainability, and clean reasoning.

---

## 🔑 Reliable ID Mapping (Key Design Decision)

SWAPI does **not guarantee stable ordering** of results.

To avoid incorrect data-image pairing:

* IDs are **never inferred from array indexes**
* The canonical ID is extracted directly from the resource URL

Example:

```
https://swapi.dev/api/people/1/ → ID = 1
```

This ID is used consistently across both data and image APIs.

---

## 🖼️ Custom Image API Integration

The application consumes a custom image API:

```
https://starwarsgallery.netlify.app/assets/{resource}/{id}.jpg
```

### Characteristics:

* 1:1 ID mapping with SWAPI
* Resource-based structure (people, planets, starships, etc.)
* Fallback images for missing assets

This ensures visual consistency even when data order changes.

---

## 🔁 Pagination & Navigation

* Pagination handled using SWAPI `next` and `previous` links
* Navigation buttons are rendered only when valid pages exist
* No disabled or misleading UI controls

---

## 🚨 Error Handling & Routing

* Image fallback handling
* Custom 404 page for invalid routes
* SPA routing configured for production (Netlify redirects)

---

## 🚀 Deployment

The application is deployed on **Netlify** as a Single Page Application.

Special configuration ensures:

* Direct access to nested routes
* Proper handling of client-side routing
* Consistent behavior on page refresh

---

## 🛠️ Tech Stack

* React
* React Router
* JavaScript (ES6+)
* CSS
* SWAPI (Star Wars API)
* Custom Image API
* Netlify

---

## 🌍 Live Links

* **Live App:** [https://star-warsapp.netlify.app/](https://star-warsapp.netlify.app/)
* **GitHub Repository:** [https://github.com/SergioCoitino/StarWars-App](https://github.com/SergioCoitino/StarWars-App)

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
