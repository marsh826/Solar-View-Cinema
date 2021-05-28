import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { EventSeat, Check } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
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

export default function Reservations() {
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
    // React Const Booked Ticket set up empty array to store data that is successfully fetched
    const [ticket, setTicket] = useState([]);

    // React const and functions set up for Dialog
    // const [movieDisplay, setMovieDisplay] = useState(false);
    // function openMovieDisplay(movie) {
    //     setMovieDisplay(true);
    //     setCurrentMovie(movie);
    //     console.log(movie);
    // };
    // function closeMovieDisplay() {
    //     setMovieDisplay(false);
    //     closeSeatDisplay();
    // };

    // React const and functions set up for Dialog when user is updating booked ticket
    const [updateTicket, setUpdateTicket] = useState(false);
    function openDialogUpdate() {
        setUpdateTicket(true);
    };
    function closeDialogUpdate() {
        setUpdateTicket(false);
    };

    // React const and functions set up for Dialog Alert when user is deleting booked ticket
    const [deleteTicket, setDeleteTicket] = useState(false);
    function openDialogDelete() {
        setDeleteTicket(true);
    };
    function closeDialogDelete() {
        setDeleteTicket(false);
    };

    // React Const Movie Session set up empty array to store data that is successfully fetched
    const [movieSession, setMovieSession] = useState([]);
    const [currentMovie, setCurrentMovie] = useState([]);

    // React Const Seat set up empty array to store data that is succesfully fetched 
    const [seat, setSeat] = useState([]);

    // React Const Ticket Type set up empty array to store data that is successfully fetched
    const [ticketType, setTicketType] = useState([]);

    // React Const for Material UI Radio button that is used for Ticket Type Field
    const [radioValue, setRadioValue] = useState([]);
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
        transferTicketID(parseInt(event.target.value));
        console.log(event.target.value);
    };

    useEffect(() => {
        postDisplayTicket();
    },[])

// --------------------------------------Storing Ticket Values into Hidden Input Form for Ticket Update----------------------------------------------------------------------------
    function transferSeatValueUpdt(id) {
        var SeatValueUpdt = document.getElementById("seat-id-update").value;
        SeatValueUpdt = id;
        document.getElementById("seat-id-update").value = SeatValueUpdt;
    }

    function transferTicketID(id) {
        var TicketValueUpdt = document.getElementById("ticket-type-update").value;
        TicketValueUpdt = id;
        document.getElementById("ticket-type-update").value = TicketValueUpdt;
    }
//-------------------------------------------------------Open and Close Seat Display-----------------------------------------------------------------------------------------------
    function closeSeatDisplay() {
        document.getElementById("all-movie-sessions").style.display = "block";
        document.getElementById("seat-display").style.display = "none";
    }
    function openSeatDisplay() {
        document.getElementById("all-movie-sessions").style.display = "none";
        document.getElementById("seat-display").style.display = "block";
    }
// -------------------------------------------------Display The User's List Of Booked Movie Session--------------------------------------------------------------------------------
    function postDisplayTicket() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayticket",{
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            if (res.status === 204) {
                console.log('no content');
                setTicket([]);
                setMessage("Error: You do not have any reservations.");
                setOpenSnackBar(true);
                setSeverity("Error");    
            }
            if (res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setTicket(data);
                    console.log(data);
                })
            }
        })
        return false;
    }
