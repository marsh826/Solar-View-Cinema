import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// Material UI Component Style Const
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

export default function Login() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

    // React Router Dom useHistory in a const 
    const history = useHistory();

    

//---------------------------------------------Log user into their account on the web app------------------------------------------------------------------------------------------
    function postLogin() {
        // Prepare a variable that contains given login credentials from the user
        var authentication = {
            'username': document.getElementById("username").value,
            'password': document.getElementById("password").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=login",{
            method: 'POST',
            body: JSON.stringify(authentication),
            credentials: 'include',
        })
        .then(function(response){    
            if(response.status === 403) {
                console.log('forbidden');
                return;
            }
            if(response.status === 202) {
                console.log('success');
                // document.getElementById('mainpage').style.display = 'block';
                // document.getElementById('indexpage').style.display = 'none';
                localStorage.setItem('userStatus', 'logged in');
                console.log('Status: Logged In');
                history.push("/Profile")
                // document.getElementById('login-form').reset();
                return;
            }
            // Send back error into console log
            response.text().then((text) => {
                console.log(text)
            })
        })
        return false;
    }
    return(
        <Container maxWidth="sm" >
            <div id="login-page">
                <form id="loginform" autoComplete="off">
                    <div className="formgroup">
                        <label for="username">Username</label>
                        <input type="text" placeholder="Username" id="username" value="whoryou"></input>
                    </div>

                    <div className="formgroup">
                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" id="password" value="Iamu"></input>    
                    </div>  

                    <div id="login-register">
                        <Button
                            onClick={postLogin}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Enter
                        </Button>
                         
                        <Link className="routelinkreact" to="/Register">
                            <Button 
                                variant="contained" 
                                color="primary"
                                className={classes.margin}>
                                Register
                            </Button>    
                        </Link>
                    </div>      
                </form>    
            </div>
        </Container>
    );
}