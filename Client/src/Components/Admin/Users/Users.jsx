import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserRole,
  disableUser,
  getUsers,
  setFilterUser,
  sortByAscendingUser,
  sortByDescendingUsers,
} from "../../../Slice/Admin/AdminSlice";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchAdmin";
import UserInfo from "./UserInfo";
function Users() {
  const { users, errorUser } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!users.length){
    dispatch(getUsers());}
  }, []);
  const handleBanned = (e) => {
    dispatch(disableUser(e));

  };
  const handleChangeRole = (e) => {

    dispatch(changeUserRole(e));

  };

  const handleSearch = (e) => {
    dispatch(setFilterUser(e));
  };
  const accent = (e) => {
    dispatch(sortByAscendingUser(e));
  };

  const deccent = (e) => {
    dispatch(sortByDescendingUsers(e));
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {users.length > 0 ? (
        <>
          {errorUser ? <h2>{errorUser}</h2> : undefined}
          <UserInfo
            users={users}
            handleChangeRole={handleChangeRole}
            handleBanned={handleBanned}
            accent={accent}
            deccent={deccent}
          />
        </>
      ) : (
        <Loading/>
      )}
    </>
  );
}

export default Users;
