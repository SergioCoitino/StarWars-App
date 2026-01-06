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
  const { items, next, prev, goNext, goPrev } = useSwapiPaginated(endpoint);
  const [selected, setSelected] = React.useState(null);

  const getIdFromUrl = (url) => {
    return url.split("/").filter(Boolean).pop();
  };

  return (
    <div className="main-container">

      {/* GRID DE ITEMS */}
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

      {/* MODAL */}
      <Modal visible={!!selected} onClose={() => setSelected(null)}>
        {selected && renderDetails(selected, selected.id)}
      </Modal>

      {/* PAGINACIÓN */}

      <div className="buttons">
        <button
          onClick={goPrev}
          style={{ visibility: prev ? "visible" : "hidden" }}
        >
          Previous
        </button>

        <button
          onClick={goNext}
          style={{ visibility: next ? "visible" : "hidden" }}
        >
          Next
        </button>
      </div>

    </div>
  );
}
