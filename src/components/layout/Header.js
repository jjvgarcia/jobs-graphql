import React from 'react';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar variant="dense">
                <WorkOutlineIcon/>
                <Typography variant="h6" color="inherit">
                    &nbsp; Jobs &nbsp;&nbsp;&nbsp;
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
