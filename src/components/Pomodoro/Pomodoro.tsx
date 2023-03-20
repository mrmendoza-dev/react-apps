import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Pomodoro.scss";

function Pomodoro() {
  const [minutes, setMinutes] = useLocalStorage("minutes", 25);
  const [seconds, setSeconds] = useLocalStorage("seconds", 0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [currentInterval, setCurrentInterval] = useLocalStorage(
    "currentInterval",
    1
  );

  const [onBreak, setOnBreak] = useLocalStorage("onBreak", false);
  const [workTime, setWorkTime] = useState(25);
  const [shortbreakTime, setShortBreakTime] = useState(5);
  const [longbreakTime, setLongBreakTime] = useState(15);
  const [longBreakInterval, setLongbreakInterval] = useState(4);

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
          nextCycle();
          playDing();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const resetInterval = () => {
    setCurrentInterval(1);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const nextCycle = () => {
    setOnBreak((prevVal: any) => !prevVal);
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

  useEffect(() => {
    if (onBreak) {
      if (currentInterval % longBreakInterval === 0) {
        setMinutes(longbreakTime);
      } else {
        setMinutes(shortbreakTime);
      }
    } else {
      setMinutes(workTime);
      setCurrentInterval((prevVal: any) => prevVal + 1);
    }
    setSeconds(0);
    setIsRunning(false);
  }, [onBreak]);

  useEffect(() => {
    setCurrentInterval(1);
  }, []);

  return (
    <div className="Pomodoro">
      <h2>Pomodoro Timer</h2>
      <div>
        <p className="time-display">{renderTime(minutes, seconds)}</p>
        <p onClick={resetInterval}>Current Interval: {currentInterval}</p>
        <p>
          {onBreak
            ? `${
                onBreak && currentInterval % longBreakInterval === 0
                  ? "Long Break"
                  : "Short Break"
              }`
            : "Work Time"}
        </p>
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

        <button onClick={nextCycle} title="Skip">
          <FontAwesomeIcon icon={icons.faForward} />
        </button>
      </div>

      {/* <TaskList /> */}
    </div>
  );
}

export default Pomodoro;

// const TaskList = () => {
//   const [tasks, setTasks] = useLocalStorage("pomodoroTasks",[
//     { id: 1, title: "Task 1" },
//     { id: 2, title: "Task 2" },
//     { id: 3, title: "Task 3" },
//   ]);
//   const [highlightedTask, setHighlightedTask] = useLocalStorage("pomodoroTasksHighlighted", tasks[0]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");

//   const handleTaskClick = (task: any) => {
//     setHighlightedTask(task);
//   };

//   const handleDeleteTask = (id: any) => {
//     const newTasks = tasks.filter((task: any) => task.id !== id);
//     setTasks(newTasks);

//     if (highlightedTask.id === id) {
//       setHighlightedTask(newTasks[0] || null);
//     }
//   };

//   const handleAddTask = () => {
//     if (newTaskTitle.trim() === "") return;

//     const newTask = {
//       id: tasks.length + 1,
//       title: newTaskTitle,
//     };

//     setTasks([...tasks, newTask]);
//     setNewTaskTitle("");
//   };

//   const renderTasks = () => {
//     const remainingTasks = tasks.filter(
//       (task: any) => task.id !== highlightedTask.id
//     );

//     return remainingTasks.map((task: any, index: any) => {
//       return (
//         <li key={task.id}>
//           <span onClick={() => handleTaskClick(task)}>{task.title}</span>
//           <button
//             onClick={() => handleDeleteTask(task.id)}
//             style={{ marginLeft: "10px" }}
//           >
//             Delete
//           </button>
//         </li>
//       );
//     });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newTaskTitle}
//         onChange={(e) => setNewTaskTitle(e.target.value)}
//         placeholder="Enter new task"
//       />
//       <button onClick={handleAddTask}>Add Task</button>
//       <ul>
//         {highlightedTask && (
//           <li key={highlightedTask.id}>
//             <span style={{ fontWeight: "bold", color: "blue" }}>
//               {highlightedTask.title}
//             </span>
//             <button
//               onClick={() => handleDeleteTask(highlightedTask.id)}
//               style={{ marginLeft: "10px" }}
//             >
//               Delete
//             </button>
//           </li>
//         )}
//         {renderTasks()}
//       </ul>
//     </div>
//   );
// };
