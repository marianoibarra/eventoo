import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Users from "./Users/Users";
import Category from "./Categories/Category";
import EventsAdmin from "./Events/EventAdmin";
import { useDispatch } from "react-redux";
import { BsCalendar } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import Grafict from "./dateEventGrafic/grafict/Grafict";
import Styles from "./Tabs.module.css";

function TabsComponent() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={Styles.root}>
      <Tabs
        className={`${Styles.tabs} ${Styles.tabsCustom}`}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          className={Styles.tab}
          icon={<BsCalendar className={Styles.tabIcon} />}
          label="Events"
        />
        <Tab
          className={Styles.tab}
          icon={<MdLocalOffer className={Styles.tabIcon} />}
          label="Category"
        />
        <Tab
          className={Styles.tab}
          icon={<FaUserFriends className={Styles.tabIcon} />}
          label="User"
        />
        <Tab
          className={Styles.tab}
          icon={<MdOutlineDashboard className={Styles.tabIcon} />}
          label="Grafic"
        />
      </Tabs>
      {value === 0 && (
        <div className={Styles.content}>
          <EventsAdmin />
        </div>
      )}
      {value === 1 && (
        <div className={Styles.content}>
          <Category />
        </div>
      )}
      {value === 2 && (
        <div className={Styles.content}>
          <Users />
        </div>
      )}
      {value === 3 && (
        <div className={`${Styles.content} ${Styles.stadic}`}>
          <Grafict />
        </div>
      )}
    </div>
  );
}

export default TabsComponent;