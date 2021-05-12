import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import '../App.css'

export default function SettingOption() {
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    
    const [state, setState] = React.useState({
    DarkMode: false
    });

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
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Checkbox style = {{color: 'white'}} />}
                        label="Change Profile Image"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        value="end"
                        control={<Checkbox style = {{color: 'white'}} />}
                        label="Change Profile Image"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        style = {{color: 'whitesmoke'}}
                        control = {<Switch
                            color = 'primary'
                            style = {{
                                color: '#00FFFF'}}
                            checked = {state.DarkMode}
                            onChange = {handleChange}
                            name = "DarkMode"
                        />}
                        label = "Dark Mode"
                        labelPlacement="end"
                    />
                </div>
            </FormGroup>
        </FormControl>
    );
}