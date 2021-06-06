import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker, TimePicker} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

// React const that sets up style customisation for Material UI components
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

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

    // React Const for Setting Pages
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, movieSession.length - page * rowsPerPage);
    
    

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

    // React Const Movie set up empty array to store data that is successfully fetched
    const [movie, setMovie] = useState([]);

    const [movieSelected, setMovieSelected] = useState('');
    
    // React Const sets on empty and awaits for change in movie field. Set a new movie on change
    const handleMovieChange = (event) => {
        setMovieSelected(event.target.value);
        console.log(movieSelected);
      };

    // Default React Hook Form const for Login FormValidation
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();   

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
            if(response.status === 202) {
                console.log('success');
                return;
            }

            if(response.status === 406) {
                console.log('not accepted');
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
                                        <TableCell>{movieSession.TimeStart}</TableCell>
                                        <TableCell>{movieSession.MovieID}</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    <div id="add-session">
                        <form id="movieform" autoComplete="off" onSubmit={handleSubmit(postAddSession)}>
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
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>  
                            <br/>

                            <div className="formgroup">
                                <label for="sessiontime">Movie Description</label>
                                {/* Session Time field requires value and must in correct data format in order to proceed with the CreateSession process */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        id="SessionTime"
                                        placeholder="Session Time"
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
                                
                                <Select
                                    id="MovieID"
                                    className={classes.selectEmpty}
                                    displayEmpty
                                    value={movieSelected}
                                    onChange={handleMovieChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {movie.map((movie, index) => (
                                        <MenuItem value={movie.MovieID.toString()}>
                                            <em>{movie.MovieName}</em>
                                        </MenuItem>    
                                    ))}
                                </Select>
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