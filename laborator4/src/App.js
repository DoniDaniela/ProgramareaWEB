import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false); // New state variable

  const fetchQuizzes = () => {
    axios
      .get('https://late-glitter-4431.fly.dev/api/v54/quizzes')
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleQuizClick = quizId => {
    setQuizStarted(true); // Reset quizStarted state when a new quiz is selected
    setCurrentQuizId(quizId);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quiz App ({window.userid})</h1>
      {quizStarted && currentQuizId? (
        <Quiz quizId={currentQuizId} />
      ) : (
        <QuizList quizzes={quizzes} startQuiz={handleQuizClick} />
      )}
      
    </div>
  );
}

export default App;
