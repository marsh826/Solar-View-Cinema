import React from 'react';
import {Tabs, Tab, AppBar } from '@material-ui/core';
import Movies from './Movies';
import MovieSessions from './MovieSession';
import DashBoard from './DashBoard';

export default function AdminPage(props) {

    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const indexToTabName = {
        0: "dashboard",
        1: "movies",
        2: "moviesessions"
    }

    const tabNameToIndex = {
        0: "dashboard",
        1: "movies",
        2: "moviesessions"
    }

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleTabChange = (event, newValue) => {
        history.push(`/admin/${tabNameToIndex[newValue]}`)
        setSelectedTab(newValue);
    };

    return(
        <div id="adminpage">
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="DashBoard" />
                    <Tab label="Movies" />
                    <Tab label="Movie Sessions" />
                </Tabs>
            </AppBar>
            { selectedTab === 0 && <DashBoard />}
            { selectedTab === 1 && <Movies />}
            { selectedTab === 2 && <MovieSessions />}
        </div>
    );
}  