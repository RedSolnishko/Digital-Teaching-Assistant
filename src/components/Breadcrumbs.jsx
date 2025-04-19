import React from "react";
import { Link } from "react-router-dom";
import SeparatorIcon from "../assets/svg/dot.svg?react";

const Breadcrumbs = ({ items, separator = "icon" }) => { // Значение по умолчанию
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index < items.length - 1 ? (
            <Link to={item.path} className="breadcrumbs__item">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumbs__item disabled">{item.label}</span>
          )}
          
          {/* Всегда отображаем разделитель, если не последний элемент */}
          {index !== items.length - 1 && (
            <span className="breadcrumbs__separator" aria-hidden="true">
              {separator === "icon" ? <SeparatorIcon /> : separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;