import { useEffect, useRef, useState } from "react";
import "./index.scss";

function Dev() {
  return (
    <div className="Dev">
      <div className="test-module-list">
        <div className="test-module">
          <meter
            min="0"
            max="100"
            low={30}
            high={75}
            optimum={80}
            value={50}
          ></meter>
        </div>
        <div className="test-module">
          <input type="file" accept=".png, .jpg" />
        </div>
        <div className="test-module">
          <select>
            <optgroup label="Frontend">
              <option>React</option>
              <option>Vue</option>
              <option>Svelte</option>
            </optgroup>
            <optgroup label="Backend">
              <option>Laravel</option>
              <option>.Net</option>
              <option>Django</option>
            </optgroup>
          </select>
        </div>
        <div className="test-module">
          <a href="path/to/file" download>
            Download
          </a>
        </div>
        <div className="test-module">
          <input type="search" name="search" />
        </div>
        <div className="test-module">
          <details>
            <summary>Expanding Accordion</summary>
            <p>Expanded details</p>
          </details>
        </div>
        <div className="test-module">
          <p>
            4<sup>2</sup> = 16
          </p>
          <p>
            H<sub>2</sub>O
          </p>
        </div>
        <div className="test-module">
          <form>
            <input type="text" />
            <input type="text" />
            <input type="reset" />
          </form>
        </div>
        <div className="test-module">
          <img src="" loading="lazy" alt="lazy-loading" />
        </div>
        <div className="test-module">
          <input list="items" />
          <datalist id="items">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </datalist>
        </div>

        <div className="test-module">
          <a className="trigger" href="#modal">
            Open Modal
          </a>

          <div className="modal" id="modal">
            <h1>TEST</h1>
            <a href="#" className="close-button">
              Close
            </a>
          </div>
        </div>

        <div className="test-module">
          <Modal triggerText="Open Modal 1" id="modal1">
            <div className="modal-react">
              <p>Modal 1 content goes here</p>
            </div>
          </Modal>
          <Modal triggerText="Open Modal 2" id="modal2">
            <div className="modal-react">
              <p>Modal 2 content goes here</p>
            </div>
          </Modal>
        </div>

        <div className="test-module">
          <HoverModal></HoverModal>
        </div>

        <div className="test-module">
          <div className="resize">
            <h1>RESIZE</h1>
          </div>
        </div>

        <div className="test-module">
          <div className="typing-demo">This is a typing demo.</div>
        </div>

        <div className="test-module">
          <input type="text" spellCheck="true" />
        </div>

        <div className="test-module">
          <video src="" poster="./assets/test.png"></video>
        </div>

        <div className="test-module">
          <p contentEditable="true">Editable paragraph</p>
        </div>

        <div className="test-module">
          <div className="frosted"></div>
        </div>
      </div>
    </div>
  );
}

export default Dev;

function Modal(props: any) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <a className="trigger" href={`#${props.id}`} onClick={handleOpenModal}>
        {props.triggerText}
      </a>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" id={props.id}>
            <header className="modal-header">
              <button onClick={handleCloseModal}>Close</button>
            </header>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
}

const HoverModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const triggerRef: any = useRef(null);
  let timeoutId: any = null;
  let ms = 300;

  useEffect(() => {
    if (showModal) {
      setFadeIn(true);
    } else {
      setFadeIn(false);
    }
  }, [showModal]);

  function handleLeave() {
    setFadeIn(false);

    timeoutId = setTimeout(() => {
      setShowModal(false);
    }, ms);
  }

  function handleEnter() {
    setShowModal(true);
    clearTimeout(timeoutId);
  }

  return (
    <div
      ref={triggerRef}
      className="hover-modal"
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
    >
      <p>Hover over me to see the modal</p>
      {showModal && (
        <div
          className="hover-modal-content"
          style={{
            position: "absolute",
            top: `${triggerRef.current.offsetTop}px`,
            left: `${triggerRef.current.offsetLeft}px`,
            opacity: fadeIn ? 1 : 0,
            transition: `opacity ${ms / 1000}s ease-in-out`,
          }}
        >
          This is the modal coThis is the modal contentThis is the modal
          contentThis is the modal contentntent
        </div>
      )}
    </div>
  );
};

function DraggableDiv(props: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialCursorPosition, setInitialCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (event: any) => {
    setInitialCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;
    setPosition({
      x: position.x + (event.clientX - initialCursorPosition.x),
      y: position.y + (event.clientY - initialCursorPosition.y),
    });
    setInitialCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const style: any = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    position: "absolute",
  };

  return (
    <div onMouseDown={handleMouseDown} style={style}>
      {props.children}
    </div>
  );
}
