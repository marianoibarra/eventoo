import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Create from './Create/Create';
import Buys from './Buys/Buys';
import Seller from './Seller/Seller';
import Styles from './Tabs.module.css'
import { MdSell , MdCreateNewFolder } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";

function TabsComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={Styles.root}>
    <Tabs
      className={`${Styles.tabs} ${Styles.tabsCustom}`}
      value={value}
      onChange={handleChange}
      indicatorColor="var(--accent-color)"
      color='var(--accent-color)'

    >
      <Tab
        className={Styles.tab}
        icon={<MdSell className={Styles.tabIcon} />}

       label="Buys"
      />
      <Tab
        className={Styles.tab}
        icon={<FcSalesPerformance className={Styles.tabIcon} />}
      label="Seller"
      />
      <Tab
        className={Styles.tab}
        icon={<MdCreateNewFolder className={Styles.tabIcon} />}
       label="Organizator"
      />
    </Tabs>
    {value === 0 && (
        <div className={Styles.content}>
          <Buys />
        </div>
      )}
      {value === 1 && (
        <div className={Styles.content}>
          <Seller />
        </div>
      )}
      {value === 2 && (
        <div className={Styles.content}>
          <Create />
        </div>)}
  </div>
  );
}

export default TabsComponent;



