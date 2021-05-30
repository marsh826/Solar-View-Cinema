import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../App.css';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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

export default function HomePage() {
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

    // React Const Latest Movie set up empty array to store data that is successfully fetched
    const [latestMovie, setLatestMovie] = useState([]);

    // React Const Selected Movie set up empty array to 
    // store data of a specific movie selected to display in dialog
    const [selectedMovie, setSelectedMovie] = useState([]);

    // React consts set up for Dialog
    const [movieDialog, setMovieDialog] = useState(false);
    function openMovieDialog(latestmovie) {
        setMovieDialog(true);
        setSelectedMovie(latestmovie);
        console.log(latestmovie);
    };
    function closeMovieDialog() {
        setMovieDialog(false);
    };

    // React Const for loading screen before rendering
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        postDisplayLatestMovies();
    }, []);

//--------------------------------------Display 3 Latest Movies on Home page-------------------------------------------------------------------------------------------------------   
    function postDisplayLatestMovies() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaylatestmovies",{
            method: "GET",
            redirect: "error",
            credentials: 'include'
        }).then((res) => {
            setLoading(false);
            if (res.status === 204) {
                console.log('no content');
                setLatestMovie([]);
                setMessage("Error: Unable to fetch");
                setOpenSnackBar(true);
                setSeverity("error");
            }
            
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setLatestMovie(data);
                    console.log(data);
                })
            }
        })   
    }  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="new-movie">
        {/* Render Latest Movies that are fetched from the database through API  */}

            {/* Snack Bar Alert that will display messages when user perform certain actions*/}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>

            <h1>Newly Released Movies</h1>
            {/* Material UI loading Screen before page render */}
            {loading ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
            <div id="moviedisplay">
                {latestMovie.map((latestMovie, index) => (
                <div id="moviecontents">
                    <div className ="movie-image">
                    <img 
                    width='300px'
                    height='480px'
                    src={latestMovie.MovieImage}
                    />
                    {/* View Movie Session Button */}
                    <Button
                        onClick={() => {openMovieDialog([latestMovie])}}
                        variant="contained" 
                        color="primary"
                        className={classes.margin}>
                        Description
                    </Button>
                    {/* Set the currently selected movie when the Material UI Dialog is open */}
                    {selectedMovie.map((selectedMovie, index) => (
                        <Dialog
                            open={movieDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={closeMovieDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle id="alert-dialog-slide-title">{selectedMovie.MovieName}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <div className="display-movie">
                                    <div className="imgMovieDisplay">
                                        <img 
                                            style={{borderRadius: 50}}
                                            width='300px'
                                            height='480px'
                                            src={selectedMovie.MovieImage}
                                        />
                                    </div>
                                    
                                    {/* Render Movie Details in Material UI Dialog */}
                                    <div id="movie-details">
                                        <div>{selectedMovie.MovieDescription}</div><br></br>
                                        <div><strong>Genre:</strong> {selectedMovie.Genre}</div>
                                        <div><strong>Release Date:</strong> {selectedMovie.ReleaseDate}</div>
                                        <br></br>
                                    </div>
                                </div>
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={() => {closeMovieDialog()}} 
                                    color="primary"
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ))}
    
                    {/* Redirect the user to Movie Page to see more movie details */}
                    <Link className="routelinkreact" to="/Movies">
                        <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.margin}>
                            Book Now
                        </Button>    
                    </Link>
                    </div>
                </div>
               ))}
            </div>
            )}
            <div className = "welcome-message">
                <h2>Welcome to Solar View Cinema</h2>
                <h4>We are the newly established cinema in Brisbane. We are aiming to bring you top quality cinema experiene for your entertainment</h4>  
            </div> 
        </div>
    );
}
  