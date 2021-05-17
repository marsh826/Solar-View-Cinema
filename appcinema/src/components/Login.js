import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useForm } from 'react-hook-form';

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
    
    // Default React Hook Form const for Login FormValidation
    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm();

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
            // When the user login unsuccessfully, alert error message
            if(response.status === 403) {
                console.log('forbidden');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Invalid Username or Password.");
                return;
            }
            // When the user login successfully, redirect to Profile page
            if(response.status === 202) {
                console.log('success');
                localStorage.setItem('userStatus', 'logged in');
                console.log('Status: Logged In');
                history.push("/Profile");
                // document.getElementById('loginform').reset();
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
        // Material UI Container component for centering the login form
        <Container maxWidth="sm" >
            {/* Render of Material UI Snackbar Alert Message that automatically hides after 4 seconds */}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>    
            </div>
            
            <div id="login-page">
                {/* Login Form */}
                <form id="loginform" autoComplete="off" onSubmit={handleSubmit(postLogin)}>
                    <div className="formgroup">
                        <label for="username">Username</label>
                        {/* Username field requires value in order to proceed with the login process */}
                        <input type="text" placeholder="Username" id="username" defaultValue="whoryou" 
                            {...register("Username", { required: true})}
                        />
                        {/* Error message when the user did not provide username value in the unsername field */}
                        {errors?.Username?.type === "required" && <p>Please enter your username</p>}
                    </div>

                    <div className="formgroup">
                        <label for="password">Password</label>
                        {/* Password field requires value in order to proceed with the login process */}
                        <input type="password" placeholder="Password" id="password" defaultValue="Iamu" 
                            {...register("Password", { required: true})}
                        />
                        {/* Error message when the user did not provide password value in the password field */}
                        {errors?.Password?.type === "required" && <p>Please enter your password</p>}
                    </div>  

                    {/* Submit the login form value of the user */}
                    <div id="login-register">
                        <Button
                            type="submit"
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Enter
                        </Button>
                    
                    {/* Redirect the user to Register page if they don't have an account */}
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