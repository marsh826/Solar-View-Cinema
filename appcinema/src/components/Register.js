import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

// Register Functional Component with export default
export default function Register() {
    const classes = useStyles();

    // React Router Dom useHistory in a const 
    const history = useHistory();


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
        fetch("http://localhost/solarviewcinema/appcinema/src/api/api.php?action=register",{
            method: "POST",
            body: JSON.stringify(registration),
            credentials: 'include',
        })
        .then(function(response) {
            // If the form was not fully filled in 
            if(response.status === 406){
                console.log('unaccepted');
                console.log('Form not fully filled');
                return;
            }
            if(response.status === 202) {
            // If the form was fully filled in and data was successfully inserted
                console.log('success');
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