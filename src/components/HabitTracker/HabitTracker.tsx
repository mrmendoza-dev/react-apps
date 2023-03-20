import { useState } from "react";
import "./index.scss";

function HabitTracker() {
  const [habits, setHabits] = useState<any>([]);
  const [newHabit, setNewHabit] = useState<any>("");

  const handleAddHabit = () => {
    setHabits([...habits, newHabit]);
    setNewHabit("");
  };
  return (
    <div className="HabitTracker">
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", padding: "20px" }}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={handleAddHabit}>Add Habit</button>
        </div>
        <div style={{ width: "70%", padding: "20px" }}>
          {habits.map((habit: any, index: any) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "30%" }}>{habit}</div>
              <div style={{ display: "flex", width: "70%" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <div key={day} style={{ width: "14.28%" }}>
                      <input type="checkbox" /> {day}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitTracker;
