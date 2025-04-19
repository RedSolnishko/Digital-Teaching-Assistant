import React, { useState } from 'react';

import PaginationMenu from '../components/Pagination';
import PaginationIcon from "../assets/svg/pagination/chevron-left.svg?react";

import Button from '../components/Button';
import LinkP from '../components/LinkP';
import Alert from '../components/Alert';
import Tag from '../components/Tag';
import Tab from '../components/Tab';
import Breadcrumbs from '../components/Breadcrumbs'; 
import Dropdown from '../components/DropDown';
import Switcher from '../components/Switcher';
import ImagePlaceholder from '../components/ImagePlaceholder';


import VkIcon from '../assets/svg/vk.svg?react';
import Telergram from '../assets/svg/telegram.svg?react';
import LinkIcon  from  '../assets/svg/socials.svg?react';
import EditIcon from "../assets/svg/edit.svg?react";
import PlusIcon from "../assets/svg/plus.svg?react";
import Share  from '../assets/svg/share.svg?react';
import User from '../assets/svg/user.svg?react'


import EventCard from '../components/card/EventCard';
import CommunityCard from '../components/card/CommunityCard';
import DocumentCard from '../components/card/DocumentCard';
import ProductCard from '../components/card/ProductCard';
import PartnerCard from '../components/card/PartnerCard';
import LevelCard from '../components/card/levelCard';

const text = [
  { id: 1, label: "Вариант 1" },
  { id: 2, label: "Вариант 2" },
  { id: 3, label: "Вариант 3" },
];

const check = [
  { id: 1, label: "Вариант 1", checked: false},
  { id: 2, label: "Вариант 2", checked: false},
  { id: 3, label: "Вариант 3", checked: false},
];

const icon = [
  { id: 1, label: "VK", icon: <VkIcon />},
  { id: 2, label: "Telergram", icon: <Telergram />},
  { id: 3, label: "Скопировать ссылку", icon: <LinkIcon /> },
];

const selectOptions = [
  { id: 1, label: "React" },
  { id: 2, label: "Vue" },
  { id: 3, label: "Angular" },
];

