import React from "react";
import Tag from "../Tag";
import ImagePlaceholder from "../ImagePlaceholder";
import Button from "../Button";
import BookMark from "../../assets/svg/bookmark.svg?react";

/**
 * Компонент карточки сообщества с поддержкой тегов
 */
const CommunityCard = ({
  title,
  responsible,
  responsibleRole,
  image,
  profileImage,
  children,
}) => {
  // Сортировка тегов по длине текста
  const sortedTags = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && child.type === Tag)
    .sort((a, b) => b.props.children.length - a.props.children.length);

  return (
    <div className="community-card">
      {/* Блок с изображением сообщества */}
      <div className="community-card__image-wrapper">
        <img src={image} alt={title} className="community-card__image" />

        {/* Кнопка редактирования в правом верхнем углу */}
        <div className="community-card__bookmark-button">
          <Button variant="bookmark" leftIcon={<BookMark />} />
        </div>
      </div>

      {/* Основной контент карточки */}
      <div className="community-card__content">
        {sortedTags.length > 0 && <div className="community-card__tags">{sortedTags}</div>}

        <h4 className="community-card__title text-h4">{title}</h4>

        <div className="community-card__responsible">
          <ImagePlaceholder 
            variant="rating-list" 
            className="community-card__avatar" 
            img={profileImage} 
          />
          <div>
            <p className="community-card__name">
              {responsible.split(" ").slice(0, 2).join(" ")}
              {responsible.split(" ")[2] ? <br /> : ""}
              {responsible.split(" ")[2] || ""}
            </p>
            <p className="community-card__role">{responsibleRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
