import React from "react";
import { RiAdminLine, RiAdminFill } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import User from "../../../Assets/UserProfile.png";
import Styles from './User.module.css'

const UserInfo = ({
  users,
  handleChangeRole,
  validateImageUrl,
  handleBanned,
  accent,
  deccent,
}) => (
  <div className={`${Styles.sapList}`}>
    <div className={`${Styles.sapListHeader}`}>
      <div className={`${Styles.sapListItem}`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("id")}
        />{" "}
        ID{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("id")}
        />
      </div>
      <div className={`${Styles.sapListItem}`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("name")}
        />{" "}
        User{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("name")}
        />
      </div>
      <div className={`${Styles.sapListItem} ${Styles.sapListItemWide}`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("email")}
        />{" "}
        E-mail{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("email")}
        />
      </div>
      <div className={`${Styles.sapListItem} ${Styles.sapListItemWide}`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("born")}
        />{" "}
        Born{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("born")}
        />
      </div>
      <div className={`sapListItem`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("roleAdmin")}
        />{" "}
        Type{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("roleAdmin")}
        />
      </div>
      <div className={`${Styles.sapListItem}`}>
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("isBanned")}
        />{" "}
        Status{" "}
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => deccent("isBanned")}
        />
      </div>
      <div className={`${Styles.sapListItem}`}>
        <IoMdArrowDropupCircle size={18} cursor="pointer" /> Action{" "}
        <IoMdArrowDropdownCircle size={18} cursor="pointer" />
      </div>
    </div>
    {users.map((user) => (
      <div className={`${Styles.sapListRow}`} key={user.id}>
        <div className={`${Styles.sapListItem} ${Styles.sap}`}>{user.id}</div>
        <div className={`${Styles.sapListItem} ${Styles.sap}`} id="sapListImage">
          <img className={`${Styles.sapListImage}`} src={user.profile_pic ? user.profile_pic : User} />
          {`${user?.name} ${user?.last_name}`}
        </div>
        <div className={`${Styles.sapListItem} ${Styles.sapListItemWide} ${Styles.sap}`}>{user?.email}</div>
        <div className={`${Styles.sapListItem} ${Styles.sapListItemWide} ${Styles.sap}`}>{user?.born}</div>
        <div className={`${Styles.sapListItem} ${Styles.sap}`}>{user?.roleAdmin?.name}</div>
        <div className={`${Styles.sapListItem} ${Styles.sap}`}>
          {user?.isBanned ? "Banned" : "Active"}
        </div>
        <div className={`${Styles.sapListItem} ${Styles.sap}`}>
          <button className={`${Styles.btnSap}`}>
            {user?.roleAdmin?.name === "USER" ? (
              <RiAdminLine color="darkslateblue" size={25} />
            ) : (
              <RiAdminFill color="darkslateblue" size={25} />
            )}
          </button>
          <button className={`${Styles.btnSap}`}>
            {!user?.isBanned ? (
              <AiFillLike size={25} />
            ) : (
              <BsHandThumbsUp size={25} />
            )}
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default UserInfo;
