import React, { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';
import Button from './Button';

import Group from '../assets/svg/group.svg?react';
import Star from '../assets/svg/star.svg?react';
import Coin from '../assets/svg/coin.svg?react';
import Home from '../assets/svg/home.svg?react';
import Certificate from '../assets/svg/certificate.svg?react';
import Raiting from '../assets/svg/raiting.svg?react';
import Award from '../assets/svg/award.svg?react';
import Arrow from '../assets/svg/arrow-right.svg?react';
import BellIcon from '../assets/svg/bell.svg?react';
import Door from '../assets/svg/door-exit.svg?react';


const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="menu__header-mobile">
        <img
          src="src/assets/svg/logo/dark.svg"
          alt="Лого"
          className="menu__logo--mobile"
        />
        <div className="menu__header-mobile--icon">
          <BellIcon className="menu__icon" />
          <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <ImagePlaceholder
              variant="menu"
              img="src/assets/pics/pelmeni.jpg"
              alt="Аватар"
            />
          </div>
        </div>
      </div>

      <aside className={`menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <img
          src="src/assets/svg/logo/dark.svg"
          className="menu__logo"
          alt="Десктоп лого"
        />

        <div className="menu__content">

          <div className="menu__profile">
            <ImagePlaceholder
              variant="menu"
              img="src/assets/pics/pelmeni.jpg"
              alt="Аватар"
            />

            <div className="menu__info">
              <div className="menu__fullname">
                <span>Екатерина</span>
                <span>Константинопольская</span>
              </div>

              <div className="menu__details">
                <span className="menu__role">Студент</span>
                <span className="menu__divider--mobile">|</span>

                <div className="menu__stats">
                  <Star className="menu__icon--stat" />
                  <span>999 999</span>
                  <span className="menu__divider">|</span>
                  <Coin className="menu__icon--stat" />
                  <span>999 999</span>
                </div>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && <div className="menu__separator" />}

          <nav className="menu__nav">
            <Button variant="menu" leftIcon={<Home />}>
              Главная
            </Button>
            <Button variant="menu" leftIcon={<Group />}>
              Сообщества
            </Button>
            <Button variant="menu" leftIcon={<Certificate />}>
              Портфолио
            </Button>
            <Button variant="menu" leftIcon={<Raiting />}>
              Рейтинг
            </Button>
            <Button variant="menu" leftIcon={<Award />}>
              Награды
            </Button>
          </nav>

          {isMobileMenuOpen && <div className="menu__separator" />}

          {isMobileMenuOpen && (
            <div className="menu__mobile--links">
              <Button variant="wb--small">Профиль</Button>
              <Button variant="wb--small">Настройки</Button>
              <Button variant="wb--small">Сайт</Button>
            </div>
          )}

          {isMobileMenuOpen && <div className="menu__separator" />}

          <div className="menu__footer">
            <div className="menu__footer--button">
              <Button variant="wb" rightIcon={<Arrow />}>
                Сайт
              </Button>
            </div>

            {isMobileMenuOpen && (
              <Button variant="wb--small" leftIcon={<Door />}>
                Выйти
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Menu;