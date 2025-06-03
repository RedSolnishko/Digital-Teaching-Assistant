import React, { useState, useEffect, useRef } from "react";

/**
 * Компонент поля выбора (SelectField).
 * Поддерживает одиночный или множественный выбор с выпадающим списком.
 *
 * @param {string} [label] - Метка поля.
 * @param {string|string[]} value - Выбранное значение (ID или массив ID для множественного выбора).
 * @param {Function} onChange - Обработчик изменения значения.
 * @param {Function} [onBlur] - Обработчик потери фокуса.
 * @param {Function} [onOpen] - Обработчик открытия выпадающего списка.
 * @param {Function} [onClose] - Обработчик закрытия выпадающего списка.
 * @param {string} [error] - Текст ошибки.
 * @param {string} [helperText] - Вспомогательный текст.
 * @param {Array<{id: string, label: string}>} [options=[]] - Список опций.
 * @param {boolean} [isMulti=false] - Включён ли множественный выбор.
 * @param {boolean} [disabled=false] - Отключено ли поле.
 * @param {React.ReactNode} [leftIcon] - Иконка слева.
 * @param {React.ReactNode} [rightIcon] - Иконка справа.
 */
const SelectField = ({
  label,
  value,
  onChange,
  onBlur,
  onOpen,
  onClose,
  error,
  helperText,
  options = [],
  isMulti = false,
  disabled = false,
  leftIcon,
  rightIcon,
}) => {
  // Состояние для управления открытием выпадающего списка
  const [open, setOpen] = useState(false);
  // Ссылка на контейнер для обработки кликов вне поля
  const containerRef = useRef(null);

  // Обработчик кликов вне компонента для закрытия выпадающего списка
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        onClose?.();
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, onBlur]);

  /**
   * Переключает состояние выпадающего списка.
   */
  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => {
      const newState = !prev;
      newState ? onOpen?.() : onClose?.();
      return newState;
    });
  };

  /**
   * Обрабатывает выбор опции.
   * @param {string} id - ID выбранной опции.
   */
  const handleSelect = (id) => {
    if (isMulti) {
      const newValue = value.includes(id) ? value.filter((v) => v !== id) : [...value, id];
      onChange(newValue);
    } else {
      onChange(id);
      setOpen(false);
      onClose?.();
    }
  };

  // Проверяем, есть ли выбранное значение
  const hasValue = isMulti ? value.length > 0 : !!value;

  return (
    <div
      ref={containerRef}
      className={`select-field ${error ? "select-field--error" : ""} ${open ? "select-field--open" : ""} ${hasValue ? "select-field--has-value" : ""}`}
    >
      {/* Контрол для выбора */}
      <div
        className={`select-field__control ${disabled ? "select-field__control--disabled" : ""} ${leftIcon ? "select-field__control--has-left-icon" : ""} ${rightIcon ? "select-field__control--has-right-icon" : ""}`}
        onClick={toggleDropdown}
      >
        {label && <label className="select-field__label">{label}</label>}
        {leftIcon && <div className="select-field__icon select-field__icon--left">{leftIcon}</div>}
        {/* Отображаемое значение */}
        <div className="select-field__value">
          {isMulti
            ? options.filter((o) => value.includes(o.id)).map((o) => o.label).join(", ") || "Выберите значение"
            : options.find((o) => o.id === value)?.label || "Выберите значение"}
        </div>
        {rightIcon && <div className="select-field__icon select-field__icon--right">{rightIcon}</div>}
      </div>
      {/* Выпадающий список */}
      {open && (
        <ul className="select-field__menu">
          {options.map((option) => {
            const isChecked = isMulti ? value.includes(option.id) : value === option.id;
            return (
              <li
                key={option.id}
                className="select-field__item"
                onClick={() => handleSelect(option.id)}
              >
                {isMulti && (
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      checked={isChecked}
                      onChange={() => {}}
                    />
                    <span className="checkbox__box"></span>
                  </label>
                )}
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
      {/* Вспомогательный текст */}
      {helperText && (
        <span className="select-field__helper">{helperText}</span>
      )}
      {/* Текст ошибки */}
      {error && (
        <span className="select-field__error">Error</span>
      )}
    </div>
  );
};

export default SelectField;