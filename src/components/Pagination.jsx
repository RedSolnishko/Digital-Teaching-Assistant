import React from 'react';
import PaginationIcon from '../assets/svg/chevron-left.svg?react';

/**
 * Компонент пагинации.
 * Отображает кнопки для навигации по страницам с поддержкой "..." для больших списков.
 *
 * @param {string} [className=""] - Дополнительные CSS-классы.
 * @param {number} totalItems - Общее количество элементов.
 * @param {number} itemsPerPage - Количество элементов на странице.
 * @param {number} currentPage - Текущая страница.
 * @param {Function} onPageChange - Обработчик смены страницы.
 */
const PaginationMenu = ({
  className = '',
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * Генерирует массив номеров страниц для отображения.
   * @returns {Array<number|string>} - Список страниц и "..." для пропусков.
   */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Показываем до 3 страниц перед "..."

    if (totalPages <= 5) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показываем: 1, 2, 3, ..., последняя страница
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        if (maxVisiblePages < totalPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
      // Показываем: 1, ..., currentPage-1, currentPage, currentPage+1, ..., последняя
      else if (currentPage < totalPages - 1) {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        if (currentPage + 1 < totalPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
      // Показываем: 1, ..., последние 3 страницы
      else {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  /**
   * Переходит на предыдущую страницу.
   */
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * Переходит на следующую страницу.
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`pagination ${className}`}>
      {/* Кнопка "Назад" */}
      <button
        className="pagination__button"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <PaginationIcon />
      </button>
      {/* Номера страниц */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`pagination__button ${
            page === currentPage ? 'pagination__button--active' : ''
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      {/* Кнопка "Вперёд" */}
      <button
        className="pagination__button pagination__button--right"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <PaginationIcon />
      </button>
    </div>
  );
};

export default PaginationMenu;