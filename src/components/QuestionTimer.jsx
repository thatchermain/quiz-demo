import React, { useEffect, useRef, useState } from 'react';
import '../styles/QuestionTimer.scss';

const QuestionTimer = ({ key, time, onTimeout }) => {
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

  // Format minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return (
    <div className='timer'>
      <p>Czas na odpowiedź: </p>
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
    </div>
  );
};

export default QuestionTimer;
