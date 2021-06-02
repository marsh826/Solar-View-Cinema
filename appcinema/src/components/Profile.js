import React, { useEffect, useState } from 'react';
import { Person } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import '../App.css' 

// Material UI Component Style Const
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));
// Material UI Dialog Animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// Profile Function Component with export default
export default function Profile() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();    

    // React Router Dom useHistory in a const 
    const history = useHistory();

    // Open Update Profile Details Form 
    function openUpdateAccountForm() {
        document.getElementById("updateform").style.display = "block";
        document.getElementById("userprofile").style.display = "none";
    }

    // Close Update Profile Details Form
    function closeUpdateAccountForm() {
        document.getElementById("updateform").style.display = "none";
        document.getElementById("userprofile").style.display = "block";
    }

    // Material UI Account Closure Dialog
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
    const handleClickOpenDeleteAccount = () => {
        setOpenDeleteAccount(true);
    };
    const handleCloseDeleteAccount = () => {
        setOpenDeleteAccount(false);
    };

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

    // React Const for loading screen before rendering
    const [loading, setLoading] = useState(false);

    //React Const Profile set up empty array to store data that is successfully fetched
    const [profile, setProfile] = useState([]);

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
        setSelectedDate(date);
    };
    
    // When the Profile page/component is loaded, useEffect will use a JavaScript Function to display profile in JSON output only once
    useEffect(() => {
        setLoading(true);
        postDisplayProfile();
    }, []);

//-----------------------------------------------Display profile when Profile page is loaded---------------------------------------------------------------------------------------
    function postDisplayProfile() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayprofile",{
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            setLoading(false);
            if (res.status === 401) {
                console.log(res);
                console.log('forbidden');
                setProfile([]);
                setMessage("You are not logged in. No Profile is found.");
                setOpenSnackBar(true);
                setSeverity("warning");
            }

            if (res.status === 503) {
                console.log(res);
                console.log('service unavailable');
                setProfile([]);
                setMessage("Error: Unable to fetch user profile");
                setOpenSnackBar(true);
                setSeverity("error");
            }
            
            if (res.status === 201) {
                console.log(res);
                console.log('created');
                res.json().then((data) => {
                    setProfile(data);
                    console.log(data);
                })
            }
        })   
        return false;
    }
//----------------------------------------------- Update Profile function when users update their account details -----------------------------------------------------------------
    function postUpdateProfile() {
        // Fetch the value from the Update From and Prepare a variable for JSON Stringify to send to PHP API 
        var profileUpdate = {
            'UsernameUpd': document.getElementById("UsernameUpd").value,
            'PasswordUpd': document.getElementById("PasswordUpd").value,
            'FirstNameUpd': document.getElementById("FirstNameUpd").value,
            'LastNameUpd': document.getElementById("LastNameUpd").value,
            'DateOfBirthUpd':document.getElementById("DateOfBirthUpd").value,
            'EmailUpd': document.getElementById("EmailUpd").value,
            'PhoneUpd': document.getElementById("PhoneUpd").value
        }    
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=updateprofile",{
            method: "POST",
            body: JSON.stringify(profileUpdate),
            credentials: 'include'
        })
        .then(function(response){
            if(response.status === 406) {
                // Will not accept the new update information if they are not filled fully or correctly
                console.log('unaccepted');
                setMessage("Error: Something went wrong.");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            } 
            if(response.status === 202) {
                console.log('success');
                // Upon successful update, the profile page will be refreshed by reusing the display profile function
                setMessage("You have successfully updated your account details!");
                setOpenSnackBar(true);
                setSeverity("success");
                closeUpdateAccountForm();
                postDisplayProfile();
                return;
            } 
        })
        return false;
    }
