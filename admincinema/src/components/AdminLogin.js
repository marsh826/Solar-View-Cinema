import React, { useState } from 'react';
import '../App.css'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

    // Default React Hook Form const for Login FormValidation
    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm();

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
                history.push("/admin/dashboard");
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
                {/* Login Form */}
                <form id="login-form" autoComplete="off" onSubmit={handleSubmit(postAdminLogin)}>
                    <div className="formgroup">
                        {/* Username field requires value in order to proceed with the login process */}
                        <label for="usernameAdmin">Username</label>
                        <input id="UserNameAdmin" defaultValue="" name="usernameAdmin" placeholder="Username" type="text" 
                            {...register("adminUsername", { required: true})}
                        />
                        {/* Error message when the user did not provide username value in the unsername field */}
                        {errors?.adminUsername?.type === "required" && <p className="errormssg">Please enter your username</p>}
                    </div>

                    <div className="formgroup">
                        <label for="passwordAdmin">Password</label>
                        {/* Password field requires value in order to proceed with the login process */}
                        <input id="PasswordAdmin" defaultValue="" name="passwordAdmin" placeholder="Password" type="password"
                            {...register("adminPassword", { required: true})}
                        />  
                        {/* Error message when the user did not provide password value in the password field */}
                        {errors?.adminPassword?.type === "required" && <p className="errormssg">Please enter your password</p>}  
                    </div>
                    <Button 
                        id="login-submit"
                        type="submit"
                        variant="contained" 
                        color="primary"
                    >
                        Enter
                    </Button>
                </form>
            </div>
        </div>
    );
}