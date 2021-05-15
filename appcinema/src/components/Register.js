import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
}));

// Register Functional Component with export default
export default function Register() {

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

//---------------------------------------------Registering a new accounts when the users entering register details-----------------------------------------------------------------
    function postRegister() {
        var registration = {
            // Retrieving inserted value from Registartion form
            'UsernameReg': document.getElementById("UsernameReg").value,
            'PasswordReg': document.getElementById("PasswordReg").value,
            'FirstName': document.getElementById("FirstName").value,
            'LastName': document.getElementById("LastName").value,
            'DateOfBirth': document.getElementById("DateOfBirth").value,
            'Email': document.getElementById("Email").value,
            'Phone': document.getElementById("Phone").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=register",{
            method: "POST",
            body: JSON.stringify(registration),
            credentials: 'include',
        })
        .then(function(response) {
            // If the form was not fully filled in 
            if(response.status === 406){
                console.log('unaccepted');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Register details are either not valid or fully provided.");
                return;
            }
            if(response.status === 202) {
            // If the form was fully filled in and data was successfully inserted
                console.log('success');
                setOpenSnackBar(true);
                setSeverity("success");
                setMessage("You have been successfully registered!");
                history.push("/Profile");
                return;
            }
            // Send back error into console log
            response.text().then((text) => {
                console.log(text)
            });
        })
        return false;
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <Container maxWidth="sm">
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
            {/* Register Page Render*/}
            <div id="register-page">
                <form id="registerform">
                    <div className="formgroup">
                        <label for="firstname">First Name</label>
                        <input type="text" placeholder="First Name" name="firstname" id="FirstNameUpd" value="you"></input>
                    </div>

                    <div className="formgroup">
                        <label for="lastname">Last Name</label>
                        <input type="text" placeholder="Last Name" name="lastname" id="LastNameUpd" value="me"></input>    
                    </div>  

                    <div className="formgroup">
                        <label for="dateofbirth">Last Name</label>
                        <input type="text" placeholder="Date of Birth" name="dateofbirth" id="DateOfBirthUpd" value="1990-02-16"></input>    
                    </div>  

                    <div className="formgroup">
                        <label for="email">Email</label>
                        <input type="text" placeholder="Email" name="email" id="EmailUpd" value="A@gmail.com"></input>    
                    </div>

                    <div className="formgroup">
                        <label for="Phone">Mobile Phone</label>
                        <input type="text" placeholder="Phone" name="phone" id="PhoneUpd" value="02132454989"></input>    
                    </div>

                    <div className="formgroup">
                        <label for="username">Username</label>
                        <input type="text" placeholder="Username" name="username" id="UsernameUpd" value="whoryou"></input>
                    </div>

                    <div className="formgroup">
                        <label for="password">Password</label>
                        <input type="password" placeholder="Password" name="password" id="PasswordUpd" value="Iamu"></input>    
                    </div>

                    <div id="login-button">
                        <Button
                            onClick={postRegister}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Submit
                        </Button>    

                        <Link className="routelinkreact" to="/Login">
                            <Button 
                                variant="contained" 
                                color="primary"
                                className={classes.margin}>
                                Return
                            </Button>
                        </Link> 
                    </div>    
                </form>    
            </div>
        </Container>  
    );
}