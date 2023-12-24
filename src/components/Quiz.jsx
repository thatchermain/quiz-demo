import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import '../styles/quiz.scss';
import Logo from '../assets/logo.svg';
import Questions from './Questions';
import MainTimer from './MainTimer';

const Quiz = () => {
  const [user, setUser] = useState('');
  const [hints, setHints] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState({});
  const [totalTime, setTotalTime] = useState();
  const [quizStarted, setQuizStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState();
  const [showTitle, setShowTitle] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

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
      // (await data) && setQuestions(data);
      // (await data) && setNumberOfQuestions((prev) => questions.length);
      setQuestions(data);
      setNumberOfQuestions(data.length);
      const time = data.map((item) => item.time);
      const overallTime = time.reduce((acc, sum) => {
        return acc + sum;
      }, 0);
      console.log(overallTime);
      setTotalTime(overallTime);
    };
    fetchHandler();
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
          <div className='logo'>
            <img src={Logo} alt='' />
          </div>
          {hints ? (
            showTitle ? (
              <>
                <h1 className='intro__title'>Test wiedzy teoretycznej</h1>

                <h2>Data: 04.01.2024</h2>
                <br />
                <button
                  className='intro__btn'
                  onClick={() => setShowTitle(false)}
                >
                  Informacje
                </button>
              </>
            ) : (
              <>
                <div className='intro__clues'>
                  <h2 className='intro__clue'>
                    Czas na rozwiązanie testu:{' '}
                    <span className='intro__span'>{`${Math.floor(
                      totalTime / 60
                    )} minut i ${totalTime % 60} sekund`}</span>
                    .
                  </h2>
                  <h2 className='intro__clue'>
                    Czas na udzielenie odpowiedzi na pytanie:{' '}
                    <span className='intro__span'>
                      {20} - {30}
                    </span>{' '}
                    sekund.
                  </h2>

                  <h2 className='intro__clue'>
                    Test składa się z{' '}
                    <span className='intro__span'>{numberOfQuestions}</span>{' '}
                    pytań zamkniętych.
                  </h2>
                  <h2 className='intro__clue'>
                    Za każdą prawidłową odpowiedź można uzyskać{' '}
                    <span className='intro__span'>1</span> punkt.
                  </h2>
                  {/* <br /> */}
                  {/* <br /> */}
                  <h2 className='intro__clue'>
                    Istnieje możliwość wyboru tylko jednej odpowiedzi na dane
                    pytanie.
                  </h2>
                  <h2 className='intro__clue'>
                    Po wybraniu odpowiedzi nie ma możliwości zmiany wyboru.
                  </h2>
                  <h2 className='intro__clue'>
                    Nie ma również możliwości powrotu do poprzedniego pytania.{' '}
                  </h2>
                  <h2 className='intro__clue'>
                    Podczas testu nie można korzystać z żadnych dodatkowych
                    pomocy.
                  </h2>
                  <h2 className='intro__clue intro__clue--center'>
                    Powodzenia!
                  </h2>

                  {/* <h2 className='intro__clue'>
                    Liczba punktów możliwych do uzyskania:{' '}
                    <span className='intro__span'>{numberOfQuestions}</span>.
                  </h2> */}

                  <button
                    className='intro__clue intro__btn'
                    onClick={() => setHints(false)}
                  >
                    Dalej
                  </button>
                </div>
              </>
            )
          ) : (
            <div className='introduction'>
              <h2 className='introduction__item'>
                Wpisz imię i nazwisko lub e-mail i naciśnij przycisk.
              </h2>
              <input
                autoFocus={true}
                className='input introduction__item'
                type='text'
                spellCheck='false'
                value={user}
                onChange={userHandler}
              />

              {/* <h4 className='intro__description'></h4> */}
              <button
                className='intro__btn introduction__item'
                onClick={startQuizHandler}
                disabled={!ready}
              >
                Rozpocznij test
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* <Timer time={10} onTimeout={handleTimeout}></Timer> */}
          <Questions
            questions={questions}
            onTimeout={handleTimeout}
            user={user}
            numberOfQuestions={numberOfQuestions}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
