import { useState } from "react";
import "./Calculator.scss";

function Calculator() {
  const [input, setInput] = useState<any>("0");

  const handleClick = (value: any) => {
    if (value === "C") {
      setInput("0");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch (e) {
        setInput("Error");
      }
    } else if (value === "+/-") {
      setInput((prevVal: any) => -prevVal);
    } else if (value === "%") {
      setInput(input / 100);
    } else {
      if (input === "0") {
        setInput(value);
      } else {
        setInput(input + value);
      }
    }
  };

  return (
    <div className="Calculator">
      <div className="input">
        <input type="text" value={input} readOnly />
      </div>

      <div className="buttons">
        <div className="btn-row">
          <button onClick={() => handleClick("%")} className="gray">
            %
          </button>
          <button onClick={() => handleClick("C")} className="gray">
            CE
          </button>
          <button onClick={() => handleClick("C")} className="gray">
            C
          </button>
          <button onClick={() => handleClick("/")} className="gray">
            ÷
          </button>
        </div>

        <div className="btn-row">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")} className="gray">
            ×
          </button>
        </div>

        <div className="btn-row">
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")} className="gray">
            -
          </button>
        </div>

        <div className="btn-row">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")} className="gray">
            +
          </button>
        </div>

        <div className="btn-row">
          <button onClick={() => handleClick("+/-")}>+/-</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("=")} className="gray">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
