import React from 'react';
// import { makeStyles } from '@material-ui/styles';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';

const storage = window.localStorage;

class QuestionsTrivia extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.occupied = false;
    }

    componentDidMount(prevProps) {
        var numberQ = storage.getItem('infoUs.numquest');
        var dificulty = storage.getItem('infoUs.dificulty');
        fetch(`https://opentdb.com/api.php?amount=${numberQ}&difficulty=${dificulty}&encode=url3986`)
            .then(res => res.json())
            .then(json => this.setState({ data: json }))
            .catch(function (error) {
                console.log(error);
            });
    }

    setOccupied = (occupied) => {
        this.occupied = occupied;
    }

    setHelperText = (id, val) => {
        document.getElementById(id + 'Helper').innerHTML = val;
    }

    setHaveError = (index, error) => {
        var elem = document.getElementById(parseInt(index) + 'legend');
        var existErrorClass = elem.classList.contains('Mui-error');
        if (error && !existErrorClass) {
            elem.classList.add('Mui-error');
        } else if (!error && existErrorClass) {
            elem.classList.remove('Mui-error');
        }
    }

    prepareToNextQuestion = (index, correct) => {
        var questArr = this.state.data.results;
        var questActive = questArr[index];

        if (correct) {
            var contResults = 0;
            if (storage.getItem('correctAnswers') !== undefined && storage.getItem('correctAnswers') !== null) {
                console.log(storage.getItem('correctAnswers'));
                contResults = parseInt(storage.getItem('correctAnswers'));

            }

            contResults++;
            storage.setItem('correctAnswers', contResults);
        }

        setTimeout(() => {
            var indexCont = (index + 1);
            if (questArr.length > indexCont) {
                document.getElementById(index + 'form').remove();
                document.getElementById(indexCont + 'form').style.display = 'block';;
            } else {
                document.location.href = '/result';
            }

        }, 1000);
    }

    handleRadioChange = (event, index) => {
        var answerObj = this.state.data.results[index];

        if (this.occupied) {
            return false;
        }

        this.setOccupied(true);

        if (event.target.value === decodeURIComponent(answerObj.correct_answer)) {
            this.setHelperText(index, 'Perfect! Next question.');
            this.setHaveError(index, false);
            this.prepareToNextQuestion(index, true);
        } else if (event.target.value === '') {
            this.setHelperText(index, 'Please select an option!');
            this.setHaveError(index, true);
        } else {
            this.setHelperText(index, 'Ops, you were wrong!');
            this.setHaveError(index, true);
            this.prepareToNextQuestion(index, false);
        }

        this.setOccupied(false);
    };

    suffleAnswers = (error, correct) => {
        error.push(correct);
        return error.sort();
    }

    render() {
        return (
            (this.state.data.results !== undefined && this.state.data.results.length > 0) ? (this.state.data.results.map((question, index) =>
                <form key={index} id={index + 'form'} style={{ display: (index > 0 ? 'none' : '') }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" id={index + "legend"} >{(index + 1) + '. ' + decodeURIComponent(question.question)}</FormLabel>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={(evt) => { this.handleRadioChange(evt, index) }}>
                            {(this.suffleAnswers(question.incorrect_answers, question.correct_answer)).map((answer, index_answer) =>
                                <FormControlLabel value={decodeURIComponent(answer)} control={<Radio />} label={decodeURIComponent(answer)} key={index_answer} />
                            )}
                        </RadioGroup>
                        <FormHelperText id={index + "Helper"}></FormHelperText>
                    </FormControl>
                </form>
            )) : (<div>Loading...</div>)
        );
    }
}

export default QuestionsTrivia;
