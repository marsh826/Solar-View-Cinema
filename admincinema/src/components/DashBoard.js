import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

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
    iconButton:{
        '& > *': {
            margin: theme.spacing(1),
          }
    },
    iconButtonLabel: {
        display: "flex",
        flexDirection: "column",
        fontSize: 15
    },
    grid: {
        flexGrow: 1
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loadingcontent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
}));

export default function Dashboard() {
    // A React const that is assigned with Material UI Component Style Const
    const classes = useStyles();

    // React Router Dom useHistory in a const 
    const history = useHistory();

    // React Const Activity Log set up empty array to store data that is succesfully fetched
    const [activiylog, setActivityLog] = useState([]);

    // Const columns for Material UI DataGrid table for table headers
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },    
    ]
    

    function postDashboardDisplay() {
        fetch("http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=logout", {
            method: "POST",
            credentials: "include"
        }).then((response => {
            // Successfully displaying movies 
            if (response.status === 204) {
                console.log('no content');
                setActivityLog([]);
                // setMessage("Error: No movie is found");
                // setOpenSnackBar(true);
                // setSeverity("Error");
            }
            
            // Unsuccessfully displaying movies
            if (response.status === 201) {
                console.log('created');
                response.json().then((data) => {
                    setActivityLog(data);
                    console.log(data);
                })
            }

            // When daily request limit exceeded
            if (response.status === 422) {
                console.log('Request limit exceeded within 24 hours');
                // setMessage("Error: Request limit exceeded within 24 hours");
                // setOpenSnackBar(true);
                // setSeverity("error");
            }

            // When Rate Limit per second exceeded
            if (response.status === 429) {
                console.log('Exceeded Rate Limit');
                // setMessage("Error: Exceeded Rate Limit");
                // setOpenSnackBar(true);
                // setSeverity("error");
            }
        }))
    }

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
            This is dashboard
            <Button 
                onClick={postLogOut}
                size="small"
                variant="contained" 
                color="secondary"
                className={classes.margin}>
                Log Out
            </Button>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={activiylog} columns={columns} pageSize={5} checkboxSelection />
            </div>

        </div>
    );
} 