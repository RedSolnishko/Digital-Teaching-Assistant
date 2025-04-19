import React from "react";
import LinkIcon from "../assets/svg/link.svg?react"; // SVG иконка ссылки

/**
 * Универсальный компонент ссылки
 * @param {string} variant - Тип ссылки ('default', 'default-small', 'icon', 'icon-small', 'social')
 * @param {string} href - URL ссылки
 * @param {React.Element} icon - Кастомная SVG-иконка (если нужна)
 * @param {string} children - Текст ссылки
 * @param {object} props - Дополнительные пропсы
 */
const LinkP = ({ variant = "default", href, icon, children, ...props }) => {
  return (
    <a href={href} className={`link link--${variant}`} {...props}>
      {(variant === "icon" || variant === "icon-small") && (
        icon ? <span className="link__icon">{icon}</span> : <LinkIcon className="link__icon" />
      )}
      {variant === "social" && icon && <span className="link__icon">{icon}</span>}
      <span className="link__text">{children}</span>
    </a>
  );
};

export default LinkP;
