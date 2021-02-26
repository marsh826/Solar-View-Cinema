import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

export default function Register() {
    const classes = useStyles();
    return(
        <Container maxWidth = "sm">
            <div id = 'register-page'>
                <form id = "registerform">
                    <div className ="formgroup">
                        <label for = "firstname">First Name</label>
                        <input type = "text" placeholder = "First Name" name = "firstname"></input>
                    </div>

                    <div className = "formgroup">
                        <label for = "lastname">Last Name</label>
                        <input type = "text" placeholder = "Last Name" name = "lastname"></input>    
                    </div>  

                    <div className = "formgroup">
                        <label for = "email">Email</label>
                        <input type = "text" placeholder = "Email" name = "email"></input>    
                    </div>

                    <div className = "formgroup">
                        <label for = "Phone">Mobile Phone</label>
                        <input type = "text" placeholder = "Phone" name = "phone"></input>    
                    </div>

                    <div className ="formgroup">
                        <label for = "username">Username</label>
                        <input type = "text" placeholder = "Username" name = "username"></input>
                    </div>

                    <div className = "formgroup">
                        <label for = "password">Password</label>
                        <input type = "text" placeholder = "Password" name = "password"></input>    
                    </div>

                    <div id = "login-button">
                        <Button
                            variant = "contained" 
                            color = "primary"
                            className = {classes.margin}>
                            Enter
                        </Button>
                        <Link to = "/Login">
                            <Button 
                                variant = "contained" 
                                color = "primary"
                                className = {classes.margin}>
                                Return
                            </Button>
                        </Link> 
                    </div>    
                </form>    
            </div>
        </Container>
        
    );
}