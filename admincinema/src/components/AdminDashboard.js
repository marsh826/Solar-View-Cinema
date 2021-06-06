import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// React const that sets up style customisation for Material UI components
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));

export default function Dashboard() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

    // React Router Dom useHistory in a const 
    const history = useHistory();

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
    }

    // React Const Activity Log set up empty array to store data that is succesfully fetched
    const [activityLog, setActivityLog] = useState([]);

    useEffect(() => {
        postDashboardDisplay();
    }, []);
//-----------------------------------------------When Admin is logged in, display activity log in dashboard------------------------------------------------------------------------
    function postDashboardDisplay() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaydashboard", {
            method: "GET",
            credentials: "include"
        }).then((res => {
            // Successfully displaying movies 
            if(res.status === 204) {
                console.log('no content');
                setActivityLog([]);
                setMessage("Error: Unable to fetch activity logs");
                setOpenSnackBar(true);
                setSeverity("Error");
            }
            
            // Unsuccessfully displaying movies
            if(res.status === 201) {
                console.log('created');
                res.json().then((data) => {
                    setActivityLog(data);
                    console.log(data);
                });
                return;
            }

            // When daily request limit exceeded
            if(res.status === 422) {
                console.log('Request limit exceeded within 24 hours');
                setMessage("Error: Request limit exceeded within 24 hours");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }

            // When Rate Limit per second exceeded
            if(res.status === 429) {
                console.log('Exceeded Rate Limit');
                setMessage("Error: Exceeded Rate Limit");
                setOpenSnackBar(true);
                setSeverity("error");
                return;
            }
        }))
    }
// -------------------------------------------------------Admin Log Out------------------------------------------------------------------------------------------------------------
    function postLogOut() {                                                                   
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=logout",{
            method: "POST",
            credentials: 'include'
        })
        .then(function(response) { 
            // Successfully logging user out
            if(response.status === 202) {
                console.log('success');      
                localStorage.setItem('UserStatus', 'Logged Out');
                console.log('Status: Logged Out');
                history.push("/adminlogin");
                return;
            }
        })
        return false;
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return(
        <div id="dashboard">
            {/* Snack Bar Alert that will display messages when user perform certain actions*/}
            <div className={classes.root}>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant="filled" onClose={closeSnackbar} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        
            {/* This button will logout the admin when it is clicked */}
            <Button 
                onClick={postLogOut}
                size="small"
                variant="contained" 
                color="secondary"
                className={classes.margin}>
                Log Out
            </Button>

{/* ------------------------------------------------Admin Dashboard Table for Activity Log----------------------------------------------------------------------------------------- */}
            <TableContainer component={Paper}>
                <Table 
                    className={classes.table} 
                    size="medium"
                    aria-label="simple table" 
                >
                    <TableHead>
                    <TableRow>
                        <TableCell>Activity Log ID</TableCell>
                        <TableCell>UserID</TableCell>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Browser Type</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {activityLog.map((activityLog, index) => (
                        <TableRow key={activityLog.ActivityLogID}>
                            <TableCell component="th" scope="row">
                                {activityLog.ActivityLogID}
                            </TableCell>
                            <TableCell>{activityLog.UserID}</TableCell>
                            <TableCell>{activityLog.IpAddress}</TableCell>
                            <TableCell>{activityLog.Action}</TableCell>
                            <TableCell>{activityLog.DateAndTime}</TableCell>
                            <TableCell>{activityLog.BrowserType}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
} 