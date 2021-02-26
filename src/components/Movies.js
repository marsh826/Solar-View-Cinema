import React from 'react';
import PeninsulaIMG from '../img/peninsula.jpg';
import knymgIMG from '../img/KNYMT.jpg';
import fitwIMG from '../img/FITW.jpg';
import thbgIMG from '../img/THBG.jpg';
import mtrogIMG from '../img/Minions.jpg';
import bosslevelIMG from '../img/BossLevel.jpg';
import WW1984IMG from '../img/WW1984.jpg';
import wrongturnIMG from '../img/WrongTurn.jpg';
import JoJo4IMG from '../img/JoJo4.jpg';
import CTIMG from '../img/CT.jpg';
import FreeGuyIMG from '../img/FreeGuy.jpg';
import RKYIimg from '../img/RKYI.jpg';
import Button from '@material-ui/core/Button'
import '../App.css'
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

export default function MovieDisplay() {
    const classes = useStyles();
    return (
        <div id = "moviedisplay">
            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Peninsula</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {PeninsulaIMG}/>
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>KNY: Mugen Train</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {knymgIMG}/> 
                <div className = 'bookingticket'>
                    <Link to = "/Booking">
                        <Button 
                            size = "small" 
                            variant = "contained" 
                            color = "secondary"
                            className = {classes.margin}>
                            Book A Ticket
                        </Button> 
                    </Link>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Fighter In The Wind</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {fitwIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>The Hitman's Bodyguard</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {thbgIMG}/> 
               <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div> 
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Minions: The Rise Of Gru</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {mtrogIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div> 
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Boss Level</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {bosslevelIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Wonder Woman 1984</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {WW1984IMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div> 
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Wrong Turn (2021)</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {wrongturnIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Central Intelligence</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {CTIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div> 
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Free Guy</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {FreeGuyIMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>JoJo's Bizare Adventure</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {JoJo4IMG}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div>
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>

            <div className = "backgroundcover">
                <div className = "movietitle">
                    <h2>Rurouni Kenshi II</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {RKYIimg}/> 
                <div className = 'bookingticket'>
                    <Button 
                        size = "small" 
                        variant = "contained" 
                        color = "secondary"
                        className = {classes.margin}>
                        Book A Ticket
                    </Button>   
                </div> 
                <Button
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Add to Favourite
                </Button>   
            </div>
        </div>
    );
}

