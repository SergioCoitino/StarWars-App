import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import Modal from "./Modal";
import useSwapiPaginated from "../hooks/useSwapiPaginated";
import useFavorites from "../hooks/useFavorites";
import "../pages/pages.css";

export default function SwapiList({
  title,
  endpoint,
  imagePath,
  fallback,
  renderDetails
}) {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { items, next, prev, goNext, goPrev, loading, error } = useSwapiPaginated(
    endpoint,
    debouncedSearch
  );

  const { isFavorite, toggleFavorite, getFavoritesByResource } = useFavorites();
  const [selected, setSelected] = useState(null);

  // Debounce do input de busca em 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const getIdFromUrl = (url) => {
    return url ? url.split("/").filter(Boolean).pop() : "";
  };

  const handlePrev = () => {
    goPrev();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    goNext();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const favoriteItems = getFavoritesByResource(endpoint);
  const displayedItems = showFavoritesOnly ? favoriteItems : items;

  return (
    <div className="main-container">
      {/* TOOLBAR: BUSCA E FILTRO DE FAVORITOS */}
      <div className="toolbar-container">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${endpoint}...`}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (showFavoritesOnly) setShowFavoritesOnly(false);
            }}
            aria-label={`Search ${endpoint}`}
          />
          {searchInput && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchInput("")}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <button
          type="button"
          className={`filter-fav-btn ${showFavoritesOnly ? "active" : ""}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          title="Toggle favorites filter"
        >
          <i className="fa-solid fa-star" aria-hidden="true"></i>
          <span>Favorites ({favoriteItems.length})</span>
        </button>
      </div>

      {loading && !showFavoritesOnly && <p className="status-message">Loading...</p>}
      {!loading && error && !showFavoritesOnly && <p className="status-message">{error}</p>}

      {/* MENSAGEM QUANDO NÃO HÁ FAVORITOS */}
      {showFavoritesOnly && favoriteItems.length === 0 && (
        <p className="status-message">
          No favorites saved yet. Click the star on any card to favorite!
        </p>
      )}

      {/* MENSAGEM QUANDO A BUSCA NÃO RETORNA RESULTADOS */}
      {!loading && !error && !showFavoritesOnly && items.length === 0 && (
        <p className="status-message">No results found for "{debouncedSearch}"</p>
      )}

      {/* GRID DE ITEMS */}
      {(!loading || showFavoritesOnly) && displayedItems.length > 0 && (
        <div className="main-content">
          {displayedItems.map((item) => {
            const id = item.id || getIdFromUrl(item.url);
            const fav = isFavorite(id, endpoint);

            return (
              <ItemCard
                key={id}
                name={item.name}
                image={imagePath(id)}
                fallback={fallback}
                isFavorite={fav}
                onToggleFavorite={() => toggleFavorite({ ...item, id }, endpoint)}
                onClick={() => setSelected({ ...item, id })}
              />
            );
          })}
        </div>
      )}

      {/* MODAL */}
      <Modal visible={!!selected} itemName={selected?.name} onClose={() => setSelected(null)}>
        {selected && renderDetails(selected, selected.id)}
      </Modal>

      {/* PAGINAÇÃO */}
      {!showFavoritesOnly && (prev || next) && (
        <div className="buttons">
          <button
            onClick={handlePrev}
            style={{ visibility: prev && !loading ? "visible" : "hidden" }}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            style={{ visibility: next && !loading ? "visible" : "hidden" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
