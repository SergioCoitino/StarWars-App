// Modal.jsx
import PropTypes from "prop-types";

export default function Modal({ visible, onClose, children }) {
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
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
