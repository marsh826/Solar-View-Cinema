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
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

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

    // React Const Activity Log set up empty array to store data that is succesfully fetched
    const [activityLog, setActivityLog] = useState([]);

    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, activityLog.length - page * rowsPerPage);

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
                // setMessage("Error: No movie is found");
                // setOpenSnackBar(true);
                // setSeverity("Error");
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
                // setMessage("Error: Request limit exceeded within 24 hours");
                // setOpenSnackBar(true);
                // setSeverity("error");
                return;
            }

            // When Rate Limit per second exceeded
            if(res.status === 429) {
                console.log('Exceeded Rate Limit');
                // setMessage("Error: Exceeded Rate Limit");
                // setOpenSnackBar(true);
                // setSeverity("error");
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
            <Button 
                onClick={postLogOut}
                size="small"
                variant="contained" 
                color="secondary"
                className={classes.margin}>
                Log Out
            </Button>

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
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={activityLog.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />             */}
        </div>
    );
} 