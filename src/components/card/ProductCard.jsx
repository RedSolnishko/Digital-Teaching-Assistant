import React from "react";
import CoinIcon from "../../assets/svg/coin.svg?react";
import Button from "../Button";

/**
 * Компонент карточки продукта
 * @param {string} image - Путь к изображению продукта
 * @param {string} price - Цена продукта
 * @param {string} title - Название продукта
 * @param {function} onClaim - Функция, вызываемая при клике на кнопку "Получить"
 */
const ProductCard = ({ image, price, title, onClaim }) => {
  return (
    <div className="product-card">
      {/* Обертка для изображения продукта */}
      <div className="product-card__image-wrapper">
        {/* Изображение продукта */}
        <img src={image} alt={title} className="product-card__image" />
      </div>
      <div className="product-card__content">
        {/* Блок с ценой продукта */}
        <div className="product-card__price">
          {/* Иконка монеты рядом с ценой */}
          <CoinIcon className="product-card__icon" />
          <span>{price}</span>
        </div>
        
        {/* Заголовок продукта */}
        <h4 className="product-card__title text-h4">{title}</h4>
        
        {/* Обертка для кнопки "Получить" */}
        <div className="product-card__button-wrapper">
          {/* Кнопка, при клике на которую выполняется переданная функция onClaim */}
          <Button
          variant="primary" >
          Получить
          </Button>
      
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
