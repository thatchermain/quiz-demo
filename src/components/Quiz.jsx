import React, { useEffect, useState } from 'react';
import '../styles/quiz.scss';
import Questions from './Questions';

const Quiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState({});
  window.onbeforeunload = function () {
    return '';
  };
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/thatchermain/fakeApiServer/main/db.json'
      );
      const data = await response.json();
      console.log(data);
      data && setQuestions(data);
      console.log(questions);
    };

    fetchHandler();
  }, []);

  const startQuizHandler = () => {
    setShowQuiz(true);
  };

  return (
    <div className='container'>
      {!showQuiz ? (
        <div className='intro'>
          <h1 className='intro__title'>Quiz Demo</h1>
          <h4 className='intro__description'> </h4>
          <button className='intro__btn' onClick={startQuizHandler}>
            Start
          </button>
        </div>
      ) : (
        <Questions questions={questions} />
      )}
    </div>
  );
};

export default Quiz;
