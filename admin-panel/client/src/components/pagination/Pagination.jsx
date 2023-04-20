import { useEffect } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import Button from "../button/Button";
import { Next, Prev } from "../Icons";
const cx = classNames.bind(styles);
function Pagination({ data, changeCurrentItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    changeCurrentItems(currentItems);
  }, [currentPage]);
  const handleClick = (e) => {
    setCurrentPage(parseInt(e.target.id));
  };
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={(e) => handleClick(e)}
          className={cx(currentPage === number ? "active" : null)}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  return (
    <>
      <ul className={cx("pagesNumbers")}>
        <li onClick={handlePrevBtn}>
          <Button rightIcon={<Prev width="1rem" height="1rem" />}></Button>
        </li>
        {renderPageNumbers}
        <li onClick={handleNextBtn}>
          <Button leftIcon={<Next width="1rem" height="1rem" />}></Button>
        </li>
      </ul>
    </>
  );
}

export default Pagination;
