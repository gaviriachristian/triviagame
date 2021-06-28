import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, FormControl, Select, InputLabel, FormHelperText, TextField } from '@material-ui/core';

const storage = window.localStorage;
      storage.clear();

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
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));

var name = '';
var dificulty = '';
var numquest = '';

async function catchName() {
    name = document.getElementById('username').value;
}

async function catchDificulty() {
    dificulty = document.getElementById('dificulty').value;
}

async function catchNumQuestions() {
    numquest = document.getElementById('number_question').value;
}

async function validateAndNext(evt) {
    evt.preventDefault();

    await catchName();
    await catchDificulty();
    await catchNumQuestions();

    storage.setItem('infoUs.name', name);
    storage.setItem('infoUs.dificulty', dificulty);
    storage.setItem('infoUs.numquest', numquest);

    window.location.href = '/start'
}

export default function Start() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6} className={classes.triviaDiv} container spacing={0} direction="column" alignItems="center" justify="center">
                    <Box>
                        <Typography variant="h2" noWrap >
                            Trivia Game
                        </Typography>
                    </Box>
                    <form className={classes.root} autoComplete="off" onSubmit={(evt) => { validateAndNext(evt) }}>
                        <Box>
                            <FormControl variant="filled" className={classes.formControl}>
                                <TextField defaultValue={'Player One'} placeholder="Your Name" id="username" label="Your name" variant="outlined" required onChange={(evt) => { catchName() }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Dificulty</InputLabel>
                                <Select native name={'dificulty'} id={'dificulty'} defaultValue={'easy'} required onChange={(evt) => { catchDificulty() }}>
                                    <option aria-label="Select one" value="" />
                                    <option value={'easy'}>Easy</option>
                                    <option value={'medium'}>Medium</option>
                                    <option value={'hard'}>Hard</option>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="filled-age-native-simple">Number of questions</InputLabel>
                                <Select native name={'number_question'} id={'number_question'} defaultValue={10} required onChange={(evt) => { catchNumQuestions() }}>
                                    <option value={5}>5 questions</option>
                                    <option value={10}>10 questions</option>
                                    <option value={20}>20 questions</option>
                                    <option value={100}>100 questions</option>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box alignItems={'center'}>
                            <Button className={classes.buttonStart} type={'submit'}>
                                Start
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>

            <Grid />
        </React.Fragment>
    );
}
