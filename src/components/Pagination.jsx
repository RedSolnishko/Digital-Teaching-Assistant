import React from "react";
import PaginationIcon from "../assets/svg/pagination/chevron-left.svg?react";

const PaginationMenu = ({ className = ""  }) => {
  return (

    <div className="pagination">
        <button className='pagination__button'><PaginationIcon /></button>
            <button className='pagination__button'>1</button>
            <button className='pagination__button'>2</button>
            <button className='pagination__button'>3</button>
            <button className='pagination__button'>...</button>
            <button className='pagination__button'>12</button>
        <button className='pagination__button pagination__button--right'><PaginationIcon /></button>
    </div>

  );
};

export default PaginationMenu;
