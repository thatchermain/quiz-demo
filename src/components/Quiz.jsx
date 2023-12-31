import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import '../styles/quiz.scss';
import Logo from '../assets/logo.svg';
// import db from '../assets/data/db.json';
import Questions from './Questions';

const Quiz = () => {
  const [user, setUser] = useState('');
  const [region, setRegion] = useState('');
  const [hints, setHints] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState({});
  const [totalTime, setTotalTime] = useState();
  const [minTime, setMinTime] = useState();
  const [maxTime, setMaxTime] = useState();
  const [quizStarted, setQuizStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState();
  const [showTitle, setShowTitle] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  window.onbeforeunload = function () {
    return '';
  };

  // const userNameHandler = (event) => {
  //   setUser(event.target.value);
  //   setRegion(event.target.value);
  // };

  const userHandler = (event) => {
    if (region !== '' && user !== '') {
      setReady(true);
    }
  };
  const userInputHandler = (e) => {
    setUser(e.target.value);
  };
  const userSelectHandler = (e) => {
    setRegion(e.target.value);
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
        'http://testwiedzy.edu.pl/static/media/db.json'
      );
      console.log(response);
      const data = await response.json();
      // (await data) && setQuestions(data);
      // (await data) && setNumberOfQuestions((prev) => questions.length);
      setQuestions(data);
      setNumberOfQuestions(data.length);
      const time = data.map((item) => item.time);
      const overallTime = time.reduce((acc, sum) => {
        return acc + sum;
      }, 0);

      const min = Math.min(...time);
      const max = Math.max(...time);
      setMinTime(min);
      setMaxTime(max);

      setTotalTime(overallTime);
    };
    fetchHandler();
    userHandler();
  }, [user, region]);

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
                    <span className='intro__span'>
                      {`${Math.floor(totalTime / 60)}`}{' '}
                    </span>
                    min. i{' '}
                    <span className='intro__span'>{`${totalTime % 60}`} </span>
                    sek.
                  </h2>
                  <h2 className='intro__clue'>
                    Czas na udzielenie odpowiedzi na pytanie:{' '}
                    <span className='intro__span'>
                      {minTime} - {maxTime}
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
                  {/* <h2 className='intro__clue'>
                    Po wybraniu odpowiedzi nie ma możliwości zmiany wyboru.
                  </h2> */}
                  <h2 className='intro__clue'>
                    Nie ma możliwości powrotu do poprzedniego pytania.{' '}
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
              <h2 className='introduction__item'>Nr w BeeOffice.</h2>
              <input
                autoFocus={true}
                className='input introduction__item'
                type='text'
                spellCheck='false'
                value={user}
                onChange={userInputHandler}
              />
              <h2 className='introduction__item'>Region.</h2>

              <select
                name='region'
                id='region'
                className='select'
                value={region}
                onChange={userSelectHandler}
              >
                <option value=''></option>
                <option value='Region 1'>Region 1</option>
                <option value='Region 2'>Region 2</option>
                <option value='Region 3'>Region 3</option>
                <option value='Region 4'>Region 4</option>
                <option value='Region 5'>Region 5</option>
                <option value='Region 6'>Region 6</option>
                <option value='Region 7'>Region 7</option>
              </select>

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
            region={region}
            numberOfQuestions={numberOfQuestions}
            totalTime={totalTime}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
