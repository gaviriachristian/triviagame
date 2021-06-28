import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const storage = window.localStorage;
const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    }
}));

export default function HeaderTrivia(props) {
    const classes = useStyles();

    function clearStorage() {
        storage.clear();
        window.location = '/'
    };

    return (
        <AppBar position="static" color="default" elevation={0}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    <strong>Player:</strong> {storage.getItem('infoUs.name')}
                </Typography>
                <Button color="primary" variant="outlined" className={classes.link} onClick={clearStorage}>
                    Salir
                </Button>
            </Toolbar>
        </AppBar>
    );
}
