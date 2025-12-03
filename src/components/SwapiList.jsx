// src/components/SwapiList.jsx
import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/swapi.css";

/**
 * SwapiList - Componente universal para listar endpoints de SWAPI.
 * Props:
 *  - title: texto del encabezado
 *  - endpoint: endpoint de swapi (people, starships, planets, vehicles, species)
 *  - imgFolder: carpeta en tu CDN con imágenes (characters, starships, planets...)
 */
export default function SwapiList({ title, endpoint, imgFolder }) {
  const [items, setItems] = useState([]);
  const [pageUrl, setPageUrl] = useState(`https://swapi.dev/api/${endpoint}/`);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalData, setModalData] = useState(null);
  // mapa id -> imageUrl (ya verificada: main o fallback)
  const [imagesMap, setImagesMap] = useState({});

  // fallback general (colócalo en public/assets)
  const FALLBACK = "/src/assets/fallback-image.png";

  // -------------------------
  // Preloader de imágenes
  // -------------------------
  // Devuelve la url que funciona (main o fallback).
  const preloadImage = useCallback(async (mainUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = mainUrl;
      img.onload = () => resolve(mainUrl);
      img.onerror = () => resolve(FALLBACK);
      // En caso de que la imagen ya esté cached y fail no llame, timeout de seguridad:
      setTimeout(() => {
        // Si no cargó/ni dio error en 3s, resolvemos con fallback
        if (!img.complete) resolve(FALLBACK);
      }, 3000);
    });
  }, []);

  // -------------------------
  // Cargar items + preloader de sus imágenes
  // -------------------------
  async function loadItems(url) {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();

      setItems(json.results || []);
      setNextUrl(json.next);
      setPrevUrl(json.previous);
      setPageUrl(url);

      // Preload de imágenes en background (no bloqueante)
      const map = {};
      const preloadPromises = (json.results || []).map(async (it) => {
        const id = it.url.replace(/\D/g, "");
        const mainImageUrl = `https://starwarsgallery.netlify.app/assets/${imgFolder}/${id}.jpg`;
        const okUrl = await preloadImage(mainImageUrl);
        map[id] = okUrl;
      });

      await Promise.all(preloadPromises);
      setImagesMap((prev) => ({ ...prev, ...map }));
    } catch (e) {
      console.error("Error loading SWAPI items:", e);
      alert("Error al cargar datos. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // carga inicial
    loadItems(pageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------
  // Modal handlers (robustos)
  // -------------------------
  function openModal(item) {
    setModalData(item);
  }


  function closeModal() {
    setModalData(null);
  }

  // cerrar con ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // -------------------------
  // Render
  // -------------------------
  return (
    <>
      <Header />

      <div className="main-container">
        <h2>{title.toUpperCase()}</h2>

        {loading && <p style={{ color: "gold" }}>Cargando...</p>}

        <div className="main-content">
          {items.map((item) => {
            // Id y url de imagen pre-procesada (si no, fallback)
            const id = item.url.replace(/\D/g, "");
            const bgUrl = imagesMap[id] || FALLBACK;

            return (
              <div
                key={item.url}
                className="cards"
                style={{ backgroundImage: `url(${bgUrl})` }}
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openModal(item); }}
                aria-label={`Ver detalles de ${item.name || item.title}`}
              >
                <div className="item-name-bg">
                  <span className="item-title">{item.name || item.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="buttons">
          <button
            id="back-button"
            disabled={!prevUrl}
            onClick={() => loadItems(prevUrl)}
          >
            Anterior
          </button>

          <button
            id="next-button"
            disabled={!nextUrl}
            onClick={() => loadItems(nextUrl)}
          >
            Próxima
          </button>
        </div>
      </div>

      {/* Modal: se renderiza condicionalmente y tiene comportamiento robusto */}
      {modalData && (
        <div className="modal" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Imagen del modal (usa imagesMap si existe) */}
            <div
              className="item-image"
              style={{
                backgroundImage: `url(${imagesMap[modalData.url.replace(/\D/g, "")] || FALLBACK})`,
              }}
            />

            {/* Contenido genérico: lo puedes personalizar por endpoint */}
            <span className="item-details">
              Nombre: {modalData.name || modalData.title}
            </span>

            {/* Algunos campos comunes de SWAPI (si existen) */}
            {modalData.model && <span className="item-details">Modelo: {modalData.model}</span>}
            {modalData.manufacturer && <span className="item-details">Fabricante: {modalData.manufacturer}</span>}
            {modalData.climate && <span className="item-details">Clima: {modalData.climate}</span>}
            {modalData.population && <span className="item-details">Población: {modalData.population}</span>}

            <div style={{ marginTop: 8 }}>
              <button onClick={closeModal} style={{ cursor: "pointer" }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
