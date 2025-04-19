import React from "react";
import Download from "../../assets/svg/download.svg?react";

/**
 * Компонент карточки документа
 * @param {string} title - Название документа
 * @param {string} fileType - Тип файла (например, PDF, DOCX)
 * @param {string} fileSize - Размер файла (например, "2 MB")
 * @param {Function} onDownload - Функция, вызываемая при нажатии на иконку скачивания
 */
const DocumentCard = ({ title, fileType, fileSize, onDownload }) => {
  return (
    <div className="document-card">
      {/* Основное содержимое карточки */}
      <div className="document-card__content">
        {/* Заголовок документа */}
        <h4 className="document-card__title text-h4">{title}</h4>

        {/* Нижняя часть карточки с информацией о файле и кнопкой скачивания */}
        <div className="document-card__bottom">
          {/* Иконка скачивания (по идее, тут можно добавить onClick для скачивания) */}
          <Download onClick={onDownload} />

          {/* Информация о формате и размере файла */}
          <span className="document-card__info">
            {fileType}, {fileSize}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
