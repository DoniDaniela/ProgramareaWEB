import React from 'react';
import axios from 'axios';

class QuizList extends React.Component {
  state = {
    quizzes: [],
  };

  componentDidMount() {

  const config = {
      headers: { "X-Access-Token": "984cda8f31e533fa2f5cc91846e60e6cac8f8f00bf981e15139551b11160f4b8" }
  };

    axios.get('https://late-glitter-4431.fly.dev/api/v54/quizzes', config)
      .then(response => {
        this.setState({ quizzes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { quizzes } = this.state;
    const { startQuiz } = this.props;

    return (
      <div>
        <h2>Available Quizzes</h2>
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz.id}>
              {quiz.title}{' '}
              <button onClick={() => startQuiz(quiz.id)}>Start</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default QuizList;
