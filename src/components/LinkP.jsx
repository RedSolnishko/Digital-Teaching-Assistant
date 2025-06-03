import React from "react";
import LinkIcon from "../assets/svg/link.svg?react"; 

/**
 * Универсальный компонент ссылки.
 * Поддерживает различные стили и иконки.
 *
 * @param {string} [variant="default"] - Тип ссылки: 'default' | 'default-small' | 'icon' | 'icon-small' | 'social'.
 * @param {string} href - URL ссылки.
 * @param {React.ReactNode} [icon] - Кастомная SVG-иконка.
 * @param {string} children - Текст ссылки.
 * @param {object} props - Дополнительные пропсы (target, rel и т.д.).
 */
const LinkP = ({ variant = "default", href, icon, children, ...props }) => {
  return (
    <a href={href} className={`link link--${variant}`} {...props}>
      {/* Иконка для вариантов 'icon', 'icon-small' или 'social' */}
      {(variant === "icon" || variant === "icon-small") && (
        icon ? <span className="link__icon">{icon}</span> : <LinkIcon className="link__icon" />
      )}
      {variant === "social" && icon && <span className="link__icon">{icon}</span>}
      {/* Текст ссылки */}
      <span className="link__text">{children}</span>
    </a>
  );
};

export default LinkP;