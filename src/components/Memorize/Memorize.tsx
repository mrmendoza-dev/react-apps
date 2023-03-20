import moment from "moment";
import { useEffect, useState } from "react";
import "./Memorize.scss";
function Memorize() {
  const [items, setItems] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const repetitionIntervals = [
    { id: 1, interval: 10 * 60 * 1000 }, // 10 minutes
    { id: 2, interval: 24 * 60 * 60 * 1000 }, // 1 day
    { id: 3, interval: 3 * 24 * 60 * 60 * 1000 }, // 3 days
    { id: 4, interval: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    { id: 5, interval: 21 * 24 * 60 * 60 * 1000 }, // 3 weeks
    { id: 6, interval: 30 * 24 * 60 * 60 * 1000 }, // 1 month
    // Add more intervals if needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems: any) => [...prevItems]);
    }, 60 * 1000); // Check every 1 minute

    return () => clearInterval(interval);
  }, []);

  const addItem = (e: any) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name,
      details,
      currentRepetition: 1,
      dueDate: moment()
        .add(repetitionIntervals[0].interval, "milliseconds")
        .toDate(),
    };

    setItems((prevItems: any) => [...prevItems, newItem]);
    setName("");
    setDetails("");
  };

  const checkOffItem = (id: any) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any) => {
        if (item.id === id) {
          const newRepetition = item.currentRepetition + 1;

          const newDueDate = moment()
            .add(
              repetitionIntervals[newRepetition - 1].interval,
              "milliseconds"
            )
            .toDate();

          return {
            ...item,
            currentRepetition: newRepetition,
            dueDate: newDueDate,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="Memorize">
      <form onSubmit={addItem}>
        <div className="">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </div>
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>

      <button onClick={() => setCurrentTab("all")}>All Items</button>
      <button onClick={() => setCurrentTab("due")}>Due Items</button>

      {currentTab === "all" ? (
        <AllItems items={items} />
      ) : (
        <DueItems items={items} checkOffItem={checkOffItem} />
      )}
    </div>
  );
}

export default Memorize;

const AllItems = (props: any) => {
  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {props.items.map((item: any) => (
          <li key={item.id}>
            <p className="">{item.name}</p>
            <p className="">{item.details}</p>
            <p className="">{item.currentRepetition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DueItems = (props: any) => {
  const dueItems = props.items.filter((item: any) =>
    moment().isSameOrAfter(item.dueDate)
  );

  return (
    <div>
      <h2>Due Items</h2>
      <ul>
        {dueItems.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.details}
            <button onClick={() => props.checkOffItem(item.id)}>
              Check off
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
