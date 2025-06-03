import React from "react";

/**
 * Универсальный компонент кнопки
 * @param {ReactNode} leftIcon - Иконка/изображение слева (ReactNode или путь к изображению)
 * @param {ReactNode} rightIcon - Иконка/изображение справа (ReactNode или путь к изображению)
 * @param {ReactNode} userIcon - Пользовательская иконка внутри специального контейнера
 * @param {string} variant - 'primary' | 'secondary' | 'wb' | 'wb--small'| 'share | 'contrast' | 'text' | 'text--small' | 'default' | 'light' | 'little' | 'littlebg' | 'user' | 'menu'
 * @param {React.ReactNode} children - Текст кнопки
 * @param {object} props - Остальные пропсы (onClick, disabled и т.д.)
 */
const Button = ({
  variant = "primary",
  leftIcon,
  rightIcon,
  userIcon,
  children,
  ...props
}) => {
  const renderIcon = (icon, position = "left") => {
    if (!icon) return null;

    const iconClass = `button__icon ${position === "left" ? "button__icon-left" : "button__icon-right"}`;

    if (typeof icon === "string") {
      return <img src={icon} alt={`${position} icon`} className={iconClass} />;
    }
    return icon;
  };

  return (
    <button
      className={`button button__${variant} ${!children ? "button--icon-only" : ""}`}
      {...props}
    >
      {renderIcon(leftIcon, "left")}
      {userIcon && <div className="button__user-container">{userIcon}</div>}
      {children && <span className="button__text">{children}</span>}
      {renderIcon(rightIcon, "right")}
    </button>
  );
};

export default Button;
