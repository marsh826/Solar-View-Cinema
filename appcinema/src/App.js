import React, { useEffect, useState } from 'react';
import './index.js';
import Navbar from './components/Navbar';
import './App.css';
import HomePage from './components/HomePage';
import MovieDisplay from './components/Movies';
import Login from './components/Login';
import SettingOption from './components/Setting';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';  
import Register from './components/Register';
import Favourite from './components/Favourite';
import Profile from './components/Profile';
import Confirm from './components/BookingConfirm';
import Reservations from './components/Reservations';
import Footer from './components/Footer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

window.onload = function() {
    localStorage.setItem('darkMode', '')
    localStorage.setItem('backgroundImage', 'none');
    localStorage.setItem('font', 'default');
    localStorage.setItem('backgroundColour', 'default');

}

export default function App() {
  // A React const that is assigned with Material UI Component Style Const
  const classes = useStyles();

  // Dark Mode
  const theme2 = createMuiTheme({
    palette: {
      type: "dark",
    }
  })
  
  const [darkMode, setDarkMode] = useState(false)

  // React const set up for Snackbar Alert messages
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  // On clickaway, close Snackbar Alert
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  function checkLoginStatus(){
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=loginstatus",{
      method: 'GET',
      credentials: "include",
    }).then(function(response){
        if(response.status === 202){
            console.log('Status: Logged In');
            localStorage.setItem('userStatus', 'logged in');
            setOpenSnackBar(true);
            setSeverity("success");
            setMessage("Welcome back!");
            
        }
        if(response.status === 401) {
            console.log('Status: Logged Out');
            localStorage.setItem('userStatus', 'logged out');
            setOpenSnackBar(true);
            setSeverity("warning");
            setMessage("You are not logged in.");
        }
    })
  }
  return (
    <ThemeProvider theme={theme2}>
    <div className = "page-container">
      <div className = "content-wrap">
          <div className={classes.root}>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
          </div>
        <Router>  
          <Navbar />
          <Switch>
            <Route exact from = "/" render = {props => <HomePage {...props} />} />
            <Route exact path = "/Home" render = {props => <HomePage {...props} />} />
            <Route exact path = "/Movies" render = {props => <MovieDisplay {...props} />} />
            <Route exact path = "/Login" render = {props => <Login {...props} />} />
            <Route exact path = "/Register" render = {props => <Register {...props} />} />
            <Route exact path = "/Settings" render = {props => <SettingOption {...props} />} />
            <Route exact path = "/Favourites" render = {props => <Favourite {...props} />} />
            <Route exact path = "/Profile" render = {props => <Profile {...props} />} />
            <Route exact path = "/Reservations" render = {props => <Reservations {...props} />} />
          </Switch>
        </Router>  
      </div>
      <Footer />
    </div> 
    </ThemeProvider>
  );
}

