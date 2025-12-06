// ItemCard.jsx
import PropTypes from "prop-types";
import { useState } from "react";

export default function ItemCard({ name, image, fallback, onClick }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div
      className="cards"
      style={{ backgroundImage: `url(${imgSrc})` }}
      onClick={onClick}
    >
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
};
