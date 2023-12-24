import React, { useEffect, useRef, useState } from 'react';
import '../styles/questions.scss';
import FinalImg from '../assets/final.png';
// import MainTimer from './MainTimer';
import QuestionTimer from './QuestionTimer';
// import { initial } from 'lodash';
// import emailjs from 'emailjs-com';

const Questions = ({ questions, onTimeout, user }) => {
  //STATES
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [clickedAnswer, setClickedAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetQuestionTimer, setResetQuestionTimer] = useState(false);
  const [results, setResults] = useState({
    user: user,
    numberOfQuestionsAnswered: numberOfQuestionsAnswered,
    correctAnswer: correctAnswer,
    wrongAnswer: wrongAnswer,
    score: score,
  });
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  //HANDLERS
  const questionHandler = (answer) => {
    setQuestionAnswered(false);
    setClickedAnswer(null);
    setDisabled(false);
    handleQuestionTimeout();
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);

      setShowScore(true);
    }
  };

  const selectAnswerHandler = (answer) => {
    setDisabled(true);
    setSelectedAnswer(answer.id);
    setClickedAnswer(answer.id);
    setQuestionAnswered(true);
    console.log(answer.isCorrect);
    answer.isCorrect === 'true'
      ? setCorrectAnswer(true)
      : setCorrectAnswer(false);
    answer.isCorrect === 'true' ? correctAnswerHandler() : wrongAnswerHandler();
    const totalQuestionsAnsered = correctAnswer + wrongAnswer;
    setNumberOfQuestionsAnswered(totalQuestionsAnsered + 1);
  };

  const correctAnswerHandler = () => {
    setScore(score + 1);
    setCorrectAnswer(correctAnswer + 1);
    setWrongAnswer(wrongAnswer);
  };
  const wrongAnswerHandler = () => {
    setScore(score);
    setWrongAnswer(wrongAnswer + 1);
    setCorrectAnswer(correctAnswer);
  };
  // const resetQuizHandler = () => {
  //   setCurrentQuestion(0);
  //   setShowScore(false);
  //   setScore(0);
  //   setCorrectAnswer(0);
  //   setWrongAnswer(0);
  // };
  const handleTimeout = () => {
    setShowScore(true);
  };
  const handleQuestionTimeout = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
      setResetTimer(true);
    } else {
      setShowScore(true);
    }
    setSelectedAnswer(null);
    setQuestionAnswered(false);
    setClickedAnswer(null);
    setDisabled(false);
  };

  const nextQuestionHandler = () => {
    handleQuestionTimeout();
  };

  const sendResultsHandler = async () => {
    await setResults({
      // ...results,
      user: user,
      numberOfQuestionsAnswered: numberOfQuestionsAnswered,
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer,
      score: score,
    });
    await setShowFinalSummary(true);
    console.log(results);
  };

  const finishHandler = async () => {
    const data = await {
      user: user,
      numberOfQuestionsAnswered: numberOfQuestionsAnswered,
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer,
      score: score,
    };
    const results = await fetch(
      'https://basic-express-server-qlme.onrender.com/sendResults',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    // .then((response) => response.json())
    await setShowGoodbye(true)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
    console.log(user);
    console.log(numberOfQuestionsAnswered);
    console.log(data);
  };

  const finalClick = () => {
    finishHandler();
    setShowGoodbye(true);
  };
  /////////////                     TEST             ///////////////////////

  /////////////                     TEST             ///////////////////////

  /////////////////////////
  const timerRef = useRef(null);
  useEffect(() => {
    if (currentQuestion < questions.length) {
      timerRef.current = setTimeout(() => {
        handleQuestionTimeout();
      }, questions[currentQuestion].time * 10000);

      return () => clearTimeout(timerRef.current);
    }
  }, [timerKey, resetQuestionTimer, currentQuestion, questions]);

  return (
    <>
      {!showScore ? (
        <div className='questions__container'>
          <div className='main__info'>
            <div>
              {/* <MainTimer time={250} onTimeout={handleTimeout}></MainTimer> */}
              <QuestionTimer
                title='Czas do końca testu: '
                time={250}
                onTimeout={handleTimeout}
              ></QuestionTimer>
            </div>
            <QuestionTimer
              title='Czas na odpowiedź: '
              key={timerKey}
              time={questions[currentQuestion].time}
              onTimeout={handleQuestionTimeout}
              resetKey={resetTimer ? currentQuestion : -1}
            />
          </div>

          <div className='questions'>
            <div className='questions__question'>
              <div className='questions__question--text'>
                <h4 className='question__number'>
                  Pytanie {currentQuestion + 1} z {questions.length}{' '}
                </h4>
                <h3 className='questions__question--text-h3'>
                  {questions[currentQuestion].text}
                </h3>
              </div>
              <div className='questions__image'>
                {questions[currentQuestion].image && (
                  <img src={questions[currentQuestion].image} alt='pic' />
                )}
              </div>
            </div>
            <ul className='questions__answers'>
              <button
                onClick={nextQuestionHandler}
                className='questions__next--btn'
                disabled={!questionAnswered}
              >
                Następne pytanie
              </button>
              <br />
              <br />

              {questions[currentQuestion].answers.map((answer, id) => {
                return (
                  <li key={answer.id} className='questions__answer'>
                    <button
                      selectedAnswer={selectedAnswer === id}
                      onClick={() => selectAnswerHandler(answer)}
                      disabled={disabled}
                      className={`questions__answer--btn 
                      ${
                        clickedAnswer === answer.id &&
                        answer.isCorrect === 'true'
                          ? 'correct'
                          : ''
                      } 
                      ${
                        questionAnswered &&
                        answer.id &&
                        answer.isCorrect === 'true'
                          ? 'correct'
                          : ''
                      } 
                      ${
                        clickedAnswer === answer.id &&
                        answer.isCorrect === 'false'
                          ? 'incorrect'
                          : ''
                      } 
                      
                      
                      `}
                    >
                      {answer.text}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* <div className='questions__buttons'>
              <button
                disabled={!questionAnswered}
                className='questions__next--btn'
                onClick={questionHandler}
              >
                {currentQuestion === questions.length - 1 && questionAnswered
                  ? 'Zakończ'
                  : 'Następne pytanie'}
              </button>
            </div> */}
          </div>
        </div>
      ) : (
        <div className='results'>
          {!showFinalSummary ? (
            <>
              <h1>
                {' '}
                <span className='intro__span'> {user}</span> , ukończyłeś test!
              </h1>
              {/* <div className='finalImg'>
                <img src={FinalImg} alt='' />
              </div> */}
              <br />
              <br />
              <br />
              <button
                onClick={sendResultsHandler}
                // className='questions__next--btn'
                className='btn'
              >
                Poznaj swój wynik
              </button>
            </>
          ) : (
            <>
              {!showGoodbye ? (
                <>
                  <>
                    <h1>
                      <span className='intro__span'> {user}</span> ,
                      odpowiedziałeś na {numberOfQuestionsAnswered} z{' '}
                      {questions.length} pytań.
                    </h1>
                    <br />
                    <br />
                    <h1>Odpowiedzi prawidłowe: {correctAnswer}</h1>
                    <br />
                    <br />
                    <h1>Odpowiedzi błędne: {wrongAnswer} </h1>
                    <br />
                    <br />
                    <h1>
                      Wynik:{' '}
                      {Math.ceil((correctAnswer / questions.length) * 100) +
                        '%'}{' '}
                    </h1>
                    <br />
                    <br />
                    <button
                      onClick={finalClick}
                      // className='questions__next--btn'
                      className='btn'
                    >
                      Zakończ test
                    </button>
                  </>
                </>
              ) : (
                <>
                  <h1>Można zamknąć okno przeglądarki</h1>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Questions;
