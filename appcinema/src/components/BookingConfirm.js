import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

export default function BookingSuccess() {
    const classes = useStyles();
    return(
        <div>
            <h1>Your booking was a success. Thank you for choosing Solar View Cinema</h1>
            {/* <Link className = "routelinkreact" to = "/Movies">
                <Button 
                    variant = "contained" 
                    color = "primary"
                    className = {classes.margin}>
                    OK
                </Button>    
            </Link>     */}
        </div>
    ); 
}