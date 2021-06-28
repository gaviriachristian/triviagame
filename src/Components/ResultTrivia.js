import React from 'react';

const storage = window.localStorage;
class ResultTrivia extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }


  render() {
    let correctAnswers = storage.getItem('correctAnswers');
    let totalQuestions = storage.getItem('infoUs.numquest');
    let name = storage.getItem('infoUs.name');
    let result = ((correctAnswers / totalQuestions) > 0.6) ? 'WINNER' : 'LOSER';
    return (
      <div align="center">
        <h1>{name}</h1>
        <h3>Correct answers : {correctAnswers} / {totalQuestions} </h3>
        <p>{result}</p>
        <h3>GAME OVER</h3>
      </div>
    );

  }
}

export default ResultTrivia;
