import React, { useEffect, useRef, useState } from 'react';
import '../styles/questions.scss';
import FinalImg from '../assets/final.png';
// import MainTimer from './MainTimer';
import QuestionTimer from './QuestionTimer';
import { set } from 'lodash';
// import { initial } from 'lodash';
// import emailjs from 'emailjs-com';

const Questions = ({ questions, onTimeout, user, region }) => {
  //STATES
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [showNextButton, setShowNextButton] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);

  const [score, setScore] = useState();
  const [points, setPoints] = useState(0);

  const [clickedAnswer, setClickedAnswer] = useState(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(100);
  const [wrongAnswer, setWrongAnswer] = useState(200);
  const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetQuestionTimer, setResetQuestionTimer] = useState(false);
  const [mainResult, setMainResult] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [finalData, setFinalData] = useState();
  // let mainResult = [];
  const [questionResult, setQuestionResult] = useState();
  // const [results, setResults] = useState({
  //   user: user,
  //   region: region,
  //   numberOfQuestionsAnswered: numberOfQuestionsAnswered,
  //   correctAnswer: correctAnswer,
  //   wrongAnswer: wrongAnswer,
  //   score: score,
  // });
  // const [results, setResults] = useState({
  //   user: user,
  //   region: region,
  //   allQuestions: [allQuestions],
  // });

  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const finalScore = Math.ceil((correctAnswer / questions.length) * 100);
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

  const selectAnswerHandler = (answer, id) => {
    setIsActive(true);
    setIsActive(id);

    setMainResult((prevResults) =>
      prevResults.filter(
        (result) => result.questionText !== questions[currentQuestion].text
      )
    );

    const selectedAnswer = answer;
    let userAnswer = {
      questionText: questions[currentQuestion].text,
      answerId: selectedAnswer.id,
      answerText: selectedAnswer.text,
      isCorrect: selectedAnswer.isCorrect === 'true',
    };
    setSelectedAnswerId(answer.id);
    setIsCorrect(selectedAnswer.isCorrect === 'true' ? 1 : 0);
    // questionResult.push(userAnswer);

    // setQuestionResult(null);
    setQuestionResult(userAnswer);
    setMainResult((prevResult) => [...prevResult, userAnswer]);
    const final = mainResult;
    setAllQuestions(final);
    // selectedAnswer.id && selectedAnswer.isCorrect === 'true'
    //   ? correctAnswerHandler()
    //   : wrongAnswerHandler();
    // //////console.log('final:  ' + final);
    // setAllQuestions(final);
    // setMainResult(userAnswer);
    ////////console.log(userAnswer);
    // setShowNextButton(false);
    // setQuestionAnswered(true);
    // setClickedAnswer(answer.id);
    // //////console.log('id ' + answer.id);
    // const clickedAnswer = answer;
    // clickedAnswer.isCorrect === 'true'
    //   ? //////console.log('true')
    //   : //////console.log('false');
    // setSelectedAnswer(clickedAnswer);
    // //////console.log(questions[currentQuestion].text);

    // setDisabled(true);
    // setClickedAnswer(answer.id);
    // setSelectedAnswer(clickedAnswer);
    // //////console.log('selected  ' + selectedAnswer);
    // selectedAnswer.isCorrect === 'true'
    //   ? setScore((prev) => prev + 1)
    //   : setScore(score);
    // const totalQuestionsAnsered = correctAnswer + wrongAnswer;
    // setNumberOfQuestionsAnswered(totalQuestionsAnsered + 1);
    // console.log(' 1 score  ', score);
    // console.log(selectedAnswerId);
    // console.log(isCorrect);
    // setPoints(points);
  };

  const correctAnswerHandler = () => {
    // setScore(score + 1);
    setCorrectAnswer(correctAnswer + 1);
    setWrongAnswer(wrongAnswer);
  };
  const wrongAnswerHandler = () => {
    // setScore(score);
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
  const handleQuestionTimeout = (question, answer, selectedAnswer) => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTimerKey((prev) => prev + 1);
      setResetTimer(true);
    } else {
      setShowScore(true);
    }

    // setSelectedAnswer(clickedAnswer);
    // setQuestionAnswered(false);
    setClickedAnswer(null);
    setDisabled(false);
    // //////console.log(selectedAnswer);
  };

  const nextQuestionHandler = (
    answer,
    questionResult,
    userAnswer,
    selectedAnswer
  ) => {
    // selectedAnswer && selectedAnswer.isCorrect === 'true'
    //   ? setScore((prev) => prev + 1)
    //   : setScore(score);

    // console.log(points);
    setIsActive(null);
    handleQuestionTimeout();
    //////console.log('good ', correctAnswer);
    //////console.log('bad ', wrongAnswer);
    // setShowNextButton(false);
    // setResults((prev) => [...prev, mainResult]);
    // setMainResult((prevResults) => [...prevResults, userAnswer]);

    // setMainResult([...questionResult]);
    //////console.log('MainResult  :  ', mainResult);

    const rest = mainResult;
    //////console.log('rest  ', rest);
    setAllQuestions((prev) => rest);
    // //////console.log('Clear :  ', new Set(mainResult));
    // questionResult = [];
    // console.log('2  score  ', score);
  };

  const sendResultsHandler = () => {
    // //////console.log(results);

    const finalScore = allQuestions.lenght;

    setScore(finalScore);

    // console.log('finalscore ', finalScore);
    // console.log('score ', score);

    //   // ...results,
    //   user: user,
    //   region: region,
    //   numberOfQuestionsAnswered: numberOfQuestionsAnswered,
    //   correctAnswer: correctAnswer,
    //   wrongAnswer: wrongAnswer,
    //   score: score,
    // });
    setShowFinalSummary(true);
    //////console.log('allQ : ', allQuestions);
    const resultsToSend = {
      user: user,
      region: region,
      score: finalScore,
      allQuestions: allQuestions,
    };
    setFinalData(resultsToSend);
    // console.log('Results : ', resultsToSend);
    // await setResults({
  };

  const finishHandler = async () => {
    //////console.log('final Data :  ', finalData);
    const data = await {
      user: user,
      region: region,
      allQuestions: allQuestions,
      // finalData,
    };
    const results = await fetch(
      'https://basic-express-server-qlme.onrender.com/sendResults',
      // 'http://localhost:4000/sendResults',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finalData }),
      }
    );
    // .then((response) => response.json())
    await setShowGoodbye(true)
      // .then((data) => //////console.log(data))
      .catch((error) => console.error('Error:', error));
    //////console.log(user);
    //////console.log(numberOfQuestionsAnswered);
    //////console.log(data);
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
                // currentQuestion={questions[currentQuestion].text}
                onClick={nextQuestionHandler}
                className='questions__next--btn '
                // disabled={showNextButton}
                // disabled={!isActive}
              >
                Następne pytanie
              </button>
              <br />
              <br />

              {questions[currentQuestion].answers.map((answer, id) => {
                return (
                  <li key={answer.id} className='questions__answer'>
                    <button
                      // clickedAnswer={clickedAnswer === id}
                      quest={questions[currentQuestion]}
                      // selectedAnswer={selectedAnswer === id}
                      // onClick={() => selectAnswerHandler(answer)}
                      onClick={() => selectAnswerHandler(answer, id)}
                      disabled={disabled}
                      // className={`questions__answer--btn `}
                      className={`questions__answer--btn  ${
                        isActive === id ? 'clicked' : ''
                      }`}
                      isActive={isActive === id}
                      // ${
                      //   clickedAnswer === answer.id &&
                      //   answer.isCorrect === 'true'
                      //     ? 'correct'
                      //     : ''
                      // }
                      // ${
                      //   questionAnswered &&
                      //   answer.id &&
                      //   answer.isCorrect === 'true'
                      //     ? 'correct'
                      //     : ''
                      // }
                      // ${
                      //   clickedAnswer === answer.id &&
                      //   answer.isCorrect === 'false'
                      //     ? 'incorrect'
                      //     : ''
                      // }

                      // `}
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
                      WYŚWIETLANIE WYNIKÓW DO PRZEROBIENIA
                      {/* <span className='intro__span'> {user}</span> , */}
                      {/* Odpowiedziałeś na {numberOfQuestionsAnswered} z{' '}
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
                      Wynik:{' '} */}
                      {/* {Math.ceil((correctAnswer / questions.length) * 100) + */}
                      {/* {score + '%'}{' '} */}
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
