import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Publish, Delete } from '@material-ui/icons';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';

// React const that sets up style customisation for Material UI components
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    tableRow: {
        whiteSpace: 'normal',
        wordBreak: 'break-word'
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

// React consts set up for Dialog Animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageMovie() {
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

    // React Const Movies set up empty array to store data that is succesfully fetched 
    const [movies, setMovies] = useState([]);

    // Default React Hook Form const for Login FormValidation
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    // React Const for Material UI Date Picker with initial state value of null. 
    const [selectedDate, setSelectedDate] = useState(null);
    // React Const sets on empty and awaits for change in date field. Set a new date on change
    const handleDateChange = (date) => {
        setSelectedDate(date.toISOString());
    };

    // Toggle between Admin Movie Management and Admin Add Movie section
    const [toggleAddMovie, setToggleAddMovie ] = useState(true);

    // React const for selected movie
    const [selectedMovie, setSelectedMovie] = useState([]);

    // React Const for Dialog Movie Update
    const [dialogUpdate, setDialogUpdate] = useState(false);

    // React Functions for Opening and Closing Dialog Movie Update
    function openDialogUpdate(movies) {
        setDialogUpdate(true);
        setSelectedMovie(movies);
        console.log(movies);
    }
    function closeDialogUpdate() {
        setDialogUpdate(false);
        setSelectedMovie([]);
    }

    // React Const for Dialog Movie Delete
    const [dialogDelete, setDialogDelete] = useState(false);

    // React Const movieDelete to store movies data value selected for delete
    const [movieDelete, setMovieDelete] = useState([])

    // React Functions for Opening and Closing Dialog Movie Delete
    function openDialogDelete() {
        setDialogDelete(true);
        setMovieDelete(movies)
    }
    function closeDialogDelete() {
        setMovieDelete([])
        setDialogDelete(false);
    }

    // When the Favourite page/component is loaded, useEffect will use a JavaScript Function to display movies in JSON output only once
    useEffect(() => {
        postDisplayMovies();
    }, []);
// -----------------------------------------------------------Get Movies from Database--------------------------------------------------------------------------------------------- 
    function postDisplayMovies() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindisplaymovies",{
            method: "GET",
            credentials: 'include'
        }).then((res) => {
            // Unsuccessfully displaying movies 
            if (res.status === 204) {
                console.log('no content');
                setMovies([]);
                setMessage("Error: No movie is found");
                setOpenSnackBar(true);
                setSeverity("Error");
                return;
            } 
            // Successfully displaying movies
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setMovies(data);
                    console.log(data);
                });
                return;
            }
        })   
    }
