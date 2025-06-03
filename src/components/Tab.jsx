import React from "react";
import PropTypes from "prop-types";

/**
 * Компонент вкладки (Tab).
 * Поддерживает отображение названия и бейджа с числом.
 *
 * @param {string} label - Название вкладки.
 * @param {number} [badge] - Число в бейдже (опционально).
 * @param {Function} [onClick] - Обработчик клика по вкладке.
 * @param {boolean} [active=false] - Активна ли вкладка.
 */
const Tab = ({ label, badge, onClick, active = false }) => {
  return (
    <button className={`tab ${active ? "tab--active" : ""}`} onClick={onClick}>
      {/* Название вкладки */}
      <span className="tab__label">{label}</span>
      {/* Бейдж, если задано число */}
      {badge !== undefined && <span className="tab__badge">{badge > 99 ? "99+" : badge}</span>}
    </button>
  );
};

// Проверка типов пропсов
Tab.propTypes = {
  label: PropTypes.string.isRequired,
  badge: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

// Значения пропсов по умолчанию
Tab.defaultProps = {
  badge: undefined,
  onClick: () => {},
  active: false,
};

export default Tab;