import React, { useState } from 'react';
import '../App.css'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

// Material UI Component Style Const
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
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

    function postAdminLogin() {
        var adminlogin = {
            'adminUsername' : document.getElementById("UserNameAdmin").value,
            'adminPassword' : document.getElementById("PasswordAdmin").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminlogin", {
            method: "POST",
            body: JSON.stringify(adminlogin),
            credentials: 'include'
        })
        .then((response) => {
            if (response.status === 403) {
                console.log(response);
                console.log('unauthorised');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: You are not authorised to access this section.");
                return;
            }
            if(response.status === 202) {
                console.log(response);
                console.log('success');
                localStorage.setItem('UserStatus', 'Logged In');
                console.log('Status: Logged In');
                // document.getElementById('loginform').reset();
                history.push("/admin");
                return;
            }
        })
    }
    return(
        <div id="loginpage">
            {/* Render of Material UI Snackbar Alert Message that automatically hides after 4 seconds */}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>    
            </div>

            <div className="login-container">
                <h2>Administrator Login</h2>
                <form id="login-form" autoComplete="off">
                    <div className="formgroup">
                        <label for="usernameAdmin">Username</label>
                        <input id="UserNameAdmin" defaultValue="" name="usernameAdmin" placeholder="Username" />
                    </div>

                    <div className="formgroup">
                        <label for="passwordAdmin">Password</label>
                        <input id="PasswordAdmin" defaultValue="" name="passwordAdmin" placeholder="Password" />    
                    </div>
                    <Button 
                        id="login-submit"
                        type="button"
                        variant="contained" 
                        color="primary"
                        onClick={postAdminLogin}
                    >
                        Enter
                    </Button>
                </form>
            </div>
        </div>
    );
}