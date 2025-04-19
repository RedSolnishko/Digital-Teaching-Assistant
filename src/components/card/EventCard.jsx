import React from "react";
import Tag from "../Tag";
import ClockIcon from "../../assets/svg/clock.svg?react";
import LocationIcon from "../../assets/svg/location.svg?react";
import GroupIcon from "../../assets/svg/group.svg?react";
import AlarmIcon from "../../assets/svg/alarm.svg?react";
import CoinIcon from "../../assets/svg/coin.svg?react";
import BookMark from "../../assets/svg/bookmark.svg?react";
import Button from "../Button";

/**
 * Компонент карточки события с поддержкой сортировки тегов
 */
const EventCard = ({
  title,
  date,
  time,
  location,
  attendees,
  timeUntil,
  timeUntilVariant = "default",
  image,
  rating,
  children,
}) => {
  const [day, month] = date.split(" ");

  // Сортировка тегов по длине текста (по убыванию)
  const sortedTags = React.Children.toArray(children)
    .filter(child => child.type === Tag)
    .sort((a, b) => String(b.props.children).length - String(a.props.children).length);

  return (
    <div className="event-card">
      <div className="event-card__image-wrapper">
        <img src={image} alt={title} className="event-card__image" />
        <div className="event-card__date">
          <h2 className="text-h2">{day}</h2>
          <span className="event-card__month">{month}</span>
        </div>

        {/* Кнопка в правом верхнем углу */}
        <div className="event-card__bookmark-button">
          <Button variant="bookmark" leftIcon={<BookMark />} />
        </div>
      </div>

      <div className="event-card__content">
        <div className="event-card__info">
          <div className="event-card__rating">
            <CoinIcon className="event-card__icon" />
            {rating}
          </div>

          <div
            className={`event-card__time-until ${
              timeUntilVariant === "soon" ? "event-card__time-until--soon" : ""
            }`}
          >
            <AlarmIcon className="event-card__icon" />
            {timeUntil}
          </div>
        </div>

        {/* Отсортированные теги */}
        <div className="event-card__tags">{sortedTags}</div>

        <h4 className="event-card__title text-h4">{title}</h4>

        <div className="event-card__details">
          <p className="event-card__time">
            <ClockIcon className="event-card__icon" />
            {time}
          </p>
          <p className="event-card__location">
            <LocationIcon className="event-card__icon" />
            {location}
          </p>
          <p className="event-card__attendees">
            <GroupIcon className="event-card__icon" />
            {attendees} человек
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
