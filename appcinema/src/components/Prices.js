import React from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { PinDrop } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 10,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Location() {
    const classes = useStyles();
    return(
        <div id = 'location'>
            <h1>Solar View Cinema Ticket Prices</h1>
            <div className = 'displayprices'>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem>
                        <PinDrop />
                        <ListItemText primary="Adult = $15.00" />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <PinDrop />
                        <ListItemText primary="Children = $11.00" />
                    </ListItem>
                    <ListItem>
                        <PinDrop />
                        <ListItemText primary="Student = $13.00 *" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <PinDrop />
                        <ListItemText primary="Pensioner = $14.50" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <PinDrop />
                        <ListItemText primary="Senior = $12.50" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary = "*If you are paying for the 'Student' price, you are required to present your Student ID before entering the cinema room."></ListItemText>
                    </ListItem>
                </List>    
            </div>
        </div>
    );
}