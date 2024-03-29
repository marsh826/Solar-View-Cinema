import React, { useEffect, useState } from 'react';
import './index.js';
import Navbar from './components/Navbar';
import './App.css';
import HomePage from './components/HomePage';
import MovieDisplay from './components/Movies';
import Login from './components/Login';
import SettingOption from './components/Setting';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';  
import Register from './components/Register';
import Favourite from './components/Favourite';
import Profile from './components/Profile';
import Reservations from './components/Reservations';
import Footer from './components/Footer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function App () {
  // A React const that is assigned with Material UI Component Style Const
  const classes = useStyles();
  
  // Set the Component to Dark Mode by checking for Dark Mode status
  function DarkModeCheck() {
    if(localStorage.getItem("DarkMode") === 'Enabled') {
        document.getElementById("swipenavbar").classList.add("darkmodePrimary");
        document.body.classList.add("darkmodeSecondary");
        document.getElementById("footer").classList.add("darkmodePrimary");
    } else {
        document.getElementById("swipenavbar").classList.remove("darkmodePrimary");
        document.body.classList.remove("darkmodeSecondary");
        document.getElementById("footer").classList.remove("darkmodePrimary");
    }
  }

  // Set the Background Image by checking for Background Image status
  function backgroundIMGCheck() {
    if(localStorage.getItem("BackgroundImage") === "Enabled") {
      document.body.classList.add("backgroundIMG");
    } else {
      document.body.classList.remove("backgroundIMG");
    }
  }

  // Set the Component to Background Colour 2 by checking for Background Colour 2 status
  function backgroundColourCheck() {
    if(localStorage.getItem("BackgroundColour") === "Enabled") {
      document.body.classList.add("backgroundColour2");
    } else {
      document.body.classList.remove("backgroundColour2");
    }
  }

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

  // When component is loaded, various JavaScript functions are called to check for the user's login status and preferences on app setting  
  useEffect(() => {
    checkLoginStatus();
    DarkModeCheck();
    backgroundColourCheck();
    backgroundIMGCheck();
  }, []);

// --------------------------------------------------------------Check for Login Status--------------------------------------------------------------------------------------------
  function checkLoginStatus(){
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=loginstatus",{
      method: 'GET',
      credentials: "include",
    }).then(function(response){
        // If the user is still logged in
        if(response.status === 202){
          console.log('Status: Logged In');
          localStorage.setItem('UserStatus', 'Logged In');
          setOpenSnackBar(true);
          setSeverity("success");
          setMessage("Welcome back!");
        }
        // If the user is not logged in
        if(response.status === 401) {
          console.log('Status: Logged Out');
          localStorage.setItem('UserStatus', 'Logged Out');
          setOpenSnackBar(true);
          setSeverity("warning");
          setMessage("You are not logged in.");
        }
          // When daily request limit exceeded
        if (response.status === 422) {
          console.log('Request limit exceeded within 24 hours');
          setMessage("Error: Request limit exceeded within 24 hours");
          setOpenSnackBar(true);
          setSeverity("error");
          return;
        }
        // When Rate Limit per second exceeded
        if (response.status === 429) {
          console.log('Exceeded Rate Limit');
          setMessage("Warning: Exceeded Rate Limit");
          setOpenSnackBar(true);
          setSeverity("warning");
          return;
        }
    })
  }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="page-container">
      <div className="content-wrap">
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
            {/* <Route exact from = "/" render = {props => <HomePage {...props} />} /> */}
            <Redirect exact from = "/" to="/Home" />
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
  );
}

