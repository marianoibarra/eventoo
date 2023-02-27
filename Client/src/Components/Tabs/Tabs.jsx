import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Create from './Create/Create';
import Buys from './Buys/Buys';


const useStyles = makeStyles(theme => ({

  root: {
    margin:'0 auto',
    width: '100%',
    backgroundColor: `var(--ligth-background-color)`,
    color:`var(--dark-text)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabs: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  tab: {
    width: '50%',
  },
  content: {
    width: '100%',
    textAlign: 'center',
  },
}));

function TabsComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <Tab className={classes.tab} label="Buys events" />
        <Tab className={classes.tab} label="Organizator" />
      </Tabs>
      {value === 0 && (
        <div className={classes.content}>
          <Buys/>
        </div>
      )}
      {value === 1 && (
        <div className={classes.content}>
          
          <Create/>
        </div>
      )}
    </div>
  );
}

export default TabsComponent;