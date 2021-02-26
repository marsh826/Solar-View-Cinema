import React from 'react';
import './index.js';
import Nav from './components/Nav';
import './App.css';
import HomePage from './components/HomePage';
import MovieDisplay from './components/Movies';
import Login from './components/Login';
import SettingOption from './components/Setting';
import Location from './components/Location';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';  
import Register from './components/Register.js';
import Prices from './components/Prices.js';

export default function App() {
  return (
    <Router>
      <div className = "App">
        <Nav />
        <Switch>
          <Route exact from = "/" render = {props => <HomePage {...props} />} />
          <Route exact path = "/Home" render = {props => <HomePage {...props} />} />
          <Route exact path = "/Movies" render = {props => <MovieDisplay {...props} />} />
          <Route exact path = "/Login" render = {props => <Login {...props} />} />
          <Route exact path = "/Register" render = {props => <Register {...props} />} />
          <Route exact path = "/Settings" render = {props => <SettingOption {...props} />} />
          <Route exact path = "/Locations" render = {props => <Location {...props} />} />
          <Route exact path = "/Prices" render = {props => <Prices {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}
