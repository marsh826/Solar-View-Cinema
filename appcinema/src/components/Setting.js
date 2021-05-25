import React from 'react';
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

    const handleDarkMode = (event) => {
        setDarkModeSwitch(event.target.checked);
        if(darkModeSwitch === false) {
            document.body.classList.add('darkmodeSecondary');
        } else {
            document.body.classList.remove('darkmodeSecondary');
        }
    };

    const [darkModeSwitch, setDarkModeSwitch] = useState([]);

    
    return(
        // <ThemeProvider theme={theme}>
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
        // </ThemeProvider>
    );
}