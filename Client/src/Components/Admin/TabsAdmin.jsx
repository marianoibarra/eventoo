import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Users from './Users/Users';
import Category from './Categories/Category';
import EventsAdmin from './Events/EventAdmin';
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../Slice/Admin/AdminSlice';
import { axiosModeCategories } from '../../Slice/Filter/categorieSlice';
import { BsCalendar } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { MdOutlineDashboard } from 'react-icons/md';
import Grafict from './dateEventGrafic/Grafict';

const useStyles = makeStyles(theme => ({

  root: {
    margin:'0 auto',
    width: '100vw',
    backgroundColor: `var(--ligth-background-color)`,
    color:`var(--dark-text)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabs: {
    width: '100vw',
    marginTop: theme.spacing(2),

  },
  tab: {
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    width: '100%',
    textAlign: 'center',
    height: '100%',
    border:'none'
  },
}));

function TabsComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab className={classes.tab} icon={<BsCalendar/>} label="Events" />
       <Tab className={classes.tab} icon={<MdLocalOffer /> } label="Category" />
       <Tab className={classes.tab} icon={<FaUserFriends /> } label="User" />
       <Tab className={classes.tab} icon={<MdOutlineDashboard /> } label="Grafic" />
      </Tabs>
      {value === 0 && (
        <div className={classes.content}>
              <EventsAdmin/>
        </div>
      )}
      {value === 1 && (
        <div className={classes.content}>
          <Category/>
        </div>
      )}
      {value === 2 && (
        <div className={classes.content}>
          <Users/>
        </div>
      )}
      {value === 3 && (
        <div className={classes.content}>
          <Grafict/>
      
        </div>
      )}
    </div>
  );
}

export default TabsComponent;