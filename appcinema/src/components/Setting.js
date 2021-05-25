import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../App.css'
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Brightness7, Brightness4 } from '@material-ui/icons'

export default function SettingOptions() {
    // React Const for Dark Mode Switch State 
    const [darkModeSwitch, setDarkModeSwitch] = useState([]);

    // React Const for Dark Mode Switch State and functionalities
    const handleDarkMode = (event) => {
        setDarkModeSwitch(event.target.checked);
        if(darkModeSwitch === false) {
            localStorage.setItem('DarkMode', 'Enabled');
            document.getElementById("swipenavbar").classList.add("darkmodePrimary");
            document.body.classList.add('darkmodeSecondary');
            document.getElementById("footer").classList.add("darkmodePrimary");
            document.getElementById("userprofile").classList.add("darkmodePrimary");
        } else {
            localStorage.setItem('DarkMode', 'Disabled');
            document.getElementById("swipenavbar").classList.remove("darkmodePrimary");
            document.body.classList.remove('darkmodeSecondary');
            document.getElementById("footer").classList.remove("darkmodePrimary");
            document.getElementById("userprofile").classList.remove("darkmodePrimary");
        }
    };

    // Set the Component to Dark Mode by checking for Dark Mode status
    function DarkModeCheck() {
        if(localStorage.getItem("DarkMode") === 'Enabled') {
            document.body.classList.add("darkmodeSecondary");
            setDarkModeSwitch(true);
        } else {
            setDarkModeSwitch(false);
            document.body.classList.remove("darkmodeSecondary");
        }
    }

    useEffect(() => {
        DarkModeCheck();
    }, [])

    return(
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row> 
                <div id = "setting-list">
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Checkbox style = {{color: 'white'}} />}
                        label="Background Image"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Checkbox style = {{color: 'white'}} />}
                        label="Change Text Font"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Checkbox style = {{color: 'white'}} />}
                        label="Change Text Color"
                        labelPlacement="end"
                    />
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