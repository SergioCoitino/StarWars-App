// ItemCard.jsx
import PropTypes from "prop-types";
import { useState } from "react";

export default function ItemCard({
  name,
  image,
  fallback,
  onClick,
  isFavorite = false,
  onToggleFavorite = null
}) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div
      className="cards"
      style={{ backgroundImage: `url(${imgSrc})` }}
      onClick={onClick}
    >
      {onToggleFavorite && (
        <button
          type="button"
          className={`favorite-card-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden="true"></i>
        </button>
      )}

      <div className="item-name-bg">
        <span className="item-title">{name}</span>
      </div>

      {/* Manejo de fallback cuando la imagen falla */}
      <img
        src={imgSrc}
        alt={name}
        style={{ display: "none" }}
        onError={() => setImgSrc(fallback)}
      />
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};
