import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, Movie, AccessTime } from '@material-ui/icons';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
  drawer: {
    width: '190px'
  }
})

function AdminDrawer(props) {
    const { history } = props;
    const classes = useStyles();
    const itemList = [
        {
            text: "Dashboard",
            icon: <Dashboard />,
            onclick: () => history.push('AdminDashboard')
        }, {
            text: "Manage Movies",
            icon: <Movie />,
            onclick: () => history.push('AdminMovieManage')
        }, {
            text:"Manage Movie Sessions",
            icon: <AccessTime />,
            onclick: () => history.push('AdminSessionManage')
        }
    ];
    return(
        <Drawer variant="permanent" className={classes.drawer}>
            <List>
                {itemList.map((item, index) => {
                    const { text, icon } = item;
                    return (
                        <ListItem button key={text}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default withRouter(AdminDrawer);