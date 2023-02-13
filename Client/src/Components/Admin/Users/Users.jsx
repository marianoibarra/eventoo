import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole, deleteUser, disableUser, getUsers } from "../../../Slice/Admin/AdminSlice";
import { axiosModeEventsCreateForUser } from "../../../Slice/EventsCreateForUser/CreateForUserSlice";
import Styles from "./Create.module.css";
function Users() {
  const users = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(deleteUser(e));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(disableUser(e));
  };
  const handleDelete2 = (e) => {
    e.preventDefault();
    dispatch(changeUserRole(e));
  };
  return (
    <div className={Styles.container}>
      {users.length > 0
        ? users.map((user) => (
            <div className={Styles.eventCard} key={event.name}>
              <h3 className={Styles.eventCardTitle}>
                Nombre: {user.name} {user.last_name}
              </h3>
              <p>Email: {user.email}</p>
              <p>Banned: {user.isBanned}</p>
              <p>born: {user.born}</p>
              <p>role: {user.roleAdmin.name}</p>
              <button onClick={handleChange(user.id)}>Banned</button>
              <button onClick={handleDelete(user.id)}>Delete</button>
              <button onClick={handleDelete2(user.id)}>Change Role</button>
            </div>
          ))
        : undefined}
    </div>
  );
}

export default Users;
