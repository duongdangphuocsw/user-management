import React, { useState, useEffect } from "react";
import "./pagination.scss";

import { useDispatch, useSelector } from "react-redux";

const Pagination = (props) => {
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const usersFilter = useSelector((state) => state.user.usersFilter);
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch({
      type: "GET_CURRENT_USER",
      payload: getCurrentUsers(),
    });
    dispatch({
      type: "CHANGE_PAGE",
      payload: currentPage,
    });
    const data = usersFilter !== undefined ? usersFilter : users;
    setTotalPage(
      Math.ceil(
        data.length / props.perPage
      )
    );
  

  }, [usersFilter,currentPage , users]);
  const getCurrentUsers = () => {
    const from = (currentPage - 1) * props.perPage;
    const to = currentPage * props.perPage;
    // const currentUsers = props.users.slice(from, to);
    const data = usersFilter !== undefined ? usersFilter :users;
    const currentUsers = data.slice(from, to);
    return currentUsers;
  };
  const clickToActive = (indexPage) => {
    setCurrentPage(indexPage);
  };
  // handle next and prev page
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage === totalPage ? currentPage : currentPage + 1);
  };
  const arrayNumberPage = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );
  return (
    <>
      <div className="pagination">
        <ul>
          <li onClick={() => prevPage()}>&laquo;</li>
          {arrayNumberPage.length > 0 &&
            arrayNumberPage.map((item) => (
              <li
                className={currentPage === item ? "active" : ""}
                key={item}
                onClick={() => clickToActive(item)}
              >
                {item}
              </li>
            ))}
          <li onClick={() => nextPage()}>&raquo;</li>
        </ul>
      </div>
    </>
  );
};
export default Pagination;
