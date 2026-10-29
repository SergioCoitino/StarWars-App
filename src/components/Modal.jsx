// Modal.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Modal({ visible, onClose, children }) {
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, onClose]);

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
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
