import React, { useState, useEffect, useRef } from "react";
import "./index.css";


function Pomodoro() {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentCycle, setCurrentCycle] = useState<number>(0);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
          setMinutes(25);
          setSeconds(0);
          setCurrentCycle((currentCycle + 1) % 4);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, currentCycle]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  const renderTime = (m: number, s: number) => {
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  const renderCycle = () => {
    switch (currentCycle) {
      case 0:
        return "Regular";
      case 1:
        return "Short Break";
      case 2:
        return "Regular";
      case 3:
        return "Long Break";
      default:
        return "Regular";
    }
  };

  return (
    <div className="Pomodoro">
      <h2>Pomodoro Timer</h2>
      <div>
        <h3>{renderCycle()}</h3>
        <h1>{renderTime(minutes, seconds)}</h1>
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Pomodoro;
