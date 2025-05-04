import React, { useState, useEffect, useRef } from "react";

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
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

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
  }, []);

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => {
      const newState = !prev;
      newState ? onOpen?.() : onClose?.();
      return newState;
    });
  };

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

  const hasValue = isMulti ? value.length > 0 : !!value;

  return (
    <div
      ref={containerRef}
      className={`select-field ${error ? "select-field--error" : ""} ${open ? "select-field--open" : ""} ${hasValue ? "select-field--has-value" : ""}`}
    >
      <div
        className={`select-field__control ${disabled ? "select-field__control--disabled" : ""} ${leftIcon ? "select-field__control--has-left-icon" : ""} ${rightIcon ? "select-field__control--has-right-icon" : ""}`}
        onClick={toggleDropdown}
      >
        {label && <label className="select-field__label">{label}</label>}
        {leftIcon && <div className="select-field__icon select-field__icon--left">{leftIcon}</div>}
        <div className="select-field__value">
          {isMulti
            ? options.filter((o) => value.includes(o.id)).map((o) => o.label).join(", ") || "Выберите значение"
            : options.find((o) => o.id === value)?.label || "Выберите значение"}
        </div>
        {rightIcon && <div className="select-field__icon select-field__icon--right">{rightIcon}</div>}
      </div>
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
      {helperText && (
        <span className="select-field__helper">{helperText}</span>
      )}
      {error && (
        <span className="select-field__error">Error</span>
      )}
    </div>
  );
};

export default SelectField;