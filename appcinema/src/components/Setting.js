import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import '../App.css'
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Help from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingOptions() {

    // React Const and Functions for Help Document Dialog
    const [helpDocument, setHelpDocument] = useState(false);

    function openHelpDocument() {
        setHelpDocument(true);
    }

    function closeHelpDocument() {
        setHelpDocument(false);
    }


    // React Const for Dark Mode Switch State 
    const [darkModeSwitch, setDarkModeSwitch] = useState(true);

    // React Const for Dark Mode Switch State and functionalities
    const handleDarkMode = (event) => {
        setDarkModeSwitch(event.target.checked);
        if(darkModeSwitch === false) {
            localStorage.setItem('DarkMode', 'Enabled');
            document.getElementById("swipenavbar").classList.add("darkmodePrimary");
            document.body.classList.add('darkmodeSecondary');
            document.getElementById("footer").classList.add("darkmodePrimary");
            // document.getElementById("navDrawer").classList.add("darkmodeSecondary");
            // document.getElementById("userprofile").classList.add("darkmodePrimary");
            // document.getElementById("moviecontents").classList.add("darkmodeSecondary");
            // document.getElementById("ticket-display-container").classList.add("darkmodePrimary");
        } else {
            localStorage.setItem('DarkMode', 'Disabled');
            document.getElementById("swipenavbar").classList.remove("darkmodePrimary");
            document.body.classList.remove('darkmodeSecondary');
            document.getElementById("footer").classList.remove("darkmodePrimary");
            // document.getElementById("navDrawer").classList.remove("darkmodeSecondary");
            // document.getElementById("userprofile").classList.remove("darkmodePrimary");
            // document.getElementById("moviecontents").classList.remove("darkmodeSecondary");
            // document.getElementById("ticket-display-container").classList.remove("darkmodePrimary");
        }
    };

    // Set the Dark Mode Switch state based on Dark Mode status
    function DarkModeSwitchCheck() {
        if(localStorage.getItem("DarkMode") === 'Enabled') {
            setDarkModeSwitch(true);
        } else {
            setDarkModeSwitch(false);
        }
    }

    // React Const for Background Colour switch state
    const [bgColour, setBGColour] = useState(true);

    // React Const for Background Colour Switch State and functionalities
    const handleBackgroundColour = (event) => {
        setBGColour(event.target.checked);
        if(bgColour === false) {
            localStorage.setItem('BackgroundColour', 'Default 2');
            document.body.classList.add("backgroundColour2");
        } else {
            localStorage.setItem('BackgroundColour', 'Default');
            document.body.classList.remove("backgroundColour2");
        }
    }

    // Set the Background Colour Switch state based on Background Colour status
    function backgroundColourCheck() {
        if(localStorage.getItem("BackgroundColour") === "Enabled") {
            setBGColour(true);
            } else {
            setBGColour(false);
        }
    }
    
    // React Const for Background Image Switch State
    const [bgIMG, setBGIMG] = useState(true);

    // React Const for Background Image Switch State and functionalities
    const handleBackgroundImage = (event) => {
        setBGIMG(event.target.checked);
        if(bgIMG === false) {
            localStorage.setItem('BackgroundImage', 'Enabled');
            document.body.classList.add("backgroundIMG");
        } else {
            localStorage.setItem('BackgroundImage', 'Disabled');
            document.body.classList.remove("backgroundIMG");
        }
    }

    // Set the Background Colour Switch state based on Background Colour status
    function backgroundIMGCheck() {
        if(localStorage.getItem("BackgroundImage") === "Enabled") {
            setBGIMG(true);
        } else {
            setBGIMG(false);
        }
    }

    useEffect(() => {
        DarkModeSwitchCheck();
        backgroundColourCheck();
        backgroundIMGCheck();
    }, []);
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row> 
                <div id = "setting-list">
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Switch 
                            checked={bgIMG} 
                            onChange={handleBackgroundImage} 
                            name="backgroundImageSwitch"/>}
                        label="Background Image"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        style={{color: 'whitesmoke'}}
                        value="end"
                        control={<Switch 
                            checked={bgColour} 
                            onChange={handleBackgroundColour} 
                            name="backgroundColourSwitch"/>}
                        label="Change Background Colour"
                        labelPlacement="end"
                    />

                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={
                            <IconButton
                                onClick={openHelpDocument}
                            >
                                <Help style = {{color: 'white'}} />   
                            </IconButton>
                        }
                        label="Help Document"
                        labelPlacement="end"
                    />
                    <Dialog
                        open={helpDocument}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={closeHelpDocument}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Solar View Cinema Help Document"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <h2>This document will provide tutorials on Solar View Cinema App's functionalities</h2>

                            <h4>1. Ticket Booking</h4>
                            <p>
                                In the Movie Page, there are a wide range of select for you to choose. To book a ticket, click on 
                                "View Session" button on a movie that you are interested and select any session available. 
                                From there, you can choose any seat that are available and pick a ticket type.
                            </p>
                            <p>
                                There are 4 ticket types: Children, Adult, Student and Senior. Each ticket type has a different price
                            </p>

                            <h4>2. Favourite Movie</h4>
                            <p>
                                From the Movie Page, you can also add any movie you like to your favourite movie list that is viewable in
                                "Favourite" page. Click on "Add to Favourite" button to add a movie to your list.  
                            </p>
                            <p>
                                In the "Favourite" page, you view all of your movies that are added into the favourite list. You can
                                click on the "Description" button to see more details about the movie. Additionally, you can remove
                                any movie that you are no longer interested from the list by clicking on "Remove" button.  
                            </p>

                            <h4>3. User Profile</h4>
                            <p>You can view your user account details here in this page. You have three options to:</p>
                            <p>1.Log Out of Your Account</p>
                            <p>2.Update Your Account Information by clicking "Edit"</p>
                            <p>3.Delete Your Account Permanently</p>
                            <p>Note: Upon deleting your account, you will no longer have access to your current account and will be 
                                automatically logged out.
                            </p>

                            <h4>4. Settings</h4>
                            <p>
                                Customisation Options are available as check boxes where you can experience the diffrent side of the app with just one click
                            </p>
                            <p>
                                Note: By enabling "Change Background Picture" option, the background picture will cover the background of the app, hence you 
                                will be unable to see the app's default background colour or default background colour 2 that can be set through 
                                "Change Background Colour" option.
                            </p>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={closeHelpDocument} color="primary">
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                    
                    <FormControlLabel
                        style={{color: 'whitesmoke'}}
                        control={<Switch 
                            checked={darkModeSwitch} 
                            onChange={handleDarkMode} 
                            name="darkModeSwitch"/>
                        }
                        label="Dark Mode"
                        labelPlacement="end"
                    />
                </div>
            </FormGroup>
        </FormControl>
    );
}