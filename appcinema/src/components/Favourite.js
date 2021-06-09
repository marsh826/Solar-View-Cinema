import React, { useEffect, useState } from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

// React consts set up for Dialog Animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FavouriteMovies() {
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
    };

    // React Const for loading screen before rendering
    const [loading, setLoading] = useState(false);

    // When the Favourite page/component is loaded, useEffect will use a JavaScript Function to display profile in JSON output only once
    useEffect(() => {
        setLoading(true);
        postDisplayFavouriteMovie();
    }, []);

// ---------------------------------------------Displaying the user's list of Favourite movies-------------------------------------------------------------------------------------
    function postDisplayFavouriteMovie() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayfavouritelist",{
            method: "GET",
            credentials: 'include'
        }).then((res) => {
            setLoading(false);
            // Unsuccessfully displaying movies in favourite list
            if (res.status === 204) {
                console.log('no content');
                setMovie([]);
                setMessage("Your favourite list is empty");
                setOpenSnackBar(true);
                setSeverity("warning");
                return;
            }
            // Successfully displaying movies in favourite list
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
                setMessage("Warning: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("warning");
                return;
            }
        })   
    }
// ------------------------------------------Remove a stored movie from the user's favourite movie list----------------------------------------------------------------------------
    function postRemoveFavourite(id) {
        var favouritelist = {
            'favouritelist' : id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=removefavouritemovie",{
            method: "POST",
            body: JSON.stringify(favouritelist),
            credentials: 'include'
        })
        .then(function(response){
            console.log(response);

            // Successfully removing Movie from Favourite list
            if(response.status === 202) {
                console.log('success');
                setOpenSnackBar(true);
                setSeverity("success");
                setMessage("The movie is removed from your favourite list.");
                postDisplayFavouriteMovie();
                return;
            }

            // Unsuccessfully removing Movie From Favourite list
            if(response.status === 501) {
                console.log('not implemented');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Unable to remove favourite. Please try again");
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
                setMessage("Warning: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("warning");
                return;
            }
        })
        return false;
    }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="favourite">
        {/* Render Favourite Movies that are fetched from the database through API  */}
            <h1>Favourite Movie List</h1>

            {/* Render User's Profile that is fetched from the database through API  */}
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
                        <div id ="movie-image">
                        <img 
                        width='300px'
                        height='480px'
                        src={movie.MovieImage}/>
                        </div>

                    {/* View Movie Session Button */}
                        <Button
                            onClick={() => {openMovieDisplay([movie])}}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Description
                        </Button>
    

                    {/* Remove Favourite Movie Button */}
                        <Button
                            onClick={() => postRemoveFavourite(movie.MovieID)}
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Remove
                        </Button> 
                    </div>
                ))}
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
                                        style={{borderRadius: 50}}
                                        width='300px'
                                        height='480px'
                                        src={currentMovie.MovieImage}
                                    />
                                </div>
                                
                                {/* Render Movie Details in Material UI Dialog */}
                                <div id="movie-details">
                                    <div>{currentMovie.MovieDescription}</div><br></br>
                                    <div><strong>Genre:</strong> {currentMovie.Genre}</div>
                                    <div><strong>Release Date:</strong> {currentMovie.ReleaseDate}</div>
                                    <br></br>
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
            )}
        </div>
    )
}