import React from 'react';
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
import Footer from './components/Footer';

export default function App() {
  window.onload = function() {
    checkLoginStatus();
    localStorage.setItem('profileImage', 'none');
    localStorage.setItem('backgroundImage', 'none');
    localStorage.setItem('font', 'default');
    localStorage.setItem('backgroundColour', 'default');
  }
  function checkLoginStatus(){
    fetch("http://localhost/appcinema/src/api/api.php?action=loginstatus",{
      method: 'GET',
      credentials: "include",
    }).then(function(response){
        if(response.status === 202){
            console.log('Status: Logged In');
            localStorage.setItem('userStatus', 'logged in');
        }
        if(response.status === 401) {
            console.log('Status: Logged Out');
            localStorage.setItem('userStatus', 'logged out');
        }
    })
  }
  return (
    <div className = "page-container">
      <div className = "content-wrap">
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
            <Route exact path = "/BookingConfirm" render = {props => <Confirm {...props} />} />
          </Switch>
        </Router>  
      </div>
      <Footer />
    </div> 
  );
}

