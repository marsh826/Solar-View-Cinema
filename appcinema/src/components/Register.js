import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';

// Material UI Component Style Const
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
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

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

    // React Const for Material UI Date Picker with initial state value of null. 
    const [selectedDate, setSelectedDate] = useState(null);
    // React Const sets on empty and awaits for change in date field. Set a new date on change
    const handleDateChange = (date) => {
    setSelectedDate(date.toISOString());
    };

//---------------------------------------------Registering a new accounts when the users entering register details-----------------------------------------------------------------
    function postRegister() {
        // event.preventDefault();
        var registration = {
            // Retrieving inserted values from Registartion form and assign them into a variable
            'UsernameReg': document.getElementById("UsernameReg").value,
            'PasswordReg': document.getElementById("PasswordReg").value,
            'FirstName': document.getElementById("FirstName").value,
            'LastName': document.getElementById("LastName").value,
            'DateOfBirth': document.getElementById("DateOfBirth").value,
            'Email': document.getElementById("Email").value,
            'Phone': document.getElementById("Phone").value
        }
        console.log(registration);
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=register",{
            method: "POST",
            body: JSON.stringify(registration),
            credentials: 'include',
        })
        .then(function(response) {
            // If the form was not fully filled in or register values are invalid
            if(response.status === 406){
                console.log('unaccepted');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Unable to register. Please try again");
                return;
            }
            if(response.status === 202) {
            // If the form was fully filled in and data was successfully inserted
                console.log('success');
                localStorage.setItem('LoginStatus', 'Logged In');
                localStorage.setItem('BackgroundImage', 'Disabled');
                localStorage.setItem('DarkMode', 'Disabled');
                localStorage.setItem('BackgroundColour', 'Default');
                document.getElementById("registerform").reset(); 
                setOpenSnackBar(true);
                setSeverity("success");
                setMessage("You have successfully registered an account! Welcome to Solar View Cinema.");
                return;
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
        return false;
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        // Material UI Container component for centering the login form
        <Container maxWidth="sm">
            {/* Render of Material UI Snackbar Alert Message that automatically hides after 4 seconds */}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
            {/* Register Page Render*/}
            <div id="register-page">
                {/* Register Page */}
                <form id="registerform" autoComplete="off" onSubmit={handleSubmit(postRegister)}>
                    <div className="formgroup">
                        <label for="firstname">First Name</label>
                        {/* First Name field requires value in order to proceed with the register process */}
                        <input type="text" placeholder="First Name" name="firstname" id="FirstName" defaultValue=""
                            {...register("FirstName", { required: true })}
                        />
                        {/* Error message when the user did not provide username value in the first name field */}
                        {errors?.FirstName?.type === "required" && <p className="errormssg">This field is required</p>}
                    </div>

                    <div className="formgroup">
                        <label for="lastname">Last Name</label>
                        {/* Last Name field requires value in order to proceed with the register process */}
                        <input type="text" placeholder="Last Name" name="lastname" id="LastName" defaultValue=""
                            {...register("LastName", { required: true })}
                        />
                        {/* Error message when the user did not provide username value in the last name field */}
                        {errors?.LastName?.type === "required" && <p className="errormssg">This field is required</p>}    
                    </div>  

                    <div className="formgroup">
                        <label for="dateofbirth">Date of Birth</label>
                        {/* Date of Birth field requires value and must in correct data format in order to proceed with the register process */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                animateYearScrolling
                                disableFuture
                                minDate="1930-01-01"
                                name="dateofbirth"
                                margin="normal"
                                id="DateOfBirth"
                                placeholder="Date Of Birth"
                                format="yyyy-MM-dd"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </div>  

                    <br/>

                    <div className="formgroup">
                        <label for="email">Email</label>
                        {/* Email field requires value and must be in correct data format in order to proceed with the register process */}
                        <input type="text" placeholder="Email" name="email" id="Email" defaultValue=""
                            {...register("Email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                        />    
                        {/* Error message when the user did not provide password value in the email field */}
                        {errors?.Email?.type === "required" && <p className="errormssg">This field is required</p>}
                        {errors?.Email?.type === "pattern" && <p className="errormssg">Invalid Email</p>}
                    </div>

                    <div className="formgroup">
                        <label for="phone">Mobile Phone</label>
                        {/* Mobile Phone field requires value and must be in correct data format in order to proceed with the register process */}
                        <input type="text" placeholder="Phone" name="phone" id="Phone" defaultValue=""
                            {...register("Phone", { required: true, maxLength: 10, pattern: {value: /^\d{10}$/} })}
                        />    
                        {/* Error message when the user did not provide password value in the phone field */}
                        {errors?.Phone?.type === "required" && <p className="errormssg">This field is required</p>}
                        {errors?.Phone?.type === "maxLength" && <p className="errormssg">Please enter a 10 digit phone number</p>}
                        {errors?.Phone?.type === "pattern" && <p className="errormssg">Invalid Mobile Phone Number</p>}
                    </div>

                    <div className="formgroup">
                        <label for="username">Username</label>
                        {/* Username field requires value in order to proceed with the register process */}
                        <input type="text" placeholder="Username" name="username" id="UsernameReg" defaultValue=""
                            {...register("Username", { required: true })}
                        />
                        {/* Error message when the user did not provide username value in the username field */}
                        {errors?.Username?.type === "required" && <p className="errormssg">This field is required</p>}
                    </div>

                    <div className="formgroup">
                        <label for="password">Password</label>
                        {/* Password field requires value in order to proceed with the register process */}
                        <input type="password" placeholder="Password" name="password" id="PasswordReg" defaultValue=""
                            {...register("Password", { required: true })}
                        />    
                        {/* Error message when the user did not provide password value in the password field */}
                        {errors?.Password?.type === "required" && <p className="errormssg">This field is required</p>}
                    </div>

                    <div id="login-button">
                        <Button
                            type="submit"
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