import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theaters, PinDrop, AttachMoney, Settings, Person, PersonAdd, Info } from '@material-ui/icons';
// import background from '../img/cinema-background.jpg';
import MovieDisplay from './Movies'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    //   backgroundImage: `url(${background})`,
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '100%',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
      setOpen(true);
  };
  const handleDrawerClose = () => {
      setOpen(false);
  };
  return (
      <div className = {classes.root}>
        <CssBaseline />
        <AppBar
            // style = {{backgroundColor: "transparent"}}
            color = "primary"
            position = "fixed"
            className = {clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Brisbane Cinema 
            </Typography>
            <IconButton
              color = "inherit"
              aria-label = "open drawer"
              edge = "end"
              onClick = {handleDrawerOpen}
              className = {clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className = {clsx(classes.content, {
          [classes.contentShift]: open,
          })}
          style = {{backgroundColor: "secondary"}}>
            <div className = {classes.drawerHeader} />
            <Typography className = "text-reposition" paragraph style={{color: "white"}}>
              Welcome to Brisbane Cinema Online Booking!
            </Typography>
            <div className = "contentdisplay">
                <MovieDisplay />
            </div>
        </main>
        <Drawer
          id = "drawer"
          color = "inherit"
          className = {classes.drawer}
          variant = "persistent"
          anchor = "right"
          open = {open}
          classes= {{
            paper: classes.drawerPaper,
          }}
        >
          <div className = {classes.drawerHeader}>
            <IconButton color = 'inherit' onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Current Movies', 'Locations', 'Prices'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <Theaters />}
                  {index === 1 && <PinDrop />}
                  {index === 2 && <AttachMoney />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Profile', 'Sign Up', 'About Us', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <Person />}
                  {index === 1 && <PersonAdd />}
                  {index === 2 && <Info />}
                  {index === 3 && <Settings />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>     
      </div>
  );
}
