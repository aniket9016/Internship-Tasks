import React from "react";
import PropTypes from "prop-types";

function CommonModal({ show, title, body, footer, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">{body}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

CommonModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  body: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default CommonModal;
