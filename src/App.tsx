import { useState } from 'react'
import './App.css'
import {Routes, Route, Link} from "react-router-dom"
import Notes from './components/Notes/Notes';
import ToDoList from './components/ToDoList/ToDoList';

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
        </div>
      </div>

      <div className="app-display">
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<Notes></Notes>} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/todo" element={<ToDoList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
