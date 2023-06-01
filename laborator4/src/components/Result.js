import React from 'react';

class Result extends React.Component {
  render() {
    const { score, resetQuiz } = this.props;

    return (  
      <div>
        <h2>Quiz Ended</h2>
        <p>Your score: {score}</p>
        <button onClick={resetQuiz}>Play Again</button>
      </div>
    );
  }
}

export default Result;
