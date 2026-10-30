// Modal.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";

const AMAZON_AFFILIATE_TAG = "sergiocoitino-20";

export default function Modal({ visible, onClose, itemName, children }) {
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose]);

  const getAmazonUrl = (name) => {
    if (!name) return "https://www.amazon.com/s?k=Star+Wars";
    const query = encodeURIComponent(`Star Wars ${name}`);
    const tagParam = AMAZON_AFFILIATE_TAG ? `&tag=${AMAZON_AFFILIATE_TAG}` : "";
    return `https://www.amazon.com/s?k=${query}${tagParam}`;
  };

  return (
    <div
      className="modal"
      style={{ visibility: visible ? "visible" : "hidden" }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {children}

        {/* BOTOES DE ACAO (SEM EMOJIS, FORMATO DE BOTAO REAL) */}
        <div className="modal-actions">
          {itemName && (
            <a
              href={getAmazonUrl(itemName)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-modal-amazon"
            >
              Ver na Amazon
            </a>
          )}

          <a
            href="https://buymeacoffee.com/csergioferh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modal-coffee"
          >
            Apoiar Projeto
          </a>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  itemName: PropTypes.string,
  children: PropTypes.node,
};
