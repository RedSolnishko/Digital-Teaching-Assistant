import React from "react";
import PropTypes from "prop-types";
import SuccessIcon from "../assets/svg/check-circle.svg?react";
import ErrorIcon from "../assets/svg/alert-circle.svg?react";
import CloseIcon from "../assets/svg/x.svg?react";

/**
 * Компонент уведомления (Alert).
 * Отображает сообщение с иконкой успеха или ошибки и опциональной кнопкой закрытия.
 *
 * @param {string} [type="success"] - Тип уведомления: 'success' или 'error'.
 * @param {string} title - Заголовок уведомления.
 * @param {string} message - Текст сообщения.
 * @param {Function} [onClose] - Обработчик закрытия уведомления.
 */
const Alert = ({ type = "success", title, message, onClose }) => {
  // Определяем, является ли уведомление успешным
  const isSuccess = type === "success";

  return (
    <div className={`alert alert--${type}`}>
      {/* Иконка уведомления */}
      <div className="alert__icon">
        {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
      </div>
      {/* Содержимое уведомления */}
      <div className="alert__content">
        <strong className="alert__title">{title}</strong>
        <p className="alert__message">{message}</p>
      </div>
      {/* Кнопка закрытия, если передан onClose */}
      {onClose && (
        <button className="alert__close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

// Проверка типов пропсов
Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error"]),
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert;