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
import { Home, Theaters, Favorite, Settings, Person, ConfirmationNumber} from '@material-ui/icons';
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
});

export default function SwipeableTemporaryDrawer() {
  // A React const that is assigned with Material UI Component Style Const
  const classes = useStyles();

  // React State const for opening Navbar menu items
  const [state, setState] = React.useState({
    top: false
  });

  // Material UI Navbar open & close event
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Material UI Navbar Item 
  const navitems = ['Home', 'Login', 'Settings'];
  const navitems2 = ['Movies'];

  // If the user is logged in, menu item 'Login' will be replaced with 'Profile'
  if(localStorage.getItem('UserStatus') === 'Logged In') {
    navitems.splice('Login');
    navitems.push('Home', 'Profile', 'Settings');
    navitems2.push('Reservations', 'Favourites');
  }

  // If the user is logged out, menu item 'Profile' will be replaced with 'Login'
  if(localStorage.getItem('UserStatus') === 'Logged Out') {
    navitems.splice('Profile');
    navitems2.splice('Reservations', 'Favourites');
    navitems.push('Home', 'Login', 'Settings');
  }

  // Menu Items being displayed in Material UI Navbar 
  const list = (anchor) => (
    <div id="navDrawer"
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
                  {index === 1 && <ConfirmationNumber/>}
                  {index === 2 && <Favorite />}
                </Link>
              </ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
        ))}
    </List>
    </div>
  );

  return (
  // Render Material UI Navbar
    <div id="swipenavbar">
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <img 
              width='50px'
              height='50px'
              src = {logo} />
          </Button>
          {/* <div id="navDrawer"> */}
            <SwipeableDrawer
              anchor="top"
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          {/* </div> */}
        </React.Fragment>
      ))}
    </div>
  );
}