import React from "react";
import Styles from "../Categories/Category.module.css";

const UserInfo = ({ users, showDetails, setShowDetails,handleChangeRole , 
  handleBanned }) => (
  <>
    {Array.isArray(users) &&
      users.map((user) => (
        <div
          className={Styles.eventCard}
          key={user?.id}
          //   style={user?.roleAdmin?.name == 'ADMIN'? { backgroundColor:'#007F80'} : { backgroundColor:'#BC4001'} }
        >
          <h3 className={Styles.eventCardTitle}>Name: {user?.name}</h3>
          <p>Last Name: {user?.last_name}</p>
          <p>Role : {user?.roleAdmin?.name}</p>
          <p>Status: {!user?.isBanned ? " Activ" : "desactive"}</p>
          {showDetails === user?.id ? (
            <>
              <p>Born: {user?.born}</p>
              <button onClick={() => handleChangeRole(user)}>
                change role
              </button>
              <button onClick={() => handleBanned(user)}>
                Banned
              </button>
            </>
          ) : undefined}
          {showDetails !== user.id ? (
            <button
              onClick={() => {
                setShowDetails(user.id);
              }}
            >
              Change data
            </button>
          ) : undefined}
        </div>
      ))}
  </>
);

export default UserInfo;
