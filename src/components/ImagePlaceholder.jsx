import React from "react";
import PlaceholderIcon from "../assets/svg/placeholder.svg?react";

/**
 * Компонент-заглушка для изображений
 * @param {string} img - URL изображения (если передан, заменяет иконку-заглушку)
 * @param {string} variant - Вариант заглушки ('rating-card' | 'profile' | 'menu' | 'rating-list')
 * @param {string} className - Дополнительные классы для кастомизации
 */
const ImagePlaceholder = ({ img, variant = "rating-card", className = "" }) => {
  return (
    <div className={`image-placeholder image-placeholder--${variant} ${className}`}>
      {img ? (
        <img src={img} alt="Image" className="image-placeholder__img" />
      ) : (
        <PlaceholderIcon className="image-placeholder__icon" />
      )}
    </div>
  );
};

export default ImagePlaceholder;
