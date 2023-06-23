import React, { useState, useEffect, useCallback } from "react";
import "./user.scss";
import Heading from "../../components/Heading/Heading";

import Pagination from "../../components/Pagination/Pagination";
import HandleUser from "./HandleUser";
import { render } from "../../services/userApi";
import { useDispatch } from "react-redux";
import SelectSort from "../../components/SelectSort/SelectSort";
import RenderUser from "./RenderUser";
function User() {
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      const response = await render();
      dispatch({
        type: "GET_DATA",
        payload: response.data,
      });
    // setUsers([...response.data])
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchUser = (dataFilter) => {
    dispatch({
      type: "FILTER_USERS",
      payload: dataFilter,
    });
  };
  const handleDeleteFind = () => {
    dispatch({
      type: "NOT_FILTER_USERS",
    });
  };
  return (
    <>
      <Heading router_name={"User"} />
      <HandleUser
        handleSearchUser={handleSearchUser}
        handleDeleteFind={handleDeleteFind}
      />
      <SelectSort></SelectSort>
      <RenderUser />
      <Pagination perPage={5} />
    </>
  );
}

export default User;
