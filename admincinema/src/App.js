import React from 'react';
import './App.css';
import { Route, Switch , Redirect } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';

export default function App() {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/" render={props => <AdminLogin {...props} />} />
        <Redirect exact from="/admin" to="/admin/dashboard" />
        <Route exact path="/admin/:page?" render={props => <AdminPage {...props} />} />
      </Switch>
    </div>
  );
}

