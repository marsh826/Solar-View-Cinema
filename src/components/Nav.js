import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Theaters, PinDrop, AttachMoney, Settings, Person, PersonAdd, Info } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import AppLogo from '../img/app-logo.jpg';  

var logo = AppLogo;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    minWidth: '100%',
    minHeight: '100%',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const navitems = ['Home', 'Login', 'Settings'];
  const navitems2 = ['Movies', 'Locations', 'Prices'];
  
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
        {navitems.map((text, index) => (
            <ListItem 
              button key={text}
              component = { Link }
              to = {"/" + text}>
                <ListItemIcon>
                  <Link to = {index}>
                    {index === 0 && <Home />}
                    {index === 1 && <Person />}
                    {index === 2 && <Settings />}
                  </Link>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}    
    </List>
    <Divider />
    <List>
        {navitems2.map((text, index) => (
          <ListItem 
            button key={text} 
            component = { Link }
            to = {"/" + text}>
              <ListItemIcon>
                <Link>
                  {index === 0 && <Theaters />}
                  {index === 1 && <PinDrop />}
                  {index === 2 && <AttachMoney />}
                </Link>
              </ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
        ))}
    </List>
    </div>
  );
  return (
    <div className = "swipenavbar">
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <img 
              width = '50px'
              height = '50px'
              src = {logo} />
          </Button>
          <SwipeableDrawer
            anchor="top"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}