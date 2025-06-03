import React from "react";
import PlaceholderIcon from "../assets/svg/placeholder.svg?react";

/**
 * Компонент-заглушка для изображений.
 * Отображает изображение или иконку-заглушку, если изображение не задано.
 *
 * @param {string} [img] - URL изображения.
 * @param {string} [variant="rating-card"] - Вариант заглушки: 'rating-card' | 'profile' | 'menu' | 'rating-list'.
 * @param {string} [className=""] - Дополнительные CSS-классы.
 */
const ImagePlaceholder = ({ img, variant = "rating-card", className = "" }) => {
  return (
    <div className={`image-placeholder image-placeholder--${variant} ${className}`}>
      {img ? (
        // Отображение изображения, если URL передан
        <img src={img} alt="Image" className="image-placeholder__img" />
      ) : (
        // Иконка-заглушка, если изображение отсутствует
        <PlaceholderIcon className="image-placeholder__icon" />
      )}
    </div>
  );
};

export default ImagePlaceholder;