//-----------------------------------------------Deleting User Account after the user agree to delete their account----------------------------------------------------------------
function postDeleteProfile(id) {
    var IDuser = {
        'userid' : id
    }
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=deleteprofile",{
        // The function applies DELETE method. It will delete the users account along with all its details from the database.
        method: "POST",
        body: JSON.stringify(IDuser),
        credentials: 'include'
    })
    .then(function(response) {    
        // if display, the user will receive the error message
        console.log(response)
        if(response.status === 501){
            console.log('not implemented');
            return;
        }
        if(response.status === 202) {
            // if success, local storage items will be removed and user will be sent back to the index page
            console.log('success');
            localStorage.setItem('UserStatus', 'Logged Out');
            localStorage.setItem('BackgroundImage', 'Disabled');
            localStorage.setItem('DarkMode', 'Disabled');
            localStorage.setItem('BackgroundColour', 'Default');  
            history.push("/Home");        
            return;
        }
    })
    return false;
}
// ----------------------------------------------Logout user when user click Log Out Button----------------------------------------------------------------------------------------
function postLogOut() {                                                                   
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=logout",{
        method: "POST",
        credentials: 'include'
    })
    .then(function(response){    
        if(response.status === 202) {
            console.log('success');      
            localStorage.setItem('UserStatus', 'Logged Out');
            console.log('Status: Logged Out');
            history.push("/Home");
            return;
        }
    })
    return false;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="profilepage"> 
        {/* Render User's Profile that is fetched from the database through API  */}

            {/* Snack Bar Alert that will display messages when user perform certain actions*/}
            <div className={classes.root}>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            </div>

            {/* Material UI loading Screen before page render */}
            {loading ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
            <div className={classes.root}>
                <Grid id="grid">
                {profile.map((profile, index) => (   
                    <div> 
                        <div id="userprofile">
                            <Person id="profile-logo" style={{fontSize: 120}} />
                                <div>
                                    <div id="profilecontent">
                                        <div><h2>{profile.Username}</h2></div>
                                        <div><strong>Name:</strong> {profile.FirstName} {profile.LastName}</div>
                                        <div><strong>Date Of Birth</strong>: {profile.DateOfBirth}</div>
                                        <div><strong>Email</strong>: {profile.Email}</div>
                                        <div><strong>Mobile Phone</strong>: {profile.Phone}</div>
                                    </div> 
                                    <div className="acc-button-arrangement">
                                        <div className="acc-update-button">
                                            <Button 
                                                onClick={() => openUpdateAccountForm()}
                                                size="small"
                                                variant="contained" 
                                                color="secondary"
                                                className={classes.margin}>
                                                Update Profile
                                            </Button>   
                                        </div>
                                        
                                        <div className="acc-logout-button">
                                            <Button 
                                                onClick={postLogOut}
                                                size="small"
                                                variant="contained" 
                                                color="secondary"
                                                className={classes.margin}>
                                                Log Out
                                            </Button>
                                        </div>

                                        <div className="acc-delete-button">
                                            <Button 
                                                onClick={handleClickOpenDeleteAccount}
                                                size="small"
                                                variant="contained" 
                                                color="secondary"
                                                className={classes.margin}>
                                                Close Account
                                            </Button> 
                                            <Dialog
                                                open={openDeleteAccount}
                                                TransitionComponent={Transition}
                                                keepMounted
                                                onClose={handleCloseDeleteAccount}
                                                aria-labelledby="delete-profile"
                                                aria-describedby="delete-acc-content"
                                            >
                                                <DialogTitle id="delete-profile">{"Closing Your Solar View Cinema Account"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="delete-acc-content">
                                                        <div id="delete-account">
                                                            <h2>Are you sure you want to close your account?</h2>
                                                            <h3>You will no longer be able to book a movie ticket after this account is closed</h3>
                                                        </div>
                                                    </DialogContentText>
                                                </DialogContent>

                                                <DialogActions>
                                                    <Button onClick={() => postDeleteProfile(profile.UserID)} color="primary">
                                                        Yes, Close My Account
                                                    </Button>

                                                    <Button onClick={handleCloseDeleteAccount} color="primary">
                                                        No, Not Really
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>    
                                        </div>          
                                    </div>  
                                </div>
                        </div>

                        <div id="updateform" style={{display: 'none'}}>
                            <form id="updateform" autoComplete="off" onSubmit={handleSubmit(postUpdateProfile)}>
                                <div className="formgroup">
                                    <label for="firstname">First Name</label>
                                    {/* First Name field requires value in order to proceed with the register process */}
                                    <input type="text" placeholder="First Name" name="firstname" id="FirstNameUpd" defaultValue={profile.FirstName}
                                        {...register("FirstName", { required: true })}
                                    />
                                    {/* Error message when the user did not provide username value in the unsername field */}
                                    {errors?.FirstName?.type === "required" && <p className="errormssg">This field is required</p>}
                                </div>

                                <div className="formgroup">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" placeholder="Last Name" name="lastname" id="LastNameUpd" defaultValue={profile.LastName}
                                        {...register("LastName", { required: true })}    
                                    />
                                    {/* Error message when the user did not provide username value in the unsername field */}
                                    {errors?.LastName?.type === "required" && <p className="errormssg">This field is required</p>}
                                </div>  

                                <div className="formgroup">
                                    <label for="dateofbirth">Date of Birth</label>
                                    {/* Date of Birth field requires value and must in correct data format in order to proceed with the register process */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            animateYearScrolling
                                            disableFuture
                                            initialFocusedDate={profile.DateOfBirth}
                                            minDate="1930-01-01"
                                            name="dateofbirth"
                                            margin="normal"
                                            id="DateOfBirthUpd"
                                            placeholder="Date Of Birth"
                                            format="yyyy-MM-dd"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>  

                                <br/>  

                                <div className="formgroup">
                                    <label for="email">Email</label>
                                    {/* Email field requires value and must be in correct data format in order to proceed with the register process */}
                                    <input type="text" placeholder="Email" name="email" id="EmailUpd" defaultValue={profile.Email}
                                        {...register("Email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                    />
                                    {/* Error message when the user did not provide password value in the password field */}
                                    {errors?.Email?.type === "required" && <p className="errormssg">This field is required</p>}
                                    {errors?.Email?.type === "pattern" && <p className="errormssg">Invalid Email</p>}
                                </div>

                                <div className="formgroup">
                                    <label for="Phone">Mobile Phone</label>
                                    {/* Mobile Phone field requires value and must be in correct data format in order to proceed with the register process */}
                                    <input type="text" placeholder="Phone" name="phone" id="PhoneUpd" defaultValue={profile.Phone}
                                        {...register("Phone", { required: true, maxLength: 11, pattern: {value: /^\d{11}$/} })}
                                    />  
                                    {/* Error message when the user did not provide password value in the password field */}
                                    {errors?.Phone?.type === "required" && <p className="errormssg">This field is required</p>}
                                    {errors?.Phone?.type === "maxLength" && <p className="errormssg">Please enter a 10 or 11 digit phone number</p>}
                                    {errors?.Phone?.type === "pattern" && <p className="errormssg">Invalid Mobile Phone Number</p>}  
                                </div>

                                <div className="formgroup">
                                    <label for="username">Username</label>
                                    {/* Username field requires value in order to proceed with the register process */}
                                    <input type="text" placeholder="Username" name="username" id="UsernameUpd" defaultValue={profile.Username}
                                        {...register("Username", { required: true })}
                                    />
                                    {/* Error message when the user did not provide username value in the unsername field */}
                                    {errors?.Username?.type === "required" && <p className="errormssg">This field is required</p>}
                                </div>

                                <div className="formgroup">
                                    <label for="password">Password</label>
                                    {/* Password field requires value in order to proceed with the register process */}
                                    <input type="password" placeholder="Password" name="password" id="PasswordUpd" defaultValue=""
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

                                    <Button 
                                        onClick={() => closeUpdateAccountForm()}
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}>
                                        Cancel Profile Update
                                    </Button>
                                </div> 
                            </form>
                        </div>
                    </div>
                ))}
                     
                </Grid>
            </div>
            )}
        </div>
    );
}
