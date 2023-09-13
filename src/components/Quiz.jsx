import React, { useEffect, useState } from 'react';
import _ from 'lodash';
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
      // console.log(data);
      const shuffledData = _.shuffle(data);
      data && setQuestions(shuffledData);
      // console.log(questions);
      // console.log(shuffledData);
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