// -----------------------------------------------------------------Add a new movie------------------------------------------------------------------------------------------------
    function postAddMovie() {
        var movie = {
            "MovieName" : document.getElementById("MovieName").value,
            "ReleaseDate" : document.getElementById("ReleaseDate").value,
            "MovieDescription" : document.getElementById("MovieDescription").value,
            "Genre" : document.getElementById("Genre").value,
            "MovieIMG" : document.getElementById("MovieIMG").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminaddmovie", {
            method: "POST",
            body: JSON.stringify(movie),
            credentials: "include"
        })
        .then((response) => {
            // Successfully add a movie
            if(response.status === 202) {
                console.log('success');
                setMessage("A new movie is added");
                setOpenSnackBar(true);
                setSeverity("success");
                postDisplayMovies();
                return;
            }
            // Unsuccessfully add a movie
            if(response.status === 501) {
                console.log('not implemented');
                setMessage("Error: Something went wrong. Try Again.");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
            // When daily request limit exceeded
            if(response.status === 422) {
                console.log('Request limit exceeded within 24 hours');
                setMessage("Error: Request limit exceeded within 24 hours");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
            // When Rate Limit per second exceeded
            if(response.status === 429) {
                console.log('Exceeded Rate Limit');
                setMessage("Warning: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("warning");
                return;
            }
        })
    }
// ----------------------------------------------------------------------Update Movie----------------------------------------------------------------------------------------------
    function postUpdateMovie() {
        var movieUPDT = {
            'MovieNameUpdt' : document.getElementById("MovieNameUpdt").value,
            'ReleaseDateUpdt' : document.getElementById("ReleaseDateUpdt").value,
            'MovieDescriptionUpdt' : document.getElementById("MovieDescriptionUpdt").value,
            'GenreUpdt' : document.getElementById("GenreUpdt").value,
            'MovieIMGUpdt' : document.getElementById("MovieIMGUpdt").value,
            'MovieIDUpdt' : document.getElementById("MovieIDUpdt").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminupdatemovie", {
            method: "POST",
            body: JSON.stringify(movieUPDT),
            credentials: "include"
        })
        .then((response) => {
            // Successfully update the movie
            if(response.status === 202) {
                console.log('success');
                closeDialogUpdate();
                postDisplayMovies();
                setMessage("The movie is updated successfully");
                setOpenSnackBar(true);
                setSeverity("success");
                return;
            }
            // Unsuccessfully update the movie
            if(response.status === 406) {
                console.log('forbidden');
                setMessage("Form is not fully filled");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
            // When daily request limit exceeded
            if(response.status === 422) {
                console.log('Request limit exceeded within 24 hours');
                setMessage("Error: Request limit exceeded within 24 hours");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
            // When Rate Limit per second exceeded
            if(response.status === 429) {
                console.log('Exceeded Rate Limit');
                setMessage("Warning: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("warning");
                return;
            }
        })
    }    
// ------------------------------------------------------------Delete Movie--------------------------------------------------------------------------------------------------------
    function postDeleteMovie(id) {
        var movieID = {
            'movieid' : id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindeletemovie",{
            method: "POST",
            body: JSON.stringify(movieID),
            credentials: 'include'
        })
        .then(function(response){
            console.log(response);
            // Successfully removing Movie 
            if(response.status === 202) {
                console.log('success');
                setOpenSnackBar(true);
                setSeverity("success");
                setMessage("The movie is removed.");
                postDisplayMovies();
                return;
            }
            // Unsuccessfully removing Movie 
            if(response.status === 501) {
                console.log('not implemented');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Unable to remove movie. Please try again");
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
        <div id="moviepage">
            {/* Snack Bar Alert that will display messages when user perform certain actions*/}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
{/* -----------------------------------Show and Hide Buttons for navigating between Movie Management and Add Movie Section--------------------------------------------------------- */}
            {
                toggleAddMovie ?
                    <Button 
                        onClick={() => setToggleAddMovie(!toggleAddMovie)}
                        size="small"
                        variant="contained" 
                        color="secondary"
                        className={classes.margin}>
                        Add a Movie
                    </Button>
                    :
                    <Button 
                        onClick={() => setToggleAddMovie(!toggleAddMovie)}
                        size="small"
                        variant="contained" 
                        color="secondary"
                        className={classes.margin}>
                        Return to Movie Management
                    </Button>
            }
{/* --------------------------------------------------Show and Hide Movie Management and Add Movie Section------------------------------------------------------------------------- */}
            {
                toggleAddMovie ?
                    <div id="movie-manage">
                        <TableContainer component={Paper}>
                            <Table 
                                className={classes.table} 
                                size="medium"
                                aria-label="simple table" 
                            >
                                <TableHead>
                                <TableRow>
                                    <TableCell>MovieID</TableCell>
                                    <TableCell>Movie Name</TableCell>
                                    <TableCell>Release Date</TableCell>
                                    <TableCell>Movie Description</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Movie Image</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {movies.map((movies, index) => (
                                    <TableRow 
                                        key={index}
                                        style={{height: 10}}
                                        tabIndex={-1}
                                    >
                                        <TableCell component="th" scope="row">
                                            {movies.MovieID}
                                        </TableCell>
                                        <TableCell className={classes.tableRow}>{movies.MovieName}</TableCell>
                                        <TableCell className={classes.tableRow}>{movies.ReleaseDate}</TableCell>
                                        <TableCell className={classes.tableRow}>{movies.MovieDescription}</TableCell>
                                        <TableCell className={classes.tableRow}>{movies.Genre}</TableCell>
                                        <TableCell className={classes.tableRow}>{movies.MovieImage}</TableCell>
                                        <TableCell padding="default">
                                            <IconButton
                                                onClick={() => openDialogUpdate([movies])}
                                            >
                                                <Publish />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell padding="default">
                                            <IconButton
                                                onClick={() => {openDialogDelete([movies])}}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>  
                                    </TableRow>
                                ))}    
                                </TableBody>
                            </Table>
                        </TableContainer>   
                            {selectedMovie.map((selectedMovie, index) => (
                                <Dialog
                                    open={dialogUpdate}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={closeDialogUpdate}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                <DialogTitle 
                                    id="alert-dialog-slide-title">
                                        {selectedMovie.MovieName}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                <form id="updatemovieform" autoComplete="off" onSubmit={handleSubmit(postUpdateMovie)}>
                                        <div className="formgroup">
                                            <label for="movienameupdt">Movie Name</label>
                                            {/* Movie Name field requires value in order to proceed with the update movie process */}
                                            <input id="MovieNameUpdt" type="text" placeholder="Movie Name" name="movienameupdt"  
                                                defaultValue={selectedMovie.MovieName}
                                            />
                                        </div>

                                        <div className="formgroup">
                                            <label for="releasedateupdt">Release Date</label>
                                            {/* Release Date field requires value in order to proceed with the update movie process */}
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    animateYearScrolling
                                                    disableFuture
                                                    minDate="1930-01-01"
                                                    name="releasedateupdt"
                                                    margin="normal"
                                                    id="ReleaseDateUpdt"
                                                    initialFocusedDate={selectedMovie.ReleaseDate}
                                                    placeholder="Release Date"
                                                    format="yyyy-MM-dd"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>  

                                        <br/>

                                        <div className="formgroup">
                                            <label for="moviedescriptionupdt">Movie Description</label>
                                            {/* Movie Description field requires value in order to proceed with the update movie process */}
                                            <textarea id="MovieDescriptionUpdt" name="moviedescriptionupdt"  cols="50" rows="10" 
                                                defaultValue={selectedMovie.MovieDescription}
                                            ></textarea>
                                        </div>
                                        <br />

                                        <div className="formgroup">
                                            <label for="genreupdt">Genre</label>
                                            {/* Genre field requires value in order to proceed with the update movie process */}
                                            <input id="GenreUpdt" type="text" placeholder="Genre" name="genreupdt"  
                                                defaultValue={selectedMovie.Genre}
                                            />    
                                        </div>

                                        <div className="formgroup">
                                            <label for="movieimgupdt">Movie Image Reference Link</label>
                                            {/* Movie Image field requires value in order to proceed with the update movie process */}
                                            <input id="MovieIMGUpdt" type="text" placeholder="Movie Image Link" name="movieimgupdt" 
                                                defaultValue={selectedMovie.MovieImage}
                                            />    
                                        </div>

                                        <div className="formgroup">
                                            <label for="movieIDupdt">MovieID</label>
                                            {/* MovieID field has been preset with value and the field is uneditable*/}
                                            <input id="MovieIDUpdt" type="text" name="movieIDupdt" 
                                                value={selectedMovie.MovieID}
                                            />
                                        </div>
                                        
                                        <div id="add-button">
                                        <Button
                                            type="submit"
                                            variant="contained" 
                                            color="primary"
                                            onClick={closeDialogUpdate}
                                            className={classes.margin}>
                                            Update Movie
                                        </Button>  
                                        </div>
                                    </form>
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button 
                                        onClick={() => {closeDialogUpdate()}} 
                                        color="primary"
                                    >
                                        Close
                                    </Button>
                                </DialogActions>
                                </Dialog>
                            ))}
                            
{/* ---------------------------------------------------------Dialog For Admin to confirm deleting selected movie ------------------------------------------------------------------ */}
                            {movieDelete.map((movieDelete, index) => (
                                <Dialog onClose={closeDialogDelete} aria-labelledby="simple-dialog-title" open={dialogDelete}>
                                    <DialogTitle id="simple-dialog-title">Deleting movies</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete this movie ?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={() => {postDeleteMovie(movieDelete.MovieID); closeDialogDelete()}} color="primary">
                                        Yes
                                    </Button>
                                
                                    <Button onClick={closeDialogDelete} color="primary">
                                        No
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            ))}
                    </div>
                    :
                    <div id="add-movie">
{/* ---------------------------------------------------Add Movie Form Section------------------------------------------------------------------------------------------------------ */}
                        <form id="movieform" autoComplete="off" onSubmit={handleSubmit(postAddMovie)}>
                            <div className="formgroup">
                                <label for="moviename">Movie Name</label>
                                {/* Movie Name field requires value in order to proceed with the create movie process */}
                                <input id="MovieName" type="text" placeholder="Movie Name" name="moviename"  defaultValue=""
                                    {...register("MovieName", { required: true })}
                                />
                                {/* Error message when the user did not provide moviename value in the movie name field */}
                                {errors?.MovieName?.type === "required" && <p className="errormssg">Movie Name field is required</p>}
                            </div>

                            <div className="formgroup">
                                <label for="releasedate">Release Date</label>
                                {/* Release Date field requires value in order to proceed with the create movie process */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        animateYearScrolling
                                        disableFuture
                                        minDate="1930-01-01"
                                        name="releasedate"
                                        margin="normal"
                                        id="ReleaseDate"
                                        placeholder="Release Date"
                                        format="yyyy-MM-dd"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>  

                            <br/>

                            <div className="formgroup">
                                <label for="moviedescription">Movie Description</label>
                                {/* Movie Description field requires value in order to proceed with the create movie process */}
                                <textarea id="MovieDescription" name="moviedescription"  cols="50" rows="10" 
                                    {...register("MovieDescription", { required: true })}
                                />
                                {/* Error message when the user did not provide moviedescription value in the movie description field */}
                                {errors?.MovieDescription?.type === "required" && <p className="errormssg">This field is required</p>}
                            </div>
                            <br />

                            <div className="formgroup">
                                <label for="genre">Genre</label>
                                {/* Genre field requires value in order to proceed with the create movie process */}
                                <input id="Genre" type="text" placeholder="Genre" name="genre"  defaultValue=""
                                    {...register("Genre", { required: true })}
                                />    
                                {/* Error message when the user did not provide genre value in the genre field */}
                                {errors?.Genre?.type === "required" && <p className="errormssg">Genre field is required</p>}
                            </div>

                            <div className="formgroup">
                                <label for="movieimg">Movie Image Reference Link</label>
                                {/* Movie Image field requires value in order to proceed with the create movie process */}
                                <input id="MovieIMG" type="text" placeholder="Movie Image Link" name="phone" defaultValue=""
                                    {...register("MovieIMG", { required: true })}
                                />    
                                {/* Error message when the user did not provide MovieImageLink value in the MovieImageLink field */}
                                {errors?.MovieIMG?.type === "required" && 
                                    <p className="errormssg">
                                        Movie Image Reference Link field is required 
                                    </p>
                                }
                            </div>

                            <div id="add-button">
                                <Button
                                    type="submit"
                                    variant="contained" 
                                    color="primary"
                                    className={classes.margin}>
                                    Submit
                                </Button>  
                            </div>    
                        </form>
                    </div>
            }
        </div>
    );
}