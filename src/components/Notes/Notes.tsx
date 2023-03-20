import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./Notes.scss";

let dummyData = [
  {
    id: 1675411290144,
    title: "Meeting with John",
    text: "Today at 2 PM, I am meeting with John to discuss the project progress. I need to make sure we are on track and get his feedback on the latest deliverables.",
    favorite: true,
  },
  {
    id: 1675411299480,
    title: "Meeting Notes",
    text: "Discussed project timeline and assigned tasks to team members",
    favorite: false,
  },
  {
    id: 1675411306268,
    title: "Personal Goals",
    text: "Start running in the morning, read one book per month, learn a new language",
    favorite: true,
  },
  {
    id: 1675411344708,
    title: "Work Todo",
    text: "Review reports, create presentation for next meeting, follow up with client",
    favorite: false,
  },
  {
    id: 1675411356258,
    title: "Book Summary",
    text: "The Alchemist by Paulo Coelho, focusing on the idea of following your personal legend and achieving success.",
    favorite: false,
  },
];

function Notes() {
  const [notes, setNotes] = useLocalStorage("notes", dummyData);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), title: "", text: "" }]);
  };
  const deleteNote = (deleteNote: any) => {
    setNotes(notes.filter((note: any) => note.id !== deleteNote.id));
    setSelectedNote(null);
    console.log(deleteNote);
  };

  const updateSelectedNote = (e: any, index: any) => {
    const updatedNotes = [...notes];
    updatedNotes[index][e.target.name] = e.target.value;
    setNotes(updatedNotes);
    setSelectedNote(index);
  };

  const handleFavorite = (id: any) => {
    setNotes(
      notes.map((note: any) => {
        if (note.id === id) {
          note.favorite = !note.favorite;
        }
        return note;
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
    const newList = [...notes];
    const [removed] = newList.splice(sourceIndex, 1);
    newList.splice(targetIndex, 0, removed);
    setNotes(newList);
  };

  return (
    <div className="Notes">
      <div className="control-panel">
        <div className="btn-tray">
          <button className="btn-add" onClick={addNote}>
            <FontAwesomeIcon title="Add" icon={icons.faPlus} />
          </button>
          <button className="btn-add" onClick={addNote}>
            <FontAwesomeIcon title="Filter" icon={icons.faFilter} />
          </button>
        </div>
        <ul className="note-list">
          {notes.map((note: any, index: any) => (
            <li
              className="note-item"
              key={index}
              onClick={() => setSelectedNote(index)}
              style={{ backgroundColor: note.favorite ? "#333" : "" }}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, index)}
            >
              {note.title || "No Title"}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="editor-panel"
        style={{ width: selectedNote !== null ? "400px" : "0px" }}
      >
        {selectedNote !== null && (
          <div>
            <div className="editor-main">
              <button
                className="btn-favorite"
                onClick={() => handleFavorite(notes[selectedNote].id)}
              >
                {notes[selectedNote].favorite ? (
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
              </button>

              <input
                type="text"
                name="title"
                className="note-title"
                placeholder="Title"
                value={notes[selectedNote].title}
                onChange={(e) => updateSelectedNote(e, selectedNote)}
              />
              <button
                className="btn-trash"
                onClick={() => {
                  deleteNote(notes[selectedNote]);
                }}
              >
                <FontAwesomeIcon title="Delete" icon={icons.faTrash} />
              </button>
            </div>

            <textarea
              name="text"
              placeholder="Note text"
              className="note-text"
              value={notes[selectedNote].text}
              onChange={(e) => updateSelectedNote(e, selectedNote)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
