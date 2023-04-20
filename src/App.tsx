import "./App.scss";
import "./index.scss";
import { nanoid } from "nanoid";
import { Link, Route, Routes } from "react-router-dom";
import Calculator from "./components/Calculator/Calculator";
import IOSCalculator from "./components/IOSCalculator/IOSCalculator";
import Notes from "./components/Notes/Notes";
import Timer from "./components/Timer/Timer";
import ToDoList from "./components/ToDoList/ToDoList";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import CryptoModule from "./components/CryptoModule/CryptoModule";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Dev from "./components/Dev/Dev";
import Dictionary from "./components/Dictionary/Dictionary";
import HabitTracker from "./components/HabitTracker/HabitTracker";
import Memorize from "./components/Memorize/Memorize";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import WeatherModule from "./components/WeatherModule/WeatherModule";
import Vocabulary from "./components/Vocabulary/Vocabulary";
import Wikipedia from "./components/Wikipedia/Wikipedia";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

function App() {
  const apps = [
    { name: "Home", path: "/", app: <App /> },
    { name: "Notes", path: "/notes", app: <Notes /> },
    { name: "To-Do List", path: "/todo", app: <ToDoList /> },
    { name: "Calculator", path: "/calculator", app: <Calculator /> },
    { name: "iOS Calculator", path: "/ios-calculator", app: <IOSCalculator /> },
    { name: "Timer", path: "/timer", app: <Timer /> },
    { name: "Pomodoro", path: "/pomodoro", app: <Pomodoro /> },
    {
      name: "Currency Converter",
      path: "/currency-converter",
      app: <CurrencyConverter />,
    },
    { name: "Dictionary", path: "/dictionary", app: <Dictionary /> },
    { name: "Habit Tracker", path: "/habit-tracker", app: <HabitTracker /> },
    { name: "Crypto", path: "/crypto", app: <CryptoModule /> },
    { name: "Weather", path: "/weather", app: <WeatherModule /> },
    { name: "Bookmarks", path: "/bookmarks", app: <Bookmarks /> },
    { name: "Memorize", path: "/memorize", app: <Memorize /> },
    { name: "Wikipedia", path: "/wikipedia", app: <Wikipedia /> },
    { name: "Vocabulary", path: "/vocabulary", app: <Vocabulary /> },
    { name: "MusicPlayer", path: "/music-player", app: <MusicPlayer /> },
  ];


  return (
    <div className="App">
      <div className="app-sidebar">
        <div className="app-list">
          {apps.map((app) => {
            return (
              <Link to={app.path} key={nanoid()} className="app-link">
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

            {apps.map((app) => {
              return <Route path={app.path} element={app.app} key={nanoid()} />;
            })}
            {/* <Route path="/notes" element={<Notes />} />
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
            <Route path="/memorize" element={<Memorize />} />
            <Route path="/wikipedia" element={<Wikipedia />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/music-player" element={<MusicPlayer />} /> */}
            
            <Route path="/dev" element={<Dev />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
