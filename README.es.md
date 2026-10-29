# Star Wars App

> 📘 **Read this documentation in English:** [README.md](README.md)

---

## 📌 Descripción General

**Star Wars App** es una aplicación web desarrollada para consumir datos estructurados desde **SWAPI (Star Wars API)** e integrarlos con una **API propia de imágenes**, garantizando una correspondencia exacta entre los datos y sus representaciones visuales.

Este proyecto **no es un portfolio**, sino una aplicación funcional enfocada en:

* Consumo robusto de APIs
* Correcta asociación entre datos e imágenes
* Manejo elegante de fallos externos
* Arquitectura frontend clara y escalable

---

## 🎯 Objetivos del Proyecto

* Consumir datos paginados desde SWAPI
* Integrar una API secundaria de imágenes propia
* Garantizar la correcta correspondencia de IDs
* Mantener la experiencia de usuario estable ante fallos
* Desplegar una SPA lista para producción

---

## 🧠 Principios de Arquitectura

### Separación de Responsabilidades

La aplicación está organizada de la siguiente forma:

* **Pages**: Vistas asociadas a rutas
* **Components**: Componentes reutilizables
* **Hooks**: Lógica de consumo de datos y paginación
* **Utils**: Funciones auxiliares y formateadores

Esto facilita el mantenimiento y la escalabilidad.

---

## 🔑 Manejo Correcto de IDs (Decisión Crítica)

SWAPI **no garantiza el orden de los resultados**.

Para evitar errores:

* Nunca se usan índices del array
* El ID se extrae directamente desde la URL del recurso

Ejemplo:

```
https://swapi.dev/api/people/1/ → ID = 1
```

Este ID se utiliza de forma consistente para consumir la API de imágenes.

---

## 🖼️ Integración con la API de Imágenes

La aplicación consume una API propia de imágenes:

```
https://starwarsgallery.netlify.app/assets/{resource}/{id}.jpg
```

### Características:

* Correspondencia exacta 1:1 con SWAPI
* Organización por tipo de recurso
* Imágenes de respaldo (fallback)

Esto asegura coherencia visual incluso si el orden de los datos cambia.

---

## 🔁 Paginación y Navegación

* Paginación basada en enlaces `next` y `previous` de SWAPI
* Botones visibles solo cuando la página existe
* Interfaz clara y sin acciones engañosas

---

## 🚨 Manejo de Errores y Rutas

* Fallback visual para imágenes inexistentes
* Página 404 personalizada
* Configuración SPA correcta para Netlify

---

## 🚀 Deploy

La aplicación está desplegada en **Netlify** como una SPA.

Incluye configuración para:

* Rutas directas
* Refrescos de página
* Navegación cliente sin errores

---

## 🛠️ Tecnologías Utilizadas

* React
* React Router
* JavaScript (ES6+)
* CSS
* SWAPI
* API de imágenes propia
* Netlify

---

## 🌍 Enlaces

* **Aplicación en vivo:** [https://star-warsapp.netlify.app/](https://star-warsapp.netlify.app/)
* **Galería y API de imágenes complementaria:** [https://starwarsgallery.netlify.app/](https://starwarsgallery.netlify.app/)
* **Repositorio GitHub:** [https://github.com/SergioCoitino/StarWars-App](https://github.com/SergioCoitino/StarWars-App)

---

## 👤 Autor y Enlaces

- **Portfolio:** https://sergio-coitino.netlify.app/
- **LinkedIn:** https://www.linkedin.com/in/sergio-coitino/
- **GitHub:** https://github.com/SergioCoitino

---

## ⭐ Feedback y Apoyo

Si este proyecto te resultó útil o interesante:

- ⭐ Considera **dejar una estrella en GitHub**
- 📝 Comentarios, sugerencias y evaluaciones son bienvenidas

Tu apoyo ayuda a mejorar y evolucionar el proyecto.

---


## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más información.
