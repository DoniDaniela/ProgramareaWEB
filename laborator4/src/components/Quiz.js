import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quiz({quizId}) {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);

  const config = {
    headers: { "X-Access-Token": "984cda8f31e533fa2f5cc91846e60e6cac8f8f00bf981e15139551b11160f4b8" }
  };

  useEffect(() => {
    axios.get(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${quizId}`, config)
      .then(response => {
        setQuiz(response.data)
      })
      .catch(error => {
        console.log(error);
      });
 }, []);


  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
   
    if (selectedAnswer < quiz.questions[currentQuestion].answers.length - 1)
    {
      axios.post(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${quizId}/submit`, {
      data: {
          question_id: quiz.questions[currentQuestion].id,
          answer: quiz.questions[currentQuestion].answers[selectedAnswer],
          user_id: window.userid
      }
      }, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    setSelectedAnswer(null);
    if (currentQuestion < quiz.questions.length - 1)
    {
      setCurrentQuestion(currentQuestion + 1);
    } else  
    {
      axios.get(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${quizId}?user_id=${window.userid}`, config)
      .then(response => {
        let correct = 0; 
        for (let i = 0; i < response.data.questions.length; i++)
        {
            if (response.data.questions[i].answered_correctly)
            correct++;
        } 
        setResult({correct: correct});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }


    return (
      <div>
        {quiz && <h2>{quiz.title}</h2>}
        <div>
          <h3>Question {currentQuestion + 1}</h3>
          {!quiz && <div>Loading quiz...</div>}
          {quiz && !result &&
            <div>
              <p>{quiz.questions[currentQuestion].question}</p>
              <ul>
                {quiz.questions[currentQuestion].answers.map((answer, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => handleAnswerSelect(index)}
                      />
                      {answer}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={handleSubmit} disabled={selectedAnswer === null}>
                Submit
              </button>
            </div>
            }
          {quiz && result &&
            <div>
              <p>Correct answered {result.correct} from {quiz.questions.length}</p>
            </div>
            }        
        </div>
      </div>
    );
  }

export default Quiz;
