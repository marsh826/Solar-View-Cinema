import React from 'react';
// import PeninsulaIMG from '../img/peninsula.jpg';
// import knymgIMG from '../img/KNYMT.jpg';
// import fitwIMG from '../img/FITW.jpg';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function HomePage() {
  const classes = useStyles();
    return(
        <div id = "new-movie">
          <h1>Newly Released Movie</h1>
          {/* <div className = "backgroundcover2">
                <div className = "movietitle">
                    <h2>Peninsula</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {PeninsulaIMG}/>   
                <Button 
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Book A Ticket
                </Button> 
            </div>

            <div className = "backgroundcover2">
                <div className = "movietitle">
                    <h2>KNY: Mugen Train</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {knymgIMG}/> 
                <Button 
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Book A Ticket
                </Button> 
            </div>

            <div className = "backgroundcover2">
                <div className = "movietitle">
                    <h2>Fighter In The Wind</h2>
                </div>
                <img
                    className = "movieimg" 
                    src = {fitwIMG}/> 
                <Button 
                    size = "small" 
                    variant = "contained" 
                    color = "secondary"
                    className = {classes.margin}>
                    Book A Ticket
                </Button>   
            </div>
          
          <div className = "welcome-message">
            <h2>Welcome to Solar View Cinema</h2>
                <h4>We are the newly established cinema in Brisbane. We are aiming to bring you top quality cinema experiene for your entertainment</h4>  
          </div> */}
        </div>
    );
}
  