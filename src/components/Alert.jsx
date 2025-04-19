import React from "react";
import PropTypes from "prop-types";
import SuccessIcon from "../assets/svg/check-circle.svg?react"
import ErrorIcon from "../assets/svg/alert-circle.svg?react"
import CloseIcon from "../assets/svg/x.svg?react"

const Alert = ({ type = "success", title, message, onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className={`alert alert--${type}`}>
      <div className="alert__icon">
        {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      </div>
      <div className="alert__content">
        <strong className="alert__title">{title}</strong>
        <p className="alert__message">{message}</p>
      </div>
      {onClose && (
        <button className="alert__close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error"]),
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert;
