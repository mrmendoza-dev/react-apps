import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";

function Timer() {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: number | any;
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
          playDing();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);


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
  const playDing = () => {
    const audio = new Audio("./audio/ding.mp3");
    audio.volume = 1;
    audio.play();
  };

  const renderTime = (m: number, s: number) => {
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };



  return (
    <div className="Timer">
      <h2>Timer</h2>
      <div>
        <p className="time-display">{renderTime(minutes, seconds)}</p>
      </div>

      <div className="time-control">
        <button onClick={handleReset} title="Reset">
          <FontAwesomeIcon icon={icons.faXmark} />
        </button>

        {isRunning ? (
          <button onClick={handleStop} className="big" title="Pause">
            <FontAwesomeIcon icon={icons.faPause} />
          </button>
        ) : (
          <button onClick={handleStart} className="big" title="Start">
            <FontAwesomeIcon icon={icons.faPlay} />
          </button>
        )}

      </div>
    </div>
  );
}

export default Timer;
