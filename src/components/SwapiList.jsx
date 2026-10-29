import React from "react";
import ItemCard from "./ItemCard";
import Modal from "./Modal";
import useSwapiPaginated from "../hooks/useSwapiPaginated";
import "../pages/pages.css";

export default function SwapiList({
  title,
  endpoint,
  imagePath,
  fallback,
  renderDetails
}) {
  const { items, next, prev, goNext, goPrev, loading, error } = useSwapiPaginated(endpoint);
  const [selected, setSelected] = React.useState(null);

  const getIdFromUrl = (url) => {
    return url.split("/").filter(Boolean).pop();
  };

  const handlePrev = () => {
    goPrev();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    goNext();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-container">

      {loading && <p className="status-message">Loading...</p>}
      {!loading && error && <p className="status-message">{error}</p>}

      {/* GRID DE ITEMS */}
      {!loading && !error && (
        <div className="main-content">
          {items.map((item) => {
            const id = getIdFromUrl(item.url);

            return (
              <ItemCard
                key={id}
                name={item.name}
                image={imagePath(id)}
                fallback={fallback}
                onClick={() => setSelected({ ...item, id })}
              />
            );
          })}
        </div>
      )}

      {/* MODAL */}
      <Modal visible={!!selected} onClose={() => setSelected(null)}>
        {selected && renderDetails(selected, selected.id)}
      </Modal>

      {/* PAGINACIÓN */}

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

    </div>
  );
}
