import React from "react";
import PropTypes from "prop-types";

/**
 * Компонент вкладки (Tab), поддерживает бейдж (счетчик).
 *
 * @param {string} label - Название вкладки
 * @param {number} badge - Число в бейдже (если есть)
 * @param {Function} onClick - Обработчик клика
 */
const Tab = ({ label, badge, onClick }) => {
  return (
    <button className="tab" onClick={onClick}>
      <span className="tab__label">{label}</span>
      {badge !== undefined && <span className="tab__badge">{badge > 99 ? "99+" : badge}</span>}
    </button>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  badge: PropTypes.number,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  badge: undefined,
  onClick: () => {},
};

export default Tab;
