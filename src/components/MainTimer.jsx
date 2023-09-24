import React, { useEffect, useRef, useState } from 'react';
import '../styles/MainTimer.scss';

const MainTimer = ({ time, onTimeout }) => {
  const [seconds, setSeconds] = useState(time);
  const timerRef = useRef(null);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeout();
    }
  }, [seconds, onTimeout]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const progress = (seconds / time) * 100;
  return (
    <div className='timer'>
      <p>Pozostało: </p>
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
      <div className='progress-bar'>
        <div className='progress' style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default MainTimer;
