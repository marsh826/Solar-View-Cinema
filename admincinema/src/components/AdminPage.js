import React from 'react';
import {Tabs, Tab, AppBar } from '@material-ui/core';
import AdminMovieManage from './AdminMovieManage';
import AdminSessionManage from './AdminSessionManage';
import AdminDashboard from './AdminDashboard';

// This component serves as the base for the app bar for Admin to navigate between pages by clicking the tab menu items
export default function AdminPage(props) {

    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    // React Const for matching tab menu items with index keys
    const indexToTabName = {
        "dashboard": 0,
        "movies": 1,
        "moviesessions": 2
    }
    const tabNameToIndex = {
        0: "dashboard",
        1: "movies",
        2: "moviesessions"
    }

    // React Const for selected tab value to be stored in state
    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleTabChange = (event, newValue) => {
        // Push admin to specific part of the page based on tab menu item selected
        history.push(`/admin/${tabNameToIndex[newValue]}`)
        setSelectedTab(newValue);
    };

    return(
        <div id="adminpage">
            {/* Material UI App Bar with Tab menus */}
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="DashBoard" />
                    <Tab label="Movies" />
                    <Tab label="Movie Sessions" />
                </Tabs>
            </AppBar>
            {/* List of Tab Menu Items set in App Bar */}
            { selectedTab === 0 && <AdminDashboard />}
            { selectedTab === 1 && <AdminMovieManage />}
            { selectedTab === 2 && <AdminSessionManage />}
        </div>
    );
}  