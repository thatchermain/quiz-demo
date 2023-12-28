import React, { useEffect, useRef, useState } from 'react';
import '../styles/QuestionTimer.scss';

const QuestionTimer = ({ time, onTimeout, title }) => {
  const [seconds, setSeconds] = useState(time);
  const timerRef = useRef(null);

  useEffect(() => {
    setSeconds(time);
  }, [time]);
  useEffect(() => {
    if (seconds === 0) {
      onTimeout();
    }
  }, [seconds, onTimeout]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [seconds]);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const progress = (seconds / time) * 100;
  return (
    <div className='timer'>
      {/* <p>Czas na odpowiedź: </p> */}
      <p>{title}</p>
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
      {/* <div className='progress-bar'>
        <div className='progress' style={{ width: `${progress}%` }}></div>
      </div> */}
    </div>
  );
};

export default QuestionTimer;
