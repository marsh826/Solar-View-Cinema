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
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Location() {
    const classes = useStyles();
    return(
        <div id = 'location'>
            <h1>Available Cinema Location</h1>
            <div className = 'displaycinema'>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem button>
                        <PinDrop />
                        <ListItemText primary="Chermside" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <PinDrop />
                        <ListItemText primary="Brisbane City" />
                    </ListItem>
                    <ListItem button>
                        <PinDrop />
                        <ListItemText primary="South Bank" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <PinDrop />
                        <ListItemText primary="Garden City" />
                    </ListItem>
                </List>    
            </div>
        </div>
    );
}