import React, { useState } from 'react';
import '../styles/questions.scss';
import questions from '../data/questions';

const Questions = () => {
  //STATES
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [clickedAnswer, setClickedAnswer] = useState(false);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  //VARIABLES

  //HANDLERS
  const questionHandler = (answer) => {
    setQuestionAnswered(false);
    setClickedAnswer(null);
    setDisabled(false);
    // setSelectedAnswer(false);
    // setCorrectAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowScore(true);
    }
  };
  const selectAnswerHandler = (answer) => {
    setDisabled(true);
    setClickedAnswer(answer.id);
    setQuestionAnswered(true);
    console.log(answer.isCorrect);
    answer.isCorrect === 'true'
      ? setCorrectAnswer(true)
      : setCorrectAnswer(false);
    // answer.isCorrect === 'true' ? console.log(score + 1) : console.log(score);
    answer.isCorrect === 'true' ? correctAnswerHandler() : wrongAnswerHandler();
    // setSelectedAnswer(id);
    // setSelectedAnswer(true);
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
  const resetQuizHandler = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setCorrectAnswer(0);
    setWrongAnswer(0);
  };

  return (
    <>
      {!showScore ? (
        <>
          <div className='questions'>
            <h4>
              Pytanie {currentQuestion + 1} z {questions.length}{' '}
            </h4>
            {/* <h4>Wynik: {score}</h4>
            <h4>Poprawne: {correctAnswer}</h4>
            <h4>Błędne: {wrongAnswer}</h4> */}
            <br />
            <br />
            <h3 className='questions__question'>
              {questions[currentQuestion].text}
            </h3>
            <ul className='questions__answers'>
              {questions[currentQuestion].answers.map((answer) => {
                return (
                  <li key={answer.id} className='questions__answer'>
                    <button
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
            <div className='questions__buttons'>
              {/* <button
                disabled={!selectedAnswer}
                className='questions__confirm--btn'
                // onClick={(answer) => confirmAnswerHandler(answer)}
                onClick={() => confirmAnswerHandler(answers[currentQuestion].answer.isCorrect)}
              >
                Potwierdź
              </button> */}
              <button
                disabled={!questionAnswered}
                className='questions__next--btn'
                onClick={questionHandler}
              >
                {currentQuestion === questions.length - 1 && questionAnswered
                  ? 'Zakończ'
                  : 'Następne pytanie'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Wynik: {score} pkt.</h1>
          <h1>Prawidłowe: {correctAnswer} pkt.</h1>
          <h1>Błędne: {wrongAnswer} pkt.</h1>
          <br />
          <button onClick={resetQuizHandler}>Spróbuj ponownie</button>
        </div>
      )}
    </>
  );
};

export default Questions;
