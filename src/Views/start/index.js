import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import HeaderTrivia from '../../Components/HeaderTrivia';
import QuestionsTrivia from '../../Components/QuestionsTrivia';

const useStyles = makeStyles((theme) => ({
    triviaDiv: {
        padding: theme.spacing(8, 0, 6),
        backgroundColor: theme.palette.grey[100],
        borderRadius: 10 + `px`,
        alignContent: `center`
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    buttonStart: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}));

export default function Start() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <HeaderTrivia />

            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6} className={classes.triviaDiv} container spacing={0} direction="column" alignItems="center" justify="center">
                    <Box>
                        <Typography variant="h2" noWrap >
                            Trivia Game
                        </Typography>
                    </Box>
                    <hr />
                    <Box>
                        <QuestionsTrivia />
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
