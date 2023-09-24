import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import '../styles/quiz.scss';
import Questions from './Questions';
import MainTimer from './MainTimer';

const Quiz = () => {
  const [user, setUser] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [ready, setReady] = useState(false);
  window.onbeforeunload = function () {
    return '';
  };
  const userHandler = (event) => {
    setUser(event.target.value);
    setReady(true);
  };
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  useEffect(() => {
    const fetchHandler = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/thatchermain/fakeApiServer/main/db.json'
      );
      const data = await response.json();
      data && setQuestions(data);
    };

    fetchHandler();
    console.log(questions);
  }, []);

  const startQuizHandler = () => {
    const shuffledQuestions = questions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));

    setQuestions(_.shuffle(shuffledQuestions));
    setShowQuiz(true);
    setQuizStarted(true);
  };
  const handleTimeout = () => {
    // alert('Time is up! Quiz completed.');
  };
  return (
    <div className='container'>
      {!showQuiz && !quizStarted ? (
        <div className='intro'>
          <h1 className='intro__title'>Quiz Demo</h1>
          <h3>Wpisz imię i nazwisko lub e-mail i naciśnij START.</h3>
          <input
            className='input'
            type='text'
            spellCheck='false'
            value={user}
            onChange={userHandler}
          />

          <h4 className='intro__description'></h4>
          <button
            className='intro__btn'
            onClick={startQuizHandler}
            disabled={!ready}
          >
            Start
          </button>
        </div>
      ) : (
        <>
          {/* <Timer time={10} onTimeout={handleTimeout}></Timer> */}
          <Questions
            questions={questions}
            onTimeout={handleTimeout}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
