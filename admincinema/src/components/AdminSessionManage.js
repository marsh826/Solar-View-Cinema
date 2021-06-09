import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker, TimePicker} from '@material-ui/pickers';
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
    selectEmpty: {
        marginTop: theme.spacing(2),
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

export default function MovieSession() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

    // Toggle between Movie Session Management and Add Movie Section Management
    const [toggleAddSession, setToggleAddSession ] = useState(true);

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

    // React Const Movie Session set up empty array to store data that is successfully fetched
    const [movieSession, setMovieSession] = useState([]);

    // React Const for selected movie session
    const [selectedSession, setSelectedSession] = useState([]);

    // React Const for Material UI Date Picker with initial state value of null. 
    const [selectedDate, setSelectedDate] = useState(null);

    // React Const sets on empty and awaits for change in date field. Set a new date on change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // React Const for Material UI Time Picker with initial state value of null. 
    const [selectedTime, setSelectedTime] = useState(null);

    // React Const sets on empty and awaits for change in date field. Set a new time on change
    const handleTimeChange = (date) => {
        setSelectedTime(date);
    };

    // React Const Movie set up empty array to store data that is successfully fetched that will be used in Session Create or Update
    const [movie, setMovie] = useState([]);

    // React Const selectedSession2 set up empty array to store data that is successfully fetched that will be used in Session Delete
    const [selectedSession2, setSelectedSession2] = useState([]);

    // React Const for Dialog Movie Update
    const [dialogUpdate, setDialogUpdate] = useState(false);

    // React Functions for Opening and Closing Dialog Movie Delete
    function openDialogUpdate(movieSession) {
        setDialogUpdate(true);
        setSelectedSession(movieSession);
        console.log(movieSession);
    }
    function closeDialogUpdate() {
        setDialogUpdate(false);
        setSelectedSession([]);
        setSelectedTime(null);
    }

    // React Const for Dialog Movie Delete
    const [dialogDelete, setDialogDelete] = useState(false);

    // React Functions for Opening and Closing Dialog Movie Delete
    function openDialogDelete(movieSession) {
        setSelectedSession2(movieSession);
        setDialogDelete(true);
        console.log(movieSession);
    }
    function closeDialogDelete() {
        setSelectedSession2([]);
        setDialogDelete(false);
    }

    // Default React Hook Form const for Login FormValidation
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();   

    // When the Favourite page/component is loaded, useEffect will use a JavaScript Function 
    // to display Movie Sessions in JSON output only once
    useEffect(() => {
        postPresetMovieData();
        postAdminDisplaySession();
    }, [])
// -------------------------------------------------------Preset Movie Data--------------------------------------------------------------------------------------------------------
    function postPresetMovieData() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminpresetmoviedata", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            // Successfully fetched movies
            if(response.status === 201) {
                console.log('success');
                response.json().then((data) => {
                    setMovie(data);
                    console.log(data);
                });
                return;
            }
            // Unsuccessfully fetched movies
            if(response.status === 204) {
                console.log('not accepted');
                setMovie([]);
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
// -----------------------------------------------Display Movie Sessions in Admin Movie Session Management Section-----------------------------------------------------------------
    function postAdminDisplaySession() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindisplaysession",{
            method: "GET",
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
// ------------------------------------------------------Add A Movie Session-------------------------------------------------------------------------------------------------------
    function postAddSession() {
        var session = {
            "SessionDate" : document.getElementById("SessionDate").value,
            "SessionTime" : document.getElementById("SessionTime").value,
            "MovieID" : document.getElementById("MovieID").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminaddsession", {
            method: "POST",
            body: JSON.stringify(session),
            credentials: "include"
        })
        .then((response) => {
            // Successfully added a movie session
            if(response.status === 202) {
                console.log('success');
                setMessage("New movie session is added");
                setOpenSnackBar(true);
                setSeverity("success");
                postAdminDisplaySession();
                return;
            }
            // Unsuccessfully added a movie session
            if(response.status === 406) {
                console.log('not accepted');
                setMessage("");
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
// ------------------------------------------------------------Delete Movie Session------------------------------------------------------------------------------------------------
    function postDeleteSession(id) {
        var moviesessionID = {
            'moviesessionid' : id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindeletesession",{
            method: "POST",
            body: JSON.stringify(moviesessionID),
            credentials: 'include'
        })
        .then(function(response){
            console.log(response);
            // Successfully removing Movie 
            if(response.status === 202) {
                console.log('success');
                setOpenSnackBar(true);
                setSeverity("success");
                setMessage("The movie session is removed.");
                postAdminDisplaySession();
                return;
            }
            // Unsuccessfully removing Movie 
            if(response.status === 406) {
                console.log('forbidden');
                setOpenSnackBar(true);
                setSeverity("error");
                setMessage("Error: Unable to remove movie session. Please try again");
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
// ------------------------------------------------------Update Movie Session------------------------------------------------------------------------------------------------------
    function postUpdateSession() {
        var session = {
            "SessionDateUpdt" : document.getElementById("SessionDateUpdt").value,
            "SessionTimeUpdt" : document.getElementById("SessionTimeUpdt").value,
            "MovieIDUpdt" : document.getElementById("MovieIDUpdt").value,
            "MovieSessionIDUpdt" : document.getElementById("MovieSessionIDUpdt").value
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminupdatesession", {
            method: "POST",
            body: JSON.stringify(session),
            credentials: "include"
        })
        .then((response) => {
            // Successfully added a movie session
            if(response.status === 202) {
                console.log('success');
                setMessage("Movie session has been successfully removed");
                setOpenSnackBar(true);
                setSeverity("success");
                postAdminDisplaySession();
                return;
            }
            // Unsuccessfully added a movie session
            if(response.status === 406) {
                console.log('not accepted');
                setMessage("Error: Unable to remove movie session. Try again");
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
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="moviesession">
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
            {
                toggleAddSession ?
                    <Button 
                        onClick={() => setToggleAddSession(!toggleAddSession)}
                        size="small"
                        variant="contained" 
                        color="secondary"
                        className={classes.margin}>
                        Add a Movie Session
                    </Button>
                    :
                    <Button 
                        onClick={() => setToggleAddSession(!toggleAddSession)}
                        size="small"
                        variant="contained" 
                        color="secondary"
                        className={classes.margin}>
                        Return to Movie Session Management
                    </Button>
            }

            {
                toggleAddSession ?
                    <div id="session-manage">
                        <TableContainer component={Paper}>
                            <Table 
                                className={classes.table} 
                                size="medium"
                                aria-label="simple table" 
                            >
                                <TableHead>
                                <TableRow>
                                    <TableCell>MovieSessionID</TableCell>
                                    <TableCell>Session Date</TableCell>
                                    <TableCell>Time Start</TableCell>
                                    <TableCell>Movie ID</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {movieSession.map((movieSession, index) => (
                                    <TableRow key={movieSession.MovieSessionID}>
                                        <TableCell component="th" scope="row">
                                            {movieSession.MovieSessionID}
                                        </TableCell>
                                        <TableCell>{movieSession.SessionDate}</TableCell>
                                        <TableCell>{movieSession.TimeStart}</TableCell>
                                        <TableCell>{movieSession.MovieID}</TableCell>
                                        <TableCell padding="default">
                                            <IconButton
                                                onClick={() => openDialogUpdate([movieSession])}
                                            >
                                                <Publish />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell padding="default">
                                            <IconButton
                                                onClick={() => {openDialogDelete([movieSession])}}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {selectedSession.map((selectedSession, index) => (
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
                                    Update Movie Session
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Currently Selected Movie: {selectedSession.MovieName}
                            <form id="moviesesisonform" autoComplete="off" onSubmit={handleSubmit(postUpdateSession)}>
                                <div className="formgroup">
                                    <label for="sessiondateUpdt">Session Date</label>
                                    {/* Session Date field requires value and must in correct data format in order to proceed with the UpdateSession process */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            animateYearScrolling
                                            disableFuture
                                            minDate="1930-01-01"
                                            name="sessiondateUpdt"
                                            margin="normal"
                                            id="SessionDateUpdt"
                                            placeholder="Session Date"
                                            format="yyyy-MM-dd"
                                            value={selectedDate}
                                            initialFocusedDate={selectedSession.SessionDate}
                                            onChange={handleDateChange}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>  
                                <br/>

                                <div className="formgroup">
                                    <label for="sessiontimeUpdt">Time Start</label>
                                    {/* Time field requires value and must in correct data format in order to proceed with the UpdateSession process */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <TimePicker
                                            id="SessionTimeUpdt"
                                            placeholder="Time Start"
                                            name="sessiontimeUpdt"
                                            format="HH:mm"
                                            ampm={false}
                                            value={selectedTime}
                                            initialFocusedDate={selectedSession.TimeStart}
                                            onChange={handleTimeChange}
                                        />    
                                    </MuiPickersUtilsProvider>
                                </div>
                                <br/>

                                <div className="formgroup">
                                    <label for="movieupdt">Movie</label>
                                    <select id="MovieIDUpdt" name="movieupdt">
                                    {movie.map((movie, index) => (
                                        <option value={movie.MovieID}>{movie.MovieName}</option>
                                    ))}
                                    </select>  

                                </div>

                                                            
                                <div className="formgroup">
                                    <label for="moviesessionidupdt">MovieSessionID</label>
                                    <input id="MovieSessionIDUpdt" type="text" name="moviesessionidupdt" value={selectedSession.MovieSessionID}/>
                                </div>

                                <div id="add-button">
                                    <Button
                                        type="submit"
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}>
                                        Update Movie Session
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

                        {selectedSession2.map((selectedSession2, index)=> (
                            <Dialog onClose={closeDialogDelete} aria-labelledby="simple-dialog-title" open={dialogDelete}>
                                <DialogTitle id="simple-dialog-title">Deleting movie session</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this movie session ?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button 
                                    onClick={() => {postDeleteSession(selectedSession2.MovieSessionID); closeDialogDelete()}} 
                                    color="primary">
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
                    <div id="add-session">
                        <form id="moviesesisonform" autoComplete="off" onSubmit={handleSubmit(postAddSession)}>
                            <div className="formgroup">
                                <label for="sessiondate">Session Date</label>
                                {/* Session Date field requires value and must in correct data format in order to proceed with the CreateSession process */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        animateYearScrolling
                                        disableFuture
                                        minDate="1930-01-01"
                                        name="sessiondate"
                                        margin="normal"
                                        id="SessionDate"
                                        placeholder="Session Date"
                                        format="yyyy-MM-dd"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>  
                            <br/>

                            <div className="formgroup">
                                <label for="sessiontime">Time Start</label>
                                {/* Time Start field requires value and must in correct data format in order to proceed with the CreateSession process */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        id="SessionTime"
                                        placeholder="Time Start"
                                        name="sessiontime"
                                        format="HH:mm"
                                        ampm={false}
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                    />    
                                </MuiPickersUtilsProvider>
                            </div>
                            <br/>

                            <div className="formgroup">
                                <label for="movie">Movie</label>
                                <select id="MovieID" name="movie">
                                {movie.map((movie, index) => (
                                    <option value={movie.MovieID}>{movie.MovieName}</option>
                                ))}
                                </select>  
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