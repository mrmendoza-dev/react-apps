import React, { useState, useEffect, useRef } from "react";
import "./index.css";

let dummyData = [
  { id: 1675411290144, text: "Wash car", favorite: false },
  { id: 1675411292758, text: "Pay bills", favorite: true },
  { id: 1675411299480, text: "Go to the gym", favorite: false },
  { id: 1675411306268, text: "Grocery shopping", favorite: true },
  { id: 1675411344708, text: "Wash clothes", favorite: false },
  { id: 1675411356258, text: "Daily reading", favorite: false },
];

function ToDoList() {
  const [todos, setTodos] = useState(
    JSON.parse(
      localStorage.getItem("todos") || JSON.stringify(dummyData) || "[]"
    )
  );
  const [text, setText] = useState("");
  const inputRef: any = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: any) => {
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
      const newList = [...todos];
      const [removed] = newList.splice(sourceIndex, 1);
      newList.splice(targetIndex, 0, removed);
      setTodos(newList);
    };


  return (
    <form className="ToDoList" onSubmit={handleAdd}>
      <div className="todo-add todo-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
        />
        <button className="btn-row" onClick={handleAdd}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo: any, index: any) => (
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
                <i className="fa-solid fa-star favorite"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </span>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />

            {/* <button
              className="btn-row btn-edit"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button> */}
            <button
              className="btn-row btn-trash"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>

          </li>
        ))}
      </ul>
    </form>
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
