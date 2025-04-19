import React from "react";
import DefaultLogo from "../../assets/svg/default-logo.svg?react"; // SVG-заглушка

/**
 * Компонент карточки партнера
 * @param {string} logo - Логотип партнера (если нет, используется заглушка)
 * @param {string} name - Название партнера
 * @param {string} link - Ссылка на сайт партнера
 * @param {string} contact - Контактное лицо партнера
 * @param {string} phone - Телефон партнера
 * @param {string} email - Электронная почта партнера
 * @param {Object} socials - Объект с социальными ссылками и SVG-иконками
 */
const PartnerCard = ({ logo, name, link, contact, phone, email, socials }) => {
  return (
    <div className="partner-card">
      {/* Логотип партнера */}
      <div className="partner-card__header">
        {logo ? (
          <img src={logo} alt={name} className="partner-card__logo" />
        ) : (
          <DefaultLogo className="partner-card__logo" />
        )}
      </div>

      {/* Информация о партнере */}
      <div className="partner-card__info">
        <h4 className="partner-card__name text-h4">{name}</h4>
        <a href={link} className="partner-card__link" target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </div>

      {/* Контакты */}
      <div className="partner-card__content">
        <div className="partner-card__section">
          <span className="partner-card__label">Контактное лицо</span>
          <p className="partner-card__text">{contact}</p>
        </div>

        <div className="partner-card__section">
          <span className="partner-card__label">Телефон</span>
          <a href={`tel:${phone}`} className="partner-card__text partner-card__clickable">
            {phone}
          </a>
        </div>

        <div className="partner-card__section">
          <span className="partner-card__label">Электронная почта</span>
          <a href={`mailto:${email}`} className="partner-card__text partner-card__clickable">
            {email}
          </a>
        </div>
      </div>

      {/* Социальные сети */}
      {socials && (
        <div className="partner-card__socials">
          {Object.entries(socials).map(([key, { link, icon: Icon }]) => (
            <a key={key} href={link} target="_blank" rel="noopener noreferrer" className="partner-card__social-icon">
              <Icon className="partner-card__social-svg" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerCard;
