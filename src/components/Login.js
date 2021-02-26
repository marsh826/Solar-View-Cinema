import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

export default function Login() {
    const classes = useStyles();
    window.onload = function() {
        document.getElementById('register-page').style.display = 'none'; 
        document.getElementById('login-page').style.display = 'block'; 
    }
    function loginpage() {
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('register-page').style.display = 'none';
    }
    function registerpage() {
        document.getElementById('register-page').style.display = 'block'; 
        document.getElementById('login-page').style.display = 'none';
    } 
    return(
        <Container maxWidth = "sm" >
            <div id = 'login-page'>
                <form id = "loginform" autoComplete = "off">
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
                        <Link to = "/Register">
                            <Button 
                                variant = "contained" 
                                color = "primary"
                                className = {classes.margin}>
                                Register
                            </Button>    
                        </Link>
                           
                    </div>      
                </form>    
            </div>
        </Container>
    );
}