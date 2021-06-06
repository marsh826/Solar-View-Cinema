import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { DataGrid } from '@material-ui/data-grid';

// React const that sets up style customisation for Material UI components
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

const columns = [
    { field: 'MovieID', headerName: 'MovieID', width: 135 },
    { field: 'MovieName', headerName: 'Movie Name', width: 190 },
    { field: 'ReleaseDate', headerName: 'Release Date', width: 190 },
    { field: 'MovieDescription', headerName: 'Movie Description', width: 190 },
    { field: 'Genre', headerName: 'Genre', width: 170 },
    { field: 'MovieImage', headerName: 'Movie Image Link', width: 190 }
];

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

            if(response.status === 202) {
                console.log('success');
                return;
            }

            if(response.status === 501) {
                console.log('not implemented');
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
                        Display Some Movies
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid 
                                rows={movies}
                                columns={columns}
                                pageSize={10}
                            />
                        </div>
                    </div>
                    :
                    <div id="add-movie">
                        {/* Add Movie Form Section */}
                        <form id="movieform" autoComplete="off" onSubmit={handleSubmit(postAddMovie)}>
                            <div className="formgroup">
                                <label for="moviename">Movie Name</label>
                                {/* Movie Name field requires value in order to proceed with the register process */}
                                <input id="MovieName" type="text" placeholder="Movie Name" name="moviename"  defaultValue=""
                                    {...register("MovieName", { required: true })}
                                />
                                {/* Error message when the user did not provide username value in the movie name field */}
                                {errors?.MovieName?.type === "required" && <p className="errormssg">Movie Name field is required</p>}
                            </div>

                            <div className="formgroup">
                                <label for="releasedate">Release Date</label>
                                {/* Date of Birth field requires value and must in correct data format in order to proceed with the register process */}
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
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>  

                            <br/>

                            <div className="formgroup">
                                <label for="moviedescription">Movie Description</label>
                                {/* Username field requires value in order to proceed with the register process */}
                                <textarea id="MovieDescription" name="moviedescription"  cols="50" rows="10" 
                                    {...register("MovieDescription", { required: true })}
                                />
                                {/* Error message when the user did not provide username value in the unsername field */}
                                {errors?.MovieDescription?.type === "required" && <p className="errormssg">This field is required</p>}
                            </div>
                            <br />

                            <div className="formgroup">
                                <label for="genre">Genre</label>
                                {/* Genre field requires value and must be in correct data format in order to proceed with the register process */}
                                <input id="Genre" type="text" placeholder="Genre" name="genre"  defaultValue=""
                                    {...register("Genre", { required: true })}
                                />    
                                {/* Error message when the user did not provide password value in the password field */}
                                {errors?.Genre?.type === "required" && <p className="errormssg">Genre field is required</p>}
                            </div>

                            <div className="formgroup">
                                <label for="movieimg">Movie Image Reference Link</label>
                                {/* Mobile Phone field requires value and must be in correct data format in order to proceed with the register process */}
                                <input id="MovieIMG" type="url" placeholder="Movie Image Link" name="phone" defaultValue=""
                                    {...register("MovieIMG", { required: true, maxLength: 10 })}
                                />    
                                {/* Error message when the user did not provide password value in the password field */}
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