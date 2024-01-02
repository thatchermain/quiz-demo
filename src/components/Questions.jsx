import React, { useEffect, useRef, useState } from 'react';
import '../styles/questions.scss';

import QuestionTimer from './QuestionTimer';

const Questions = ({
  questions,
  onTimeout,
  user,
  region,
  numberOfQuestions,
}) => {
  //STATES
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(100);
  const [wrongAnswer, setWrongAnswer] = useState(200);
  const [timerKey, setTimerKey] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [mainResult, setMainResult] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionScore, setQuestionScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [procentScore, setProcentScore] = useState(0);
  const [finalData, setFinalData] = useState();
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const finalScore = Math.ceil((overallScore / questions.length) * 100);
  //HANDLERS
  const questionHandler = (answer) => {
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
    setQuestionScore(answer.isCorrect === 'true' ? 1 : 0);
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

    setMainResult((prevResult) => [...prevResult, userAnswer]);
    const final = mainResult;
    setAllQuestions(final);
  };

  const correctAnswerHandler = () => {
    setCorrectAnswer(correctAnswer + 1);
    setWrongAnswer(wrongAnswer);
  };
  const wrongAnswerHandler = () => {
    setWrongAnswer(wrongAnswer + 1);
    setCorrectAnswer(correctAnswer);
  };

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

    setDisabled(false);
  };

  const nextQuestionHandler = (
    answer,
    questionResult,
    userAnswer,
    selectedAnswer
  ) => {
    setOverallScore(overallScore + questionScore);
    setProcentScore((overallScore / numberOfQuestions) * 100);

    setIsActive(null);
    handleQuestionTimeout();

    const rest = mainResult;

    setAllQuestions((prev) => rest);
  };

  const sendResultsHandler = () => {
    const finalScore = allQuestions.lenght;

    setShowFinalSummary(true);

    const resultsToSend = {
      user: user,
      region: region,
      score: overallScore,
      procentage: procentScore,
      allQuestions: allQuestions,
    };
    setFinalData(resultsToSend);

    // await setResults({
    // console.log(resultsToSend);
    // console.log(procentScore);
  };

  const finishHandler = async () => {
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

    await setShowGoodbye(true).catch((error) => console.error('Error:', error));
  };

  const finalClick = () => {
    finishHandler();
    setShowGoodbye(true);
  };

  const timerRef = useRef(null);
  useEffect(() => {
    if (currentQuestion < questions.length) {
      timerRef.current = setTimeout(() => {
        handleQuestionTimeout();
      }, questions[currentQuestion].time * 10000);

      return () => clearTimeout(timerRef.current);
    }
  }, [timerKey, currentQuestion, questions]);

  return (
    <>
      {!showScore ? (
        <div className='questions__container'>
          <div className='main__info'>
            <div>
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
                className='questions__next--btn '
              >
                Następne pytanie
              </button>
              <br />
              <br />

              {questions[currentQuestion].answers.map((answer, id) => {
                return (
                  <li key={answer.id} className='questions__answer'>
                    <button
                      quest={questions[currentQuestion]}
                      onClick={() => selectAnswerHandler(answer, id)}
                      disabled={disabled}
                      className={`questions__answer--btn  ${
                        isActive === id ? 'clicked' : ''
                      }`}
                      isActive={isActive === id}
                    >
                      {answer.text}
                    </button>
                  </li>
                );
              })}
            </ul>
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

              <br />
              <br />
              <br />
              <button onClick={sendResultsHandler} className='btn'>
                Poznaj swój wynik
              </button>
            </>
          ) : (
            <>
              {!showGoodbye ? (
                <>
                  <>
                    <h1>
                      Odpowiedziałeś prawidłowo na
                      <span className='intro__span'>
                        {' '}
                        {overallScore}
                      </span> z {questions.length} pytań.
                    </h1>
                    <br />
                    <h1>
                      Twój wynik to{' '}
                      <span className='intro__span'>{finalScore} %</span>.
                    </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <button onClick={finalClick} className='btn'>
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
