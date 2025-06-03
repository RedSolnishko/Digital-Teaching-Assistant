import React from "react";

/**
 * Универсальный компонент кнопки.
 * Поддерживает различные варианты стилизации, иконки и пользовательский контейнер.
 *
 * @param {string} [variant="primary"] - Вариант стилизации кнопки: 'primary' | 'secondary' | 'wb' | 'wb--small' | 'share' | 'contrast' | 'text' | 'text--small' | 'default' | 'light' | 'little' | 'littlebg' | 'user' | 'menu'.
 * @param {React.ReactNode} [leftIcon] - Иконка слева (React-компонент или путь к изображению).
 * @param {React.ReactNode} [rightIcon] - Иконка справа (React-компонент или путь к изображению).
 * @param {React.ReactNode} [userIcon] - Пользовательская иконка в специальном контейнере.
 * @param {React.ReactNode} children - Текст или содержимое кнопки.
 * @param {object} props - Дополнительные пропсы (onClick, disabled и т.д.).
 */
const Button = ({
  variant = "primary",
  leftIcon,
  rightIcon,
  userIcon,
  children,
  ...props
}) => {
  /**
   * Рендерит иконку (слева или справа).
   * @param {React.ReactNode|string} icon - Иконка или путь к изображению.
   * @param {string} [position="left"] - Позиция иконки: 'left' или 'right'.
   * @returns {React.ReactNode|null} - Отрендеренная иконка или null.
   */
  const renderIcon = (icon, position = "left") => {
    if (!icon) return null;

    const iconClass = `button__icon ${position === "left" ? "button__icon-left" : "button__icon-right"}`;

    // Если иконка — строка, рендерим как изображение
    if (typeof icon === "string") {
      return <img src={icon} alt={`${position} icon`} className={iconClass} />;
    }
    // Иначе рендерим как React-компонент
    return icon;
  };

  return (
    <button
      className={`button button__${variant} ${!children ? "button--icon-only" : ""}`}
      {...props}
    >
      {/* Левая иконка */}
      {renderIcon(leftIcon, "left")}
      {/* Пользовательская иконка в контейнере */}
      {userIcon && <div className="button__user-container">{userIcon}</div>}
      {/* Текст кнопки */}
      {children && <span className="button__text">{children}</span>}
      {/* Правая иконка */}
      {renderIcon(rightIcon, "right")}
    </button>
  );
};

export default Button;