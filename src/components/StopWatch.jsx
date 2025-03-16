import { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [isRunning, setIsrunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsrunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsrunning(false);
  }
  function reset() {
    setIsrunning(false);
    setElapsedTime(0);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minute = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let second = Math.floor((elapsedTime / 1000) % 60);
    let milisecond = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minute = String(minute).padStart(2, "0");
    second = String(second).padStart(2, "0");
    milisecond = String(milisecond).padStart(2, "0");
    return `${hours}:${minute}:${second}:${milisecond}`;
  }

  return (
    <div className="stopwatch">
      <div className="displayTime">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
