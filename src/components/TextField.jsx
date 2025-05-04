import React from "react";

const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  disabled,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = "text",
}) => {
  return (
    <div className={`text-field ${error ? "text-field--error" : ""} ${disabled ? "text-field--disabled" : ""}`}>
      <div className={`text-field__wrapper ${leftIcon ? "text-field__wrapper--has-left-icon" : ""} ${rightIcon ? "text-field__wrapper--has-right-icon" : ""} ${value ? "text-field__wrapper--has-value" : ""}`}>
        {label && <label className="text-field__label">{label}</label>}
        {leftIcon && <div className="text-field__icon text-field__icon--left">{leftIcon}</div>}
        <input
          className="text-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
        {rightIcon && <div className="text-field__icon text-field__icon--right">{rightIcon}</div>}
      </div>
      {helperText && (
        <span className="text-field__helper">{helperText}</span>
      )}
      {error && (
        <span className="text-field__error">Error</span>
      )}
    </div>
  );
};

export default TextField;