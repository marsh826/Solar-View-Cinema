import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
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

    // React consts set up for Dialog
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
        var TicketIDValue = document.getElementById("ticket-id").value;
        TicketIDValue = id;
        document.getElementById("ticket-id").value = TicketIDValue;
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
                                        // onClick={() => { postSeatBooking(); closeMovieDisplay();}}
                                    >
                                        Update Ticket
                                    </Button>
                                </div>

                                <div className="displayticket-bttns">
                                    <Button
                                        type="button"
                                        variant="contained" 
                                        color="primary"
                                        className={classes.margin}
                                        // onClick={() => { postSeatBooking(); closeMovieDisplay();}}
                                    >
                                        Delete Ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
            </div>
        </div>
    )
}