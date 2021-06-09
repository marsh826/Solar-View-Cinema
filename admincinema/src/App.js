import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch , Redirect, useHistory } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
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

export default function App() {

  // A React const that is assigned with Material UI Component Style Const
  const classes = useStyles();

  // React Router Dom useHistory in a const 
  const history = useHistory();  

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

  // When component is loaded, a JavaScript function is called to check for the user's login status
  useEffect(() => {
    checkLoginStatus();
  }, []);
// -------------------------------------------------------------Check for Login Status---------------------------------------------------------------------------------------------
  function checkLoginStatus() {
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=loginstatus",{
      method: 'GET',
      credentials: "include",
    }).then(function(response){
        // If the admin is still logged in 
        if(response.status === 202){
            console.log('Status: Logged In');
            localStorage.setItem('LoginStatus', 'Logged In');
            setOpenSnackBar(true);
            setSeverity("success");
            setMessage("Welcome back!");
        }
        // If the admin is not logged in
        if(response.status === 401) {
            console.log('Status: Logged Out');
            localStorage.setItem('LoginStatus', 'Logged Out');
            setOpenSnackBar(true);
            setSeverity("warning");
            setMessage("You are not logged in.");
            history.push("/adminlogin");
        }
    })
  }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div id="App">
      <div className={classes.root}>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
            <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
      </div>
      <h1>Solar View Cinema Administrator Panel</h1>
      <Switch>
        <Redirect exact from="/" to="/adminlogin" />
        <Route exact path="/adminlogin" render={props => <AdminLogin {...props} />} />
        <Redirect exact from="/admin" to="/admin/dashboard" />
        <Route exact path="/admin/:page?" render={props => <AdminPage {...props} />} />
      </Switch>
    </div>
  );
}

