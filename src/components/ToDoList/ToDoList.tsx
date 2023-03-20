import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./ToDoList.scss";
let dummyData = [
  { id: 1675411290144, text: "Wash car", favorite: false, list: "" },
  { id: 1675411292758, text: "Pay bills", favorite: true, list: "" },
  { id: 1675411299480, text: "Go to the gym", favorite: false, list: "" },
  { id: 1675411306268, text: "Grocery shopping", favorite: true, list: "" },
  { id: 1675411344708, text: "Wash clothes", favorite: false, list: "" },
  { id: 1675411356258, text: "Daily reading", favorite: false, list: "" },
];

function ToDoList() {
  const [todos, setTodos] = useLocalStorage("todos", dummyData);
  const [lists, setLists] = useLocalStorage("todoLists", []);
  const [displayLists, setDisplayLists] = useLocalStorage(
    "todoDisplayLists",
    []
  );
  const [text, setText] = useState("");
  const [currentTab, setCurrentTab] = useLocalStorage(
    "todoCurrentTab",
    "tasks"
  );

  const inputRef: any = useRef(null);

  const handleAddTask = (e: any) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        favorite: false,
      },
    ]);
    setText("");
    inputRef.current.focus();
  };

  const handleFavorite = (id: any) => {
    setTodos(
      todos.map((todo: any) => {
        if (todo.id === id) {
          todo.favorite = !todo.favorite;
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: any) => {
    setTodos(todos.filter((todo: any) => todo.id !== id));
  };

  const handleEdit = (id: any, newText: string) => {
    setTodos(
      todos.map((todo: any) => {
        if (todo.id === id) {
          todo.text = newText;
        }
        return todo;
      })
    );
  };

  const onDragStart = (e: any, index: number) => {
    e.dataTransfer.setData("index", index);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const onDrop = (e: any, targetIndex: number) => {
    const sourceIndex = e.dataTransfer.getData("index");
    const newList = [...displayLists];
    const [removed] = newList.splice(sourceIndex, 1);
    newList.splice(targetIndex, 0, removed);
    setDisplayLists(newList);
  };

  const handleAddList = () => {
    const newList = {
      id: lists.length + 1,
      title: "New List",
    };

    setLists([...lists, newList]);
  };

  const renderLists = () => {
    return lists.map((list: any) => (
      <div className="" key={list.id}>
        <p>{list.title}</p>
      </div>
    ));
  };

  useEffect(() => {
    if (currentTab === "tasks") {
      setDisplayLists(todos);
    } else if (currentTab === "important") {
      let tasks = todos.filter((task: any) => task.favorite);

      setDisplayLists(tasks);
    }
  }, [currentTab, todos]);

  return (
    <div className="ToDoList">
      <div className="tabs">
        <button
          className=""
          onClick={() => {
            setCurrentTab("tasks");
          }}
        >
          <FontAwesomeIcon title="" icon={icons.faHouse} />
        </button>
        <button
          className=""
          onClick={() => {
            setCurrentTab("important");
          }}
        >
          <FontAwesomeIcon title="" icon={icons.faStarFilled} />
        </button>

        <div className="todo-lists">
          <div className="lists">{renderLists()}</div>
        </div>
        <button className="" onClick={handleAddList}>
          <FontAwesomeIcon title="" icon={icons.faPlus} />
        </button>
      </div>

      <div className="main">
        <p className="">
          {currentTab === "tasks"
            ? "Tasks"
            : currentTab === "important"
            ? "Important"
            : ""}
        </p>
        <form className="" onSubmit={handleAddTask}>
          <div className="todo-add">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
            />
            <button className="btn-row" onClick={handleAddTask}>
              <FontAwesomeIcon title="Add" icon={icons.faPlus} />
            </button>
          </div>
        </form>

        <ul className="todo-list">
          {displayLists.map((todo: any, index: any) => (
            <li
              key={todo.id}
              className="todo-row"
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, index)}
            >
              <span
                className="btn-favorite"
                onClick={() => handleFavorite(todo.id)}
              >
                {todo.favorite ? (
                  <FontAwesomeIcon
                    title="Favorite"
                    icon={icons.faStarFilled}
                    className="favorite"
                  />
                ) : (
                  <FontAwesomeIcon
                    title="Unfavorite"
                    icon={icons.faStarEmpty}
                  />
                )}
              </span>
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />

              <button
                className="btn-row btn-trash"
                onClick={() => handleDelete(todo.id)}
              >
                <FontAwesomeIcon title="Delete" icon={icons.faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;

function EditableText(props: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function startEditing() {
    setIsEditing(true);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  function handleChange(event: any) {
    setText(event.target.value);
    props.setValue();
  }

  if (isEditing) {
    return (
      <div className={props.className}>
        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onBlur={stopEditing}
        />
      </div>
    );
  } else {
    return <span onClick={startEditing}>{text}</span>;
  }
}
