import React, { useEffect, useState } from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import EventSeat from '@material-ui/icons/EventSeat'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Prices from './Prices';
import Radio from '@material-ui/core/Radio';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// React const that sets up style customisation for Material UI components
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2)
        },
        '& > *': {
          margin: theme.spacing(1),
        }
    },
    iconButton:{
        '& > *': {
            margin: theme.spacing(1),
          }
    },
    iconButtonLabel: {
        display: "flex",
        flexDirection: "column",
        fontSize: 15
    },
    grid: {
        flexGrow: 1
    }
}));

// React consts set up for Dialog Animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Movie Display Function Component with export default
export default function MovieDisplay() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

    // React const set up for Snackbar Alert messages
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    // On clickaway, close Snackbar Alert
    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
    };

    // React Const Movie set up empty array to store data that is successfully fetched
    const [movie, setMovie] = useState([]);

    // React Const Movie Session set up empty array to store data that is successfully fetched
    const [movieSession, setMovieSession] = useState([]);
    const [currentMovie, setCurrentMovie] = useState([]);

    // React consts set up for Dialog
    const [movieDisplay, setMovieDisplay] = useState(false);
    function openMovieDisplay(movie) {
        setMovieDisplay(true);
        setCurrentMovie(movie);
        console.log(movie);
    };
    function closeMovieDisplay() {
        setMovieDisplay(false);
        closeSeatDisplay();
    };

    // React Const Seat set up empty array to store data that is succesfully fetched 
    const [seat, setSeat] = useState([]);

    // React Const Ticket Type set up empty array to store data that is successfully fetched
    const [ticketType, setTicketType] = useState([]);

    // React Const for Material UI Radio button that is used for Ticket Type Field
    const [radioValue, setRadioValue] = useState([]);
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    // When the Movie page/component is loaded, useEffect will use a JavaScript Function to display profile in JSON output only once
    useEffect(() => {
        // showLoading();
        postDisplayMovies();
    }, []);
     
//-----------------------------------------------------------Display Movies on Home Page-------------------------------------------------------------------------------------------
    function postDisplayMovies() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymovies",{
            method: "GET",
            redirect: "error",
            credentials: 'include'
        }).then((res) => {
            if (res.status === 204) {
                console.log('no content');
                setMovie([]);
                setMessage("Error: No movie is found");
                setOpenSnackBar(true);
                setSeverity("Error");
            }
            
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setMovie(data);
                    console.log(data);
                })
            }
        })   
    }
//------------------------------------------------------------Display Movie Sessions------------------------------------------------------------------------------------------------
    function postDisplaySession(id) {
        var movie = {
            'movieid' : id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymoviesession",{
            method: "POST",
            body: JSON.stringify(movie),
            credentials: 'include'
        })
        .then((res) => {
            if (res.status === 204) {
                console.log('no content');
                setMovieSession([]);
                setMessage("Error: Movie sessions are unavailable for this movie");
                setOpenSnackBar(true);
                setSeverity("warning");
            }
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setMovieSession(data);
                    console.log(data);
                })
            }
        })
        return false;
}
//-------------------------------------------------------Display All Seats Available-----------------------------------------------------------------------------------------------
function postDisplaySeats(id) {
    var moviesession = {
        'moviesessionid' : id
    }
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayseats",{
        method: "POST",
        body: JSON.stringify(moviesession),
        credentials: 'include'
    })
    .then((res) => {
        openSeatDisplay();
        if (res.status === 204) {
            console.log('no content');
            setSeat([]);
            setMessage("Error: Unable to display seats for this movie session");
            setOpenSnackBar(true);
            setSeverity("Error");    
        }
        if (res.status === 201) {
            console.log('created');
            res.json().then((data) => {
                setSeat(data);
                console.log(data);
            })
        }
    })
}
// --------------------------------------Storing Ticket Values into Hidden Input Form for Ticket Reservation-----------------------------------------------------------------------
function transferTicketTypeValue(id) {
    var TicketTypeValue = document.getElementById("ticket-type").value;
    TicketTypeValue = id;
    document.getElementById("ticket-type").value = TicketTypeValue;
}
function transferSeatValue(id) {
    var SeatValue = document.getElementById("seat-id").value;
    SeatValue = id;
    document.getElementById("seat-id").value = SeatValue;
}
// --------------------------------------Storing Ticket Values into Hidden Input Form for Ticket Update----------------------------------------------------------------------------
function transferSeatValueUpdt(id) {
    var SeatValueUpdt = document.getElementById("seat-id-update").value;
    SeatValueUpdt = id;
    document.getElementById("seat-id-update").value = SeatValueUpdt;
}

