import React, { useEffect, useState } from 'react';
import '../styles/MainTimer.scss';

const MainTimer = ({ time, onTimeout }) => {
  const [seconds, setSeconds] = useState(time);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeout(); // Call the callback when the timer reaches 0
    }
  }, [seconds, onTimeout]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return (
    <div className='timer'>
      <p>Pozostało: </p>
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
    </div>
  );
};

export default MainTimer;
