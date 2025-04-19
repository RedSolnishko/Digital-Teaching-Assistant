import React, { useState } from "react";

import LayoutListIcon from "../assets/svg/layout-list.svg?react";
import CalendarIcon from "../assets/svg/calendar.svg?react";

const Switcher = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className="switcher"
      onClick={handleSwitch}
      aria-label="Переключатель вида"
    >
      <div className={`switcher__icon-wrapper ${!isActive ? "active" : ""}`}>
        <LayoutListIcon className="switcher__icon" />
      </div>
      <div className={`switcher__icon-wrapper ${isActive ? "active" : ""}`}>
        <CalendarIcon className="switcher__icon" />
      </div>
    </button>
  );
};

export default Switcher;