function transferTicketID(id) {
    var TicketIDValue = document.getElementById("ticket-id").value;
    TicketIDValue = id;
    document.getElementById("ticket-id").value = TicketIDValue;
}
//-------------------------------------------------------Open and Close Seat Display-----------------------------------------------------------------------------------------------
function closeSeatDisplay() {
    document.getElementById("movie-details").style.display = "block";
    document.getElementById("sessiondisplay").style.display = "block";
    document.getElementById("imgMovieDisplay").style.display = "block";
    document.getElementById("seat-display").style.display = "none";
}
function openSeatDisplay() {
    document.getElementById("movie-details").style.display = "none";
    document.getElementById("sessiondisplay").style.display = "none";
    document.getElementById("imgMovieDisplay").style.display = "none";
    document.getElementById("seat-display").style.display = "block";
}
//---------------------------------------------------------Displaying Ticket Type--------------------------------------------------------------------------------------------------
function postTicketTypes() {
    fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaytickettype",{
        method: "GET",
        credentials: "include"
    })
    .then((res) => {
        if (res.status === 204) {
            console.log('no content');
            setMovieSession("No Seat Available");
            setMessage("Error: Movie sessions are unavailable for this movie");
            setOpenSnackBar(true);
            setSeverity("Error");    
        }
        if (res.status === 201) {
            console.log('created');
            res.json().then((data) => {
                setTicketType(data);
                console.log(data);
            })
        }
    })
    return false;
}
//------------------------------------------------------------Reserve Seat on Submit-----------------------------------------------------------------------------------------------
function postSeatBooking() {
    var seatbookinginfo = {
        'seatbysessionid': document.getElementById("seat-id").value,
        'tickettypeid': document.getElementById("ticket-type").value
    }
    fetch('api.php?action=seatreserve',{
        method: "POST",
        body: JSON.stringify(seatbookinginfo),
        credentials: "include"
    })
    .then(function(response) {
        // If the seat booking process was successful
        if(response.status == 202) {
            console.log('success');
            return;    
        }
        // If the seat booking process was unsuccessful
        if(response.status == 406) {
            console.log('unaccepted');
            return;
        }
        // Send back error into console log
        response.text().then((text) => {
            console.log(text);
        })
    })
    return false;
}
//-------------------------------------------------------Add Selected Movies to Favourite------------------------------------------------------------------------------------------
    function postAddFavouriteMovie(id) {
        var favouritemovie = {
            "movieid": id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=addfavouritemovie",{
            method: "POST",
            body: JSON.stringify(favouritemovie),
            credentials: "include"
        })
        .then(function(response){
            console.log(response);
            if(response.status == 202) {
                console.log('success');
                setMessage("The movie is added to your Favourite list");
                setOpenSnackBar(true);
                setSeverity("success");
            }
            if(response.status == 501) {
                console.log('not implemented');
                setMessage("The movie is already in your Favourite list");
                setOpenSnackBar(true);
                setSeverity("warning");
            }
        })
        return false;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <div id="moviepage">
            <div className={classes.root}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            </div>

            {/* Render Movies that are fetched from the database through API  */}
            <div id="moviedisplay">
                {movie.map((movie, index) => (
                    <div id="moviecontents">
                        <div id ="movie-image">
                        <img 
                        width='300px'
                        height='480px'
                        src={movie.MovieImage}/>
                        </div>

                        {/* View Movie Session Button */}
                        <Button
                            onClick={() => {openMovieDisplay([movie]); postDisplaySession(movie.MovieID);}}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            View Sessions
                        </Button>
    

                        {/* Add Favourite Movie Button */}
                        <Button
                            onClick={() => postAddFavouriteMovie(movie.MovieID)}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Add Favourite
                        </Button> 
                    </div>
                ))}
                
                {/* Rendering a list of data from currentMovie const in Material UI Dialog */}
                {currentMovie.map((currentMovie, index) => (
                    <Dialog
                        open={movieDisplay}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={closeMovieDisplay}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle id="alert-dialog-slide-title">{currentMovie.MovieName}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div id="display-movie">
                                <div id="imgMovieDisplay">
                                    <img          
                                        className="movie-img-cover"                                  
                                        src={currentMovie.MovieImage}
                                    />    
                                </div>    
                                
                                <Divider />
                                
                                {/* Render Movie Details in Material UI Dialog */}
                                <div id="movie-details">
                                    <div>{currentMovie.MovieDescription}</div>
                                    <Divider />
                                    <div><strong>Genre:</strong> {currentMovie.Genre}</div>
                                    <div><strong>Release Date:</strong> {currentMovie.ReleaseDate}</div>

                                    <Divider />

                                    {/* Render Movie Sessions in Material UI Dialog*/}
                                    <div id="sessiondisplay">
                                        <h3>Available Sessions</h3>
                                        {/* Rendering a list of data from movieSession const in Material UI Dialog */}
                                        {movieSession.map((movieSession, index) =>
                                            <div>
                                                <div>{movieSession.SessionDate}</div>
                                                <div>{movieSession.TimeStart}</div>
                                                <Button
                                                    endIcon={<EventSeat />}
                                                    onClick={() => {postDisplaySeats(currentMovie.MovieID); postTicketTypes();}}
                                                    variant="contained" 
                                                    color="primary"
                                                    className={classes.margin}>
                                                    View Seats
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Render Seats in Material UI Dialog */}
                                <div id="seat-display" style={{display: "none"}}>
                                    <h3>Available Seats</h3>
                                        <div id="seat-items-container">
                                        {/* Rendering a list of data from seat const in Material UI Dialog */}
                                            {seat.map((seat, index) =>
                                                <div className={classes.iconButton}>
                                                    <div id="seats">
                                                        <IconButton 
                                                            classes={{label: classes.iconButtonLabel}}
                                                            onClick={() => transferSeatValue(seat.SeatBySessionID)}>
                                                            <EventSeat />
                                                            <div>{seat.SeatNumber}</div>
                                                        </IconButton>
                                                    </div>                                           
                                                </div>                                                     
                                            )}    
                                        </div>

                                    <Divider />

                                    <h4>Ticket Types</h4>
                                    {/* Rendering a list of data from ticketType const in Material UI Dialog */}
                                        
                                        <div>
                                            {/* {ticketType.map((ticketType, index) =>
                                                
                                            )}     */}
                                        </div>
                                        
                                    <input id="seat-id" value="" readOnly></input>
                                    <input id="ticket-type" value="" readOnly></input>
                                </div> 
                            </div>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {closeMovieDisplay()}} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}

