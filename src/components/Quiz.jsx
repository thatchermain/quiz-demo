import React, { useState } from 'react';
import '../styles/quiz.scss';
import Questions from './Questions';

const Quiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuizHandler = () => {
    setShowQuiz(true);
  };
  return (
    <div className='container'>
      {!showQuiz ? (
        <div className='intro'>
          <h1 className='intro__title'>Quiz Demo</h1>
          <h4 className='intro__description'>
            {' '}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni,
            facilis.{' '}
          </h4>
          <button className='intro__btn' onClick={startQuizHandler}>
            Start
          </button>
        </div>
      ) : (
        <Questions />
      )}
    </div>
  );
};

export default Quiz;
