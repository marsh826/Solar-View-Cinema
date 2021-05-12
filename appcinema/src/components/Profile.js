import React, { useEffect, useState } from 'react';
import { Person } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import '../App.css' 

// Material UI Component Style Const
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
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

    // Material UI Loading Spinner/Circular Progress
    const [loading, setLoading] = useState(true);

    // Material UI Profile Update Dialog
    const [openUpdateAccount, setOpenUpdateAccount] = useState(false);
    const handleClickOpenUpdateAccount = () => {
        setOpenUpdateAccount(true);
    };
    const handleCloseUpdateAccount = () => {
        setOpenUpdateAccount(false);
    };

    // Material UI Account Closure Dialog
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
    const handleClickOpenDeleteAccount = () => {
        setOpenDeleteAccount(true);
    };
    const handleCloseDeleteAccount = () => {
        setOpenDeleteAccount(false);
    };
    
    // When the Profile page/component is loaded, useEffect will use a JavaScript Function to display profile in JSON output only once
    useEffect(() => {
        // showLoading();
        postDisplayProfile();
    }, []);

    // if(loading) return <CircularProgress style={{color: 'white'}}/>

//-----------------------------------------------Display profile when Profile page is loaded---------------------------------------------------------------------------------------
    function postDisplayProfile() {
        // Prepare the output
        var output = '';
        var output2 = '';
        var output3 = '';
        fetch("http://localhost/appcinema/src/api/api.php?action=displayprofile",{
            method: "GET",
            credentials: "include"
        })
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);
                // Display data as output
                data.forEach(row => {
                // User Profile as JSON Output 1
                    output =
                        `<div><h3>UserName<h3></div> `+ row.UserName +`
                        <div><h3>Name<h3></div> `+ row.FirstName +` `+ row.LastName +`
                        <div></div><h4>Date Of Birth: `+ row.DateOfBirth +`<h4>
                        <div></div><h4>Email: `+ row.Email +`<h4>
                        <div></div><h4>Mobile: `+ row.Phone +`<h4>`
                // Prefill Update Form as JSON Output 2
                    output2 = 
                        `<form id="registerform">
                            <div className="formgroup">
                                <label for="firstname">First Name</label>
                                <input id="FirstNameUpd" type="text" placeholder="First Name" name="firstname" value="`+ row.FirstName +`"></input>
                            </div>

                            <div className="formgroup">
                                <label for="lastname">Last Name</label>
                                <input id="LastNameUpd" type="text" placeholder="Last Name" name="lastname" value="`+ row.LastName +`"></input>    
                            </div>  

                            <div className="formgroup">
                                <label for="dateofbirth">Date Of Birth</label>
                                <input id="DateOfBirthUpd" type="text" placeholder="Date of Birth" name="dateofbirth" value="`+ row.DateOfBirth +`"></input>    
                            </div>

                            <div className="formgroup">
                                <label for="email">Email</label>
                                <input id="EmailUpd" type="text" placeholder="Email" name="email" value="`+ row.Email +`"></input>    
                            </div>

                            <div className="formgroup">
                                <label for="Phone">Mobile Phone</label>
                                <input id="" type="text" placeholder="Phone" name="phone" value="`+ row.Phone +`"></input>    
                            </div>

                            <div className="formgroup">
                                <label for="username">Username</label>
                                <input id="UsernameUpd" type="text" placeholder="Username" name="username" value="`+ row.UserName +`"></input>
                            </div>

                            <div className="formgroup">
                                <label for="password">Password</label>
                                <input id="PasswordUpd" type="password" placeholder="Password" name="password" value="`+ row.Password +`"></input>    
                            </div>       
                        </form>`
                //Delete Button with Material UI class and with assigned value of UserID as JSON Output 3
                    output3 = 
                        `<button type="button" class="MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-margin-36 MuiButton-containedPrimary"
                        type="button" onClick="postDeleteProfile(`+ row.UserID +`)">Yes, Close This Account</button>`
                })
                document.getElementById("profilecontent").innerHTML = output;
                document.getElementById("update-account").innerHTML = output2;
                document.getElementById("delete-bttn-OK").innerHTML = output3;
                // setLoading(false);
            })
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
        fetch("http://localhost/appcinema/src/api/api.php?action=updateprofile",{
            method: "POST",
            body: JSON.stringify(profileUpdate),
            credentials: 'include'
        })
        .then(function(response){
            if(response.status === 406) {
                // Will not accept the new update information if they are not filled fully or correctly
                console.log('unaccepted');
                return;
            } 
            if(response.status === 202) {
                console.log('success');
                // Upon successful update, the profile page will be refreshed by reusing the display profile function
                postDisplayProfile();
                return;
            } 
            // Send back error into console log
            response.text().then((text) => {
                console.log(text)
            })
        })
        return false;
    }
//-----------------------------------------------Deleting User Account after the user agree to delete their account----------------------------------------------------------------
function postDeleteProfile(id) {
    var IDuser = {
        'userid' : id
    }
    fetch("http://localhost/appcinema/src/api/api.php?action=deleteprofile",{
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
            localStorage.setItem('loginStatus', 'logged out');
            localStorage.removeItem('profileImage');
            localStorage.removeItem('backgroundImage');
            localStorage.removeItem('font');
            localStorage.removeItem('backgroundColour');  
            history.push("/Home")        
            return;
        }
    })
    return false;
}
// ----------------------------------------------Logout user when user click Log Out Button----------------------------------------------------------------------------------------
function postLogOut() {                                                                   
    fetch("http://localhost/appcinema/src/api/api.php?action=logout",{
        method: "POST",
        credentials: 'include'
    })
    .then(function(response){    
        if(response.status === 202) {
            console.log('success');      
            localStorage.setItem('userStatus', 'logged out');
            console.log('Status: Logged Out');
            history.push("/Home")
            return;
        }
    })
    return false;
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="profilepage">  
            <div id="userprofile">
                <Person id="profile-logo" style={{fontSize: 120}} />
                <div id="profilecontent"></div>
                <div className="acc-button-arrangement">

                    <div className="acc-update-button">
                        <Button 
                            onClick={handleClickOpenUpdateAccount}
                            size="small"
                            variant="contained" 
                            color="secondary"
                            className={classes.margin}>
                            Update Profile
                        </Button>  
                        <Dialog
                            open={openUpdateAccount}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseUpdateAccount}
                            aria-labelledby="update-profile"
                            aria-describedby="update-acc-content"
                        >
                            <DialogTitle id="update-profile">{"Update Profile"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="update-acc-content">
                                    <div id="update-account"></div>   
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                 <Button
                                    onclick={postUpdateProfile}
                                    variant="contained" 
                                    color="primary"
                                    className={classes.margin}>
                                    Update Account Details
                                </Button> 

                                <Button onClick={handleCloseUpdateAccount} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>   
                    </div>

                        <Button 
                            onClick={postLogOut}
                            size="small"
                            variant="contained" 
                            color="secondary"
                            className={classes.margin}>
                            Log Out
                        </Button>

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
                            <DialogTitle id="delete-profile">{"Close Account"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="delete-acc-content">
                                    <div id="delete-account">
                                        <h2>Are you sure you want to close your account?</h2>
                                        <h3>You will no longer be able to book a movie ticket after this account is closed</h3>
                                    </div>
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <div id="delete-bttn-OK"></div>

                                <Button onClick={handleCloseDeleteAccount} color="primary">
                                    No, Not Really
                                </Button>
                            </DialogActions>
                        </Dialog>    
                    </div>          
                </div>
            </div>
        </div>
    );
}
