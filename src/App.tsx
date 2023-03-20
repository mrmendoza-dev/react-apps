import { useState } from 'react'
import './App.css'
import "./index.css";
import "./index.scss";

import {Routes, Route, Link} from "react-router-dom"
import Notes from './components/Notes/Notes';
import ToDoList from './components/ToDoList/ToDoList';
import Calculator from "./components/Calculator/Calculator";
import IOSCalculator from "./components/IOSCalculator/IOSCalculator";
import Timer from "./components/Timer/Timer";

import Pomodoro from "./components/Pomodoro/Pomodoro";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Dictionary from "./components/Dictionary/Dictionary";
import Dev from "./components/Dev/Dev";
import HabitTracker from "./components/HabitTracker/HabitTracker";
import CryptoModule from './components/CryptoModule/CryptoModule';
import WeatherModule from "./components/WeatherModule/WeatherModule";
import Bookmarks from './components/Bookmarks/Bookmarks';
import Memorize from './components/Memorize/Memorize';

function App() {


  const apps = [
    { name: "Home", path: "/", app: <App /> },
    { name: "Notes", path: "/notes", app: <Notes /> },
    { name: "To-Do List", path: "/todo", app: <ToDoList /> },
    { name: "Calculator", path: "/calculator", app: <Calculator /> },
    { name: "iOS Calculator", path: "/ios-calculator", app: <IOSCalculator /> },
    { name: "Timer", path: "/timer", app: <Timer /> },
    { name: "Pomodoro", path: "/pomodoro", app: <Pomodoro /> },
    { name: "Currency Converter", path: "/currency-converter", app: <CurrencyConverter /> },
    { name: "Dictionary", path: "/dictionary", app: <Dictionary /> },
    { name: "Habit Tracker", path: "/habit-tracker", app: <HabitTracker /> },
    { name: "Crypto", path: "/crypto", app: <CryptoModule /> },
    { name: "Weather", path: "/weather", app: <WeatherModule /> },
    { name: "Bookmarks", path: "/bookmarks", app: <Bookmarks /> },
    { name: "Memorize", path: "/memorize", app: <Memorize /> },
  ];

const element = {
  el: <Memorize />,
};

  return (
    <div className="App">
      <div className="app-sidebar">
        <div className="app-list">
          {apps.map((app) => {
            return (
              <Link to={app.path} className="app-link">
                {app.name}
              </Link>
            );
          })}
          <Link
            to="/dev"
            className="app-link"
            style={{ opacity: 0, cursor: "default" }}
          >
            Dev
          </Link>
        </div>

        <div className="resources">
          <a
            href="https://github.com/mrmendoza171/react-apps"
            target="_blank"
            className="app-link"
          >
            Github
          </a>
        </div>
      </div>

      <div className="app-display">
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<Notes></Notes>} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/ios-calculator" element={<IOSCalculator />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/crypto" element={<CryptoModule />} />
            <Route path="/weather" element={<WeatherModule />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            {/* <Route path="/memorize" element={<Memorize />} /> */}

            <Route path="/dev" element={<Dev />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
