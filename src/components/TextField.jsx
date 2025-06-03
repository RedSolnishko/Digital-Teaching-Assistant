import React from "react";

/**
 * Компонент текстового поля (TextField).
 * Поддерживает ввод текста с меткой, иконками, текстом ошибки и вспомогательным текстом.
 *
 * @param {string} [label] - Метка поля ввода.
 * @param {string} value - Значение поля.
 * @param {Function} onChange - Обработчик изменения значения.
 * @param {Function} [onBlur] - Обработчик потери фокуса.
 * @param {string} [placeholder=""] - Текст-заполнитель (placeholder).
 * @param {boolean} [disabled] - Флаг отключения поля.
 * @param {string} [error] - Текст ошибки.
 * @param {string} [helperText] - Вспомогательный текст.
 * @param {React.ReactNode} [leftIcon] - Иконка слева.
 * @param {React.ReactNode} [rightIcon] - Иконка справа.
 * @param {string} type - Тип поля ввода: 'text' | 'password' | 'email' и т.д.
 */
const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  disabled = false,
  error = "",
  helperText = "",
  leftIcon,
  rightIcon,
  type = "text",
}) => {
  return (
    <div className={`text-field ${error ? "text-field--error" : ""} ${disabled ? "text-field--disabled" : ""}`}>
      {/* Обертка для поля ввода и иконок */}
      <div className={`text-field__wrapper ${leftIcon ? "text-field__wrapper--has-left-icon" : ""} ${rightIcon ? "text-field__wrapper--has-right-icon" : ""} ${value ? "text-field__wrapper--has-value" : ""}`}>
        {/* Метка поля */}
        {label && <label className="text-field__label">{label}</label>}
        {/* Левая иконка */}
        {leftIcon && <div className="text-field__icon text-field__icon--left">{leftIcon}</div>}
        {/* Поле ввода */}
        <input
          className="text-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
        {/* Правая иконка */}
        {rightIcon && <div className="text-field__icon text-field__icon--right">{rightIcon}</div>}
      </div>
      {/* Вспомогательный текст */}
      {helperText && (
        <span className="text-field__helper">{helperText}</span>
      )}
      {/* Текст ошибки */}
      {error && (
        <span className="text-field__error">{error}</span>
      )}
    </div>
  );
};

export default TextField;