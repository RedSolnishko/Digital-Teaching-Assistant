import React from "react";
import CompletedIcon from "../../assets/svg/check.svg?react";
import CoinIcon from "../../assets/svg/coin.svg?react";

/**
 * Компонент карточки уровня
 * @param {string} name - Название уровня
 * @param {JSX.Element | string} icon - Иконка уровня (SVG-компонент или путь к изображению)
 * @param {boolean} completed - Статус выполнения уровня
 * @param {number} cost - Стоимость уровня (если не завершён)
 */

const LevelCard = ({ name, icon, completed, cost }) => {
  return (
    <div className={`level-card ${completed ? "completed" : ""}`}>
      <div className="level-card__icon">
        {typeof icon === "string" ? <img src={icon} alt={name} /> : icon}
      </div>
      <div className="level-card__content">
        <h4 className="level-card__name text-h4">{name}</h4>
        {completed ? (
          <div className="level-card__completed">
            <CompletedIcon />
          </div>
        ) : (
          <div className="level-card__cost">
            <CoinIcon />
            <span>{cost}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
