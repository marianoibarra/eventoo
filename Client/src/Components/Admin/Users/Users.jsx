import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserRole,
  disableUser,
  getUsers,
} from "../../../Slice/Admin/AdminSlice";
import { axiosModeEventsCreateForUser } from "../../../Slice/EventsCreateForUser/CreateForUserSlice";
import EventsInfo from "../Events/EventsInfo";
import Styles from "./User.module.css";
import UserInfo from "./UserInfo";
function Users() {
  const { users } = useSelector((state) => state.admin);

  const [showDetails, setShowDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const handleBanned = (e) => {
    console.log(e)
    dispatch(disableUser(e.id));
    // dispatch(deleteUser(e));
  };
  const handleChangeRole = (e) => {
    console.log(e)
    dispatch(changeUserRole(e.id));
    // dispatch(deleteUser(e));
  };

  return (
    <>
      <div className={Styles.container}>
        {users.length > 0 ? (
          <UserInfo
            users={users}
            handleChangeRole={handleChangeRole}
            handleBanned={handleBanned}
            setShowDetails={setShowDetails}
            showDetails={showDetails}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}

export default Users;
