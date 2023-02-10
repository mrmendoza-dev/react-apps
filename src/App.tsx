import { useState } from 'react'
import './App.css'
import {Routes, Route, Link} from "react-router-dom"
import Notes from './components/Notes/Notes';
import ToDoList from './components/ToDoList/ToDoList';
import Calculator from "./components/Calculator/Calculator";
import IOSCalculator from "./components/IOSCalculator/IOSCalculator";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Dictionary from "./components/Dictionary/Dictionary";

function App() {

  return (
    <div className="App">
      <div className="app-sidebar">
        <div className="app-list">
          <Link to="/" className="app-link">
            Home
          </Link>
          <Link to="/notes" className="app-link">
            Notes
          </Link>
          <Link to="/todo" className="app-link">
            To-Do List
          </Link>
          <Link to="/calculator" className="app-link">
            Calculator
          </Link>
          <Link to="/ios-calculator" className="app-link">
            iOS Calculator
          </Link>
          <Link to="/pomodoro" className="app-link">
            Pomodoro
          </Link>
          <Link to="/currency-converter" className="app-link">
            Currency Converter
          </Link>
          <Link to="/dictionary" className="app-link">
            Dictionary
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
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
