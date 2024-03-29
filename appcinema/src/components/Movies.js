import React, { useEffect, useState } from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { EventSeat, Check } from '@material-ui/icons'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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
    iconButton: {
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loadingcontent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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

    // React Consts set up for Snackbar Alert messages
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    // React const for toggle between movie contents and seats display
    const [dialog, setDialog] = useState("movie_contents");

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

    // React Const Selected Movie set up empty array to 
    // store data of a specific movie selected to display in dialog
    const [currentMovie, setCurrentMovie] = useState([]);

    // React const set up for Dialog
    const [movieDisplay, setMovieDisplay] = useState(false);

    // React Const Seat set up empty array to store data that is succesfully fetched 
    const [seat, setSeat] = useState([]);

    // React Const Ticket Type set up empty array to store data that is successfully fetched
    const [ticketType, setTicketType] = useState([]);

    // React Const for Selected Seat Field
    const [seatSelected, setSeatSelected] = useState([]);

    // React Const Seat Highlighted when Selected
    const [seatHighlight, setSeatHighlight] = useState([]);

    // React Const for Material UI Radio button that is used for Ticket Type Field
    const [radioValue, setRadioValue] = useState([]);
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    // Functions for open and close Dialog
    function openMovieDisplay(movie) {
        setMovieDisplay(true);
        setCurrentMovie(movie);
        console.log(movie);
    };

    function closeMovieDisplay() {
        // Upon closing the Movie Dialog, reset seat booking fields
        setMovieDisplay(false);
        setSeatSelected([]);
        setRadioValue([]);
        setSeatHighlight([]);
        setDialog("movie_contents");
    };

    // React Const for loading screen before rendering
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    // When the Movie page/component is loaded, useEffect will use a JavaScript Function to display profile in JSON output only once
    useEffect(() => {
        setLoading(true);
        postDisplayMovies();
    }, []);

//-----------------------------------------------------------Display Movies on Home Page-------------------------------------------------------------------------------------------
    function postDisplayMovies() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymovies", {
            method: "GET",
            redirect: "error",
            credentials: 'include'
        }).then((res) => {
            setLoading(false);
            // Successfully displaying movies 
            if (res.status === 204) {
                console.log('no content');
                setMovie([]);
                setMessage("Error: No movie is found");
                setOpenSnackBar(true);
                setSeverity("Error");
                return;
            }
            // Unsuccessfully displaying movies
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setMovie(data);
                    console.log(data);
                });
                return;
            }
            // When daily request limit exceeded
            if (res.status === 422) {
                console.log('Request limit exceeded within 24 hours');
                setMessage("Error: Request limit exceeded within 24 hours");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
            // When Rate Limit per second exceeded
            if (res.status === 429) {
                console.log('Exceeded Rate Limit');
                setMessage("Error: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
        })
    }
