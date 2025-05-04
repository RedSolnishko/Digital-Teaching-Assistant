import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';
import Button from './Button';



import Group from '../assets/svg/group.svg?react';
import Star from '../assets/svg/star.svg?react';
import Coin from '../assets/svg/coin.svg?react';
import Home from '../assets/svg/home.svg?react';
import Certificate from '../assets/svg/certificate.svg?react';
import Raiting from '../assets/svg/raiting.svg?react';
import Award from '../assets/svg/award.svg?react'
import Arrow from '../assets/svg/arrow-right.svg?react'



const Menu = () => {
  return (
    <aside className="menu">
        <img src="src\assets\svg\logo\dark.svg" alt="Company logo" className="menu__logo" />
      <div className="menu__header">
        

        
          <ImagePlaceholder
            variant="menu"
            src="/avatar.jpg"
            alt="Профиль"
          />
          <div className="menu__info">
            <span className="menu__name">Екатерина Константинопольская</span>
            <span className="menu__role">Студент</span>
          </div>

          <div className="menu__stats">
            <div className="menu__stat">
              <Star className="menu__icon" />
              <span>999 999</span>
            </div>
            |
            <div className="menu__stat">
              <Coin className="menu__icon" />
              <span>999 999</span>
            </div>
          </div>
        
      </div>

      <nav className="menu__nav">
        <Button  
            variant = "menu"
            leftIcon = {<Home />}>
            Главная
        </Button>
        <Button  
            variant = "menu"
            leftIcon = {<Group />} >
          Сообщества
        </Button>
        <Button  
            variant = "menu"
            leftIcon = {<Certificate />} >
          Портфолио
        </Button>
        <Button
            variant = "menu"
            leftIcon = {<Raiting />} >
          Рейтинг
        </Button>
        <Button
            variant = "menu"
            leftIcon = {<Award />} >
          Награды
        </Button>
      </nav>

      <div className="menu__footer">
        <Button
            variant = "wb"
            rightIcon = {<Arrow />}>
          Сайт
        </Button>
      </div>
    </aside>
  );
};

export default Menu;