const UIkit = () => {
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState([]);

  return (
    <div className="public-layout">
      <header>
        <nav>
          {/* ... */}
        </nav>
      </header>
        <main className="container">

          <ul className='Buttons'>
            <h2 className='text-h2'> Button</h2>
            <li>
            <Button variant="primary"
            leftIcon={<EditIcon />} 

            ></Button>
            </li>

            <li>
            <Button 
              variant="secondary" 
              leftIcon={<EditIcon />} 
              rightIcon={<PlusIcon />}>
              Click me
            </Button>
            </li>

            <li>
            <Button 
              variant="wb" 
              leftIcon={<EditIcon />} 
              rightIcon={<PlusIcon />}>
              Click me
            </Button>
            </li>

            <li>
            <Button 
              variant="wb--small" 
              leftIcon={<EditIcon />} 
              rightIcon={<PlusIcon />}>
              Click me
            </Button>
            </li>

            <li>
            <Button 
              variant="share" 
              leftIcon={<Share />}>
              Button
            </Button>
            </li>

            <Button variant="user" userIcon={<User />} onClick={() => console.log("User clicked!")} />

          


            <li>
            <Button 
              variant="default" 
              leftIcon={<EditIcon />} >
            </Button>
            </li>

            <li>
            <Button 
              variant="light" 
              leftIcon={<EditIcon />} >
            </Button>
            </li>

            <li>
            <Button 
              variant="little" 
              leftIcon={<EditIcon />} >
            </Button>
            </li>

            <li>
            <Button 
              variant="littlebg" 
              leftIcon={<EditIcon />} >
            </Button>
            </li>

            <li>
            <Button 
              variant="defaultwb" 
              leftIcon={<EditIcon />} >
            </Button>
            </li>
          </ul>
        
          <ul className='Links'>
            <h2 className='text-h2'>Links</h2>
            <li><LinkP variant="default" href="#">Link</LinkP></li>
            <li><LinkP variant="default-small" href="#">Link</LinkP></li>
            <li><LinkP variant="icon" href="#">Link</LinkP></li>
            <li><LinkP variant="icon-small" href="#">Link</LinkP></li>
            <li><LinkP variant="social" href="#" icon={<VkIcon />} >VK</LinkP></li>
            <li><LinkP variant="social" href="#" icon={<Telergram />} >Telergram</LinkP></li>
          </ul>

          <ul className='Tags'>
            <h2 className='text-h2'>Tags</h2>
            <li> <Tag variant="default">Tag</Tag></li>
            <li><Tag variant="cyan" href="#">Воспитание</Tag></li>
            <li><Tag variant="purple" href="#">Учёба</Tag></li>
            <li><Tag variant="green" href="#">Наука</Tag></li>
            <li><Tag variant="red" href="#">Творчество</Tag></li>
            <li><Tag variant="blue" href="#">Спорт</Tag></li>
          </ul>

          <ul className="Alerts">
            <h2 className="text-h2">Alerts</h2>
            <li>
              <Alert
                type='success'
                title='Успешно'
                message='Вы участвуете в мероприятии'
                onClose={() => setShowSuccess(false)}
              />
            </li>

            <li>
              <Alert
                type='error'
                title='Ошибка'
                message='Пожалуйста, попробуйте еще раз'
                onClose={() => setShowSuccess(false)}
              />
            </li>
          </ul>
        
          <ul className='Tab'>
            <h2 className='text-h2'>Tab</h2>
            <li> <Tab label="Home" badge={109} /> </li>
            <li>  <Tab label="Messages" badge={7} /></li>
          </ul>

          <ul className="Pagination">
            <h2 className="text-h2">Pagination</h2>
            <li><button  className='pagination__button'>1</button></li>
            <li><button  className='pagination__button'><PaginationIcon /></button></li>
            <li><PaginationMenu /></li>
          </ul>

          <ul className='CheckRadio'>
            <h2 className='text-h2'>CheckRadio</h2>
            <li>
              <label class="checkbox">
                <input type="checkbox" class="checkbox__input"/>
                <span class="checkbox__box"></span>
              </label>
            </li>
            <li>
              <label class="radio">
                <input type="radio" name="group1" class="radio__input"  />
                  <span class="radio__circle"></span>
              </label>  
            </li>
          </ul>

          <ul className='Toggle'>
            <h2 className='text-h2'>Toggle</h2>
            <li>
              <label class="toggle">
                <input type="checkbox" class="toggle__input"  />
                <span class="toggle__slider"></span>
              </label>
            </li>
          </ul>

          <ul className='Dropdown'>
            <h2 className='text-h2'>Dropdown</h2>
            <li> <Dropdown type="text" options={text} /> </li>
            <li> <Dropdown type="checkbox" options={check} /> </li>
            <li> <Dropdown type="icon" options={icon} /></li>
          </ul>

          <ul className='Breadcrumbs'>
            <h2 className='text-h2'>Breadcrumbs</h2>
            <li>
            <Breadcrumbs 
              items={[
                { label: "Главная", path: "/" },
                { label: "Мероприятия", path: "/events" },
                { 
                  label: "VII Открытый отборочный чемпионат ФГАОУ ВО ГУАП по стандартам Агентства развития профессий и навыков", 
                  path: "/events/championship" 
                }
              ]}
              disabledItems={[2]} // Индекс последнего элемента (необязательно)
                />
            </li>
          </ul>

          <ul className='Switcher'>
            <h2 className='text-h2'>Switcher</h2>
            <li>
                <Switcher/>
            </li>
          </ul>




          <ul className='ImagePlaceholder'>
            <h2 className='text-h2'>ImagePlaceholder</h2>
            <li><ImagePlaceholder variant="rating-card" img="src\assets\pics\pelmeni.jpg"/></li>
            <li> <ImagePlaceholder variant="profile"/> </li>
            <li> <ImagePlaceholder variant="menu"/> </li>
            <li> <ImagePlaceholder variant="rating-list"/> </li>

          </ul>

          <ul className='Card'>
            <h2 className='text-h2'>EventCard</h2>
            <li>
              <EventCard
                title="Название мероприятия"
                date="30 ноя"
                time="12:00 - 17:00"
                location="ГУАП, Ленсовета 14, актовый зал"
                attendees={500}
                timeUntil="Через 2 часа"
                
                image="src/assets/pics/pic1.jpg"
                rating={100}
              >
                <Tag variant="red">Творчество</Tag>
                <Tag variant="blue">Спорт</Tag>
                <Tag variant="default">Творчество</Tag>
                <Tag variant="blue">Название</Tag>
                <Tag variant="purple">sfsfasasfasвапролропмf</Tag>
                <Tag variant="red">Название</Tag>
                <Tag variant="green">Константинопольский</Tag>
              </EventCard>
            </li>

            <li>
              <EventCard
                title="Международная конференция"
                date="15 дек"
                time="09:00 - 18:00"
                location="Какой-нибудь адресс  "
                attendees={1200}
                timeUntil="Через 5 дней"
                image="src\assets\pics\conference.jpg"
                rating={250}
              >
                <Tag variant="purple">Искусственный интеллект</Tag>
                <Tag variant="blue">Технологии</Tag>
                <Tag variant="green">Научные исследования</Tag>
                <Tag variant="red">Инновации</Tag>
              </EventCard>
            </li>
            
            <li>
            <CommunityCard
              title="Название сообщества"
              image="src/assets/pics/pic2.jpg"
              profileImage="src/assets/pics/pelmeni.jpg"
              responsible="Константинопольский Константин Константинович"
              responsibleRole="Ответственный"
            >
                <Tag variant="red">Творчество</Tag>
                <Tag variant="blue">Спорт</Tag>
                <Tag variant="default">Творчество</Tag>
                <Tag variant="blue">Название</Tag>
                <Tag variant="purple">sfsfasasfasвапролропмf</Tag>
                <Tag variant="red">Название</Tag>
                <Tag variant="green">Константинопольский</Tag>
            </CommunityCard>
            </li>


            <li>
              <DocumentCard 
                title="Headline"
                fileType="PDF"
                fileSize="99.9 KB"
                onDownload={() => alert("Скачивание файла")}
              />
            </li>

            <li>
              <ProductCard
                image="src\assets\pics\prize.jpg"
                price={100}
                title="Наименование призаНаименование призаНаименование призаНаименование призаНаименование приза"
                onClaim={() => alert("Приз получен!")}
              />
            </li>

            <li>
            <PartnerCard
              logo="src/assets/svg/default-logo.svg" // Если нет, используется SVG-заглушка
              name="Название партнера"
              link="https://example.com"
              contact="Константинопольский Константин Константинович"
              phone="+7 (812) 710-64-82"
              email="partner@example.com"
              socials={{
                vk: { link: "https://vk.com/example", icon: VkIcon },
                telegram: { link: "https://t.me/example", icon: Telergram },
              
              }}
            />
            </li>

            <li>
            <LevelCard name="asdasdasddadsdasdasdsadsddsdsdsd" icon="src\assets\pics\image.svg" completed={true} cost={100} />
            </li>
          </ul>
      </main>
    </div>
  );
};

export default UIkit;