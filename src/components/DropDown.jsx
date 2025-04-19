import React, { useState, useEffect } from "react";

const Dropdown = ({ type, options }) => {
  // Состояние для отслеживания открытости выпадающего списка
  const [isOpen, setIsOpen] = useState(false);

  // Состояние для отслеживания выбранных опций
  const [selectedOptions, setSelectedOptions] = useState(options);

  // Обновляем выбранные опции, если они изменяются извне
  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);

  // Функция для переключения состояния выпадающего списка
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Функция для обработки изменения состояния чекбокса
  const handleCheckboxChange = (id) => {
    setSelectedOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, checked: !opt.checked } : opt
      )
    );
  };

  return (
    <div className="dropdown">
      {/* Кнопка для открытия/закрытия выпадающего списка */}
      <button 
        className="dropdown__toggle" 
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        Drop down
      </button>
      {isOpen && (
        <ul className="dropdown__menu" role="menu">
          {selectedOptions.map((option) => (
            <li 
              key={option.id} 
              className={`dropdown__item ${type === "icon" ? "dropdown__item--icon" : ""}`} 
              role="menuitem"
            >
              {/* Вариант с чекбоксами */}
              {type === "checkbox" && (
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input"
                    checked={option.checked || false}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                  <span className="checkbox__box"></span>
                  {option.label}
                </label>
              )}
              {/* Вариант с иконками */}
              {type === "icon" && (
                <span className="dropdown__icon">
                  {option.icon} 
                  <span className="dropdown__icon-text">{option.label}</span>
                </span>
              )}
              {/* Вариант с текстом */}
              {type === "text" && <span>{option.label}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