//------------------------------------------------------------Display Movie Sessions------------------------------------------------------------------------------------------------
    function postDisplayAllSessions() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayallsessions",{
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            if (res.status === 204) {
                console.log('no content');
                setMovieSession([]);
                setMessage("Error: Unable to fetch movie sessions.");
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
//---------------------------------------------------------Displaying Ticket Type--------------------------------------------------------------------------------------------------
    function postTicketTypes() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaytickettype",{
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            if (res.status === 204) {
                console.log('no content');
                setMovieSession([]);
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
// ---------------------------------------------------------------Update Booked Ticket---------------------------------------------------------------------------------------------
    function postUpdateTicket() {
        var ticketupdateinfo = {
            'seatinfoUPDT': document.getElementById("seat-id-update").value,
            'ticketid': document.getElementById("ticket-id").value
        }
        fetch('api.php?action=updateticket',{
            method: "POST",
            body: JSON.stringify(ticketupdateinfo),
            credentials: "include"
        })
        .then(function(response) {
            // If the seat booking process was successful
            if(response.status == 202) {
                console.log('success');
                postDisplayTicket();
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
// -------------------------------------------------Delete Selected Ticket From The User's Reservation List------------------------------------------------------------------------
    function postDeleteTicket(id) {
        var IDticket= {
            'ticketid' : id
        }
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=deleteticket",{
            method: 'POST',
            body: JSON.stringify(IDticket),
            credentials: "include"
        }).then(function(response) {
            // Successfully delete booked ticket from user's reservation list
            if(response.status == 202) {
                console.log('success');
                postDisplayTicket();
                return;
            } 
            // Unsuccessfully delete booked ticket from user's reservation list
            if(response.status == 501) {
                console.log('not implemented');
                return;
            }
        })
        return false;
    }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="reservationDisplayPage">
            <div className={classes.root}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            </div>

            <div id="reservation-display">
                <h1>Your Ticket(s)</h1>
                <Grid id="grid2">
                    {ticket.map((ticket, index) => 
                        <div id="ticket-display-container">
                            <FormControl component="fieldset">
                                <div className="ticket-title">
                                    <FormLabel component="legend">
                                        <strong>{ticket.MovieName}</strong>
                                    </FormLabel>
                                </div>

                                <div className="ticket-content">
                                    <div><strong>Date: </strong>{ticket.SessionDate}</div> 
                                    <div><strong>Time: </strong>{ticket.TimeStart}</div>
                                    <div><strong>Ticket Type: </strong>{ticket.Name}</div>
                                    <div><strong>Seat Number: </strong>{ticket.SeatNumber}</div>
                                    <div><strong>Theatre Room: </strong>{ticket.TheatreNumber}</div>    
                                </div>
                            </FormControl>

                            <div className="ticket-display-bttns">
                                <div className="displayticket-bttns">
                                    <Button
                                        type="button"
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}
                                        onClick={() => {openDialogUpdate(); postDisplayAllSessions();}}
                                    >
                                        Update Ticket
                                    </Button>
                                    <Dialog
                                        open={updateTicket}
                                        onClose={closeDialogUpdate}
                                        aria-labelledby="alert-update-dialog-title"
                                        aria-describedby="alert-update-dialog-description"
                                    >
                                        <DialogTitle id="alert-update-dialog-title">{"Changing Ticket"}</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-update-dialog-description">
                                        <div id="all-movie-sessions">
                                            {movieSession.map((movieSession, index) =>
                                                // The View Movie Seats button will be disabled if the user is not logged in
                                                <div id="movie-session-content">
                                                    <div>
                                                        <strong>{movieSession.MovieName}</strong>
                                                    </div>
                                                    <div>{movieSession.SessionDate}</div>
                                                    <div>{movieSession.TimeStart}</div>
                                                    <Button
                                                        endIcon={<EventSeat />}
                                                        onClick={() => {postDisplaySeats(movieSession.MovieSessionID); postTicketTypes();}}
                                                        variant="contained" 
                                                        color="primary"
                                                        className={classes.margin}>
                                                        View Seats
                                                    </Button>
                                                </div>
                                            )}    
                                        </div>
                                        

                                    <div id="seat-display" style={{display: "none"}}>
                                    <h3>Available Seats</h3>
                                        <div id="seat-items-container">
                                        {/* Rendering a list of data from seat const in Material UI Dialog */}
                                            {seat.map((seat, index) =>
                                                <div className={classes.iconButton}>
                                                    <div id="seats">
                                                        <IconButton
                                                            disabled={seat.ReservationStatus}
                                                            classes={{label: classes.iconButtonLabel}}
                                                            onClick={() => {transferSeatValueUpdt(seat.SeatBySessionID);}}>
                                                            <EventSeat />
                                                            <div>{seat.SeatNumber}</div>
                                                        </IconButton>
                                                    </div>                                           
                                                </div>                                     
                                            )} 
                                        </div>
                                        
                                        {/* Seat Colour Indicator */}
                                        <div className="colour-indicator">
                                            <h4>Colour Indicator</h4>
                                            <p>Grey: Available</p>
                                            <p style={{color: "green" }}>Green: Selected</p>
                                            <p style={{color: "red" }}>Red: Booked</p>
                                        </div>

                                    <Divider />

                                    <h4>Ticket Types</h4>
                                    {/* Rendering a list of data from ticketType const in Material UI Dialog */}
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
                                                control={
                                                    <Radio
                                                    value={ticketType.TicketTypeID.toString()} 
                                                />} 
                                                label={ticketType.Name}
                                            />
                                            <div>${ticketType.Price}</div>     
                                            </div>   
                                        )} 
                                        <p>If you are paying for the 'Student' price, you are required to present your Student ID before entering the cinema room.</p>   
                                    </RadioGroup>
                                    </FormControl>
                                            
                                     {/* Hidden Form that allow seatID and ticketTypeID to be filled and prepare for reservation */}
                                    <form id="seat-booking">
                                        <input id="seat-id-update" value="" readOnly />
                                        <input id="ticket-type-update" value={radioValue} readOnly />    
                                    </form>
                                    <Button
                                        endIcon={<Check />}
                                        type="button"
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}
                                        onClick={() => { postUpdateTicket(); closeDialogUpdate();}}
                                    >
                                        Reserve
                                    </Button>
                                </div> 
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={closeDialogUpdate} color="primary">
                                            Cancel
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>

                                <div className="displayticket-bttns">
                                    <Button
                                        type="button"
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}
                                        onClick={() => openDialogDelete()}
                                    >
                                        Delete Ticket
                                    </Button>
                                    <Dialog
                                        open={deleteTicket}
                                        onClose={closeDialogDelete}
                                        aria-labelledby="alert-delete-dialog-title"
                                        aria-describedby="alert-delete-dialog-description"
                                    >
                                        <DialogTitle id="alert-delete-dialog-title">{"Cancelling Your Booked Ticket"}</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-delete-dialog-description">
                                            Are you sure you want to cancell this ticket?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={() => {postDeleteTicket(ticket.TicketID); closeDialogDelete();}} color="primary">
                                            Yes
                                        </Button>
                                        <Button onClick={closeDialogDelete} color="primary">
                                            No
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
            </div>
        </div>
    )
}