//------------------------------------------------------------Display Movie Sessions------------------------------------------------------------------------------------------------
    function postDisplaySession(id) {
        var movie = {
            'movieid': id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymoviesession", {
            method: "POST",
            body: JSON.stringify(movie),
            credentials: 'include'
        })
            .then((res) => {
                // Successfully display movie session when selecting a movie
                if (res.status === 204) {
                    console.log('no content');
                    setMovieSession([]);
                    setMessage("Error: Movie sessions are unavailable for this movie");
                    setOpenSnackBar(true);
                    setSeverity("warning");
                    return;
                }
                // Unsuccessfully display movie session when selecting a movie
                if (res.status === 201) {
                    console.log('created');
                    res.json().then((data) => {
                        setMovieSession(data);
                        console.log(data);
                    });
                    return;
                }
                // When daily request limit exceeded
                if (res.status === 422) {
                    console.log('Request limit exceeded within 24 hours');
                    setMessage("Error: Request limit exceeded within 24 hours");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When Rate Limit per second exceeded
                if (res.status === 429) {
                    console.log('Exceeded Rate Limit');
                    setMessage("Error: Exceeded Rate Limit");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
            })
        return false;
    }
//-------------------------------------------------------Display All Seats Available-----------------------------------------------------------------------------------------------
    function postDisplaySeats(id) {
        // Turn on loading
        setLoading2(true);
        var moviesession = {
            'moviesessionid': id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayseats", {
            method: "POST",
            body: JSON.stringify(moviesession),
            credentials: 'include'
        })
            .then((res) => {
                // Turn off loading
                setLoading2(false);
                // Successfully display seats when selecting a specific movie session 
                if (res.status === 204) {
                    console.log('no content');
                    setSeat([]);
                    setMessage("Error: Unable to display seats for this movie session");
                    setOpenSnackBar(true);
                    setSeverity("Error");
                    return;
                }
                // Unsuccessfully display seats when selecting a specific movie session
                if (res.status === 201) {
                    console.log('created');
                    res.json().then((data) => {
                        setSeat(data);
                        console.log(data);
                    });
                    return;
                }
                // When daily request limit exceeded
                if (res.status === 422) {
                    console.log('Request limit exceeded within 24 hours');
                    setMessage("Error: Request limit exceeded within 24 hours");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When Rate Limit per second exceeded
                if (res.status === 429) {
                    console.log('Exceeded Rate Limit');
                    setMessage("Error: Exceeded Rate Limit");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
            })
    }
// ------------------------------------------Upon Selecting, the selected seat will be highlighted green---------------------------------------------------------------------------
    function seatToggleActive(id) {
        setSeatHighlight(id);
    }

    function seatToggleStyles(id) {
        if (id === seatHighlight) {
            return "seatSelected";
        } else {
            return "seatNotSelected";
        }
    }
// --------------------------------------Storing Ticket Values into Hidden Input Form for Ticket Reservation-----------------------------------------------------------------------
    function transferSeatValue(id) {
        setSeatSelected(id);
    }
//---------------------------------------------------------Displaying Ticket Type--------------------------------------------------------------------------------------------------
    function postTicketTypes() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaytickettype", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                setLoading3(false);
                // Unsuccessfully display ticket types
                if (res.status === 204) {
                    console.log('no content');
                    setMovieSession([]);
                    setMessage("Error: Unable to fetch ticket type");
                    setOpenSnackBar(true);
                    setSeverity("error");
                }
                // Successfully display ticket types
                if (res.status === 201) {
                    console.log('created');
                    res.json().then((data) => {
                        setTicketType(data);
                        console.log(data);
                    });
                    return;
                }
                // When daily request limit exceeded
                if (res.status === 422) {
                    console.log('Request limit exceeded within 24 hours');
                    setMessage("Error: Request limit exceeded within 24 hours");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When Rate Limit per second exceeded
                if (res.status === 429) {
                    console.log('Exceeded Rate Limit');
                    setMessage("Error: Exceeded Rate Limit");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
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
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=seatreserve", {
            method: "POST",
            body: JSON.stringify(seatbookinginfo),
            credentials: "include"
        })
            .then(function (response) {
                // If the seat booking process was successful
                if (response.status === 202) {
                    console.log('success');
                    document.getElementById("seat-booking").reset();
                    setMessage("Ticket Booked Successfully!");
                    setOpenSnackBar(true);
                    setSeverity("success");
                    return;
                }
                // If the seat booking process was unsuccessful
                if (response.status === 406) {
                    console.log('unaccepted');
                    setMessage("Error: Booking Failed.");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When daily request limit exceeded
                if (response.status === 422) {
                    console.log('Request limit exceeded within 24 hours');
                    setMessage("Error: Request limit exceeded within 24 hours");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When Rate Limit per second exceeded
                if (response.status === 429) {
                    console.log('Exceeded Rate Limit');
                    setMessage("Error: Exceeded Rate Limit");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
            })
        return false;
    }
//-------------------------------------------------------Add Selected Movies to Favourite------------------------------------------------------------------------------------------
    function postAddFavouriteMovie(id) {
        var favouritemovie = {
            "movieid": id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=addfavouritemovie", {
            method: "POST",
            body: JSON.stringify(favouritemovie),
            credentials: "include"
        })
            .then(function (response) {
                console.log(response);
                // Successfully adding selected movie into favourite list
                if (response.status === 202) {
                    console.log('success');
                    setMessage("The movie is added to your Favourite list");
                    setOpenSnackBar(true);
                    setSeverity("success");
                    return;
                }
                // Unsuccessfully adding selected movie into favourite list
                if (response.status === 501) {
                    console.log('not implemented');
                    setMessage("The movie is already in your Favourite list");
                    setOpenSnackBar(true);
                    setSeverity("warning");
                    return;
                }
                // When daily request limit exceeded
                if (response.status === 422) {
                    console.log('Request limit exceeded within 24 hours');
                    setMessage("Error: Request limit exceeded within 24 hours");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
                // When Rate Limit per second exceeded
                if (response.status === 429) {
                    console.log('Exceeded Rate Limit');
                    setMessage("Error: Exceeded Rate Limit");
                    setOpenSnackBar(true);
                    setSeverity("error");
                    return;
                }
            })
        return false;
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <div id="moviepage">
            {/* Render Movies that are fetched from the database through API  */}

            {/* Snack Bar Alert that will display messages when user perform certain actions*/}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>

            {/* Material UI loading Screen before page render */}
            {loading ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <div id="moviedisplay">
                    {movie.map((movie, index) => (
                        <div id="moviecontents">
                            <div id="movie-image">
                                <img
                                    width='300px'
                                    height='480px'
                                    src={movie.MovieImage} />
                            </div>

                            {/* View Movie Session Button */}
                            <Button
                                onClick={() => { openMovieDisplay([movie]); postDisplaySession(movie.MovieID); }}
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
                            <DialogTitle
                                id="alert-dialog-slide-title">
                                {currentMovie.MovieName}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <div id="display-movie">
                                        {dialog == "movie_contents" ? (
                                        <div id="movie-contents">
                                            <div id="imgMovieDisplay">
                                                <Grid id="grid-MovieIMG">
                                                    <img
                                                        className="movie-img-cover"
                                                        src={currentMovie.MovieImage}
                                                    />
                                                </Grid>
                                            </div>

                                            <Divider />

                                            <div id="movie-details">
                                                {/* Render Movie Details in Material UI Dialog */}
                                                <div>
                                                    {currentMovie.MovieDescription}
                                                </div>
                                                <Divider />
                                                <div>
                                                    <strong>Genre:</strong> {currentMovie.Genre}
                                                </div>
                                                <div>
                                                    <strong>Release Date:</strong> {currentMovie.ReleaseDate}
                                                </div>

                                                <Divider />

                                                {/* Render Movie Sessions in Material UI Dialog*/}
                                                <div id="sessiondisplay">
                                                    <h3>Available Sessions</h3>
                                                    {/* Rendering a list of data from movieSession const in Material UI Dialog */}
                                                    {movieSession.map((movieSession, index) =>
                                                    // The View Movie Seats button will be disabled if the user is not logged in
                                                    {
                                                        if (localStorage.getItem('UserStatus') === "Logged Out") {
                                                            return (
                                                                <div id="movie-session-content">
                                                                    <div>{movieSession.SessionDate}</div>
                                                                    <div>{movieSession.TimeStart}</div>
                                                                    <Button
                                                                        disabled
                                                                        endIcon={<EventSeat />}
                                                                        variant="contained"
                                                                        color="primary"
                                                                        className={classes.margin}>
                                                                        Please log in to book a seat
                                                            </Button>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div id="movie-session-content">
                                                                    <div>{movieSession.SessionDate}</div>
                                                                    <div>{movieSession.TimeStart}</div>
                                                                    <Button
                                                                        endIcon={<EventSeat />}
                                                                        onClick={() => { 
                                                                            postDisplaySeats(movieSession.MovieSessionID); 
                                                                            postTicketTypes();
                                                                            setDialog("display_seats");
                                                                        }}
                                                                        variant="contained"
                                                                        color="primary"
                                                                        className={classes.margin}>
                                                                        View Seats
                                                                    </Button>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    )}
                                                </div>
                                            </div>    
                                        </div> 
                                        ) : (
                                        <div id="seat-display">
                                            {/* Render Seats in Material UI Dialog */}
                                            <h3>Available Seats</h3>
                                            {loading2 ? (
                                                <div className={classes.loadingcontent}>
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            ) : (
                                                <div id="seat-items-container">
                                                    {/* Rendering a list of data from seat const in Material UI Dialog */}
                                                    {seat.map((seat, index) =>
                                                        <div className={classes.iconButton}>
                                                            <div id="seats">
                                                                <IconButton
                                                                    disabled={seat.ReservationStatus}
                                                                    classes={{ label: classes.iconButtonLabel }}
                                                                    onClick={() => { transferSeatValue(seat.SeatBySessionID); seatToggleActive(seat.SeatBySessionID); }}>
                                                                    <EventSeat className={seatToggleStyles(seat.SeatBySessionID)} />
                                                                    <div>{seat.SeatNumber}</div>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Seat Colour Indicator */}
                                            <div className="colour-indicator">
                                                <h4>Colour Indicator</h4>
                                                <p>Grey: Available</p>
                                                <p style={{ color: "green" }}>Green: Selected</p>
                                                <p style={{ color: "red" }}>Red: Booked</p>
                                            </div>

                                            <Divider />

                                            <h4>Ticket Types</h4>
                                            {/* Rendering a list of data from ticketType const in Material UI Dialog */}
                                            {loading3 ? (
                                                <div className={classes.loadingcontent}>
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            ) : (
                                                <FormControl component="fieldset">
                                                    <RadioGroup
                                                        aria-label="tickettype"
                                                        name="tickettype1"
                                                        value={radioValue}
                                                        onChange={handleRadioChange}
                                                    >
                                                        {ticketType.map((ticketType, index) =>
                                                            <div>
                                                                <FormControlLabel
                                                                    control={<Radio
                                                                        value={ticketType.TicketTypeID.toString()} />}
                                                                    label={ticketType.Name}
                                                                />
                                                                <div>${ticketType.Price}</div>
                                                            </div>
                                                        )}
                                                        <p>If you are paying for the 'Student' price, you are required to present your Student ID before entering the cinema room.</p>
                                                    </RadioGroup>
                                                </FormControl>
                                            )}

                                            {/* Hidden Form that allow seatID and ticketTypeID to be filled and prepare for reservation */}
                                            <form id="seat-booking" style={{ display: 'none' }}>
                                                <input id="seat-id" value={seatSelected} readOnly />
                                                <input id="ticket-type" value={radioValue} readOnly />
                                            </form>
                                            <Button
                                                endIcon={<Check />}
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                className={classes.margin}
                                                onClick={() => { postSeatBooking(); closeMovieDisplay(); }}
                                            >
                                                Reserve
                                            </Button>
                                        </div>
                                        )}
                                    </div>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => { closeMovieDisplay() }}
                                    color="primary"
                                >
                                    Close
                            </Button>
                            </DialogActions>
                        </Dialog>
                    ))}
                </div>
            )}
        </div>
    );
}

