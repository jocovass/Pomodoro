import React from "react";
import ControllInput from "./ControlInput";
import "./Controls.css";

const Controls = ({ state, changeHandler }) => {
  const isCompleted = state.completed >= state.target ? "completed" : "";
  return (
    <>
      <section className="current-status">
        <p>
          Series: <span className="score">{state.series}</span>
        </p>
        <p>
          Completed:{" "}
          <span className={`score ${isCompleted}`}>
            {state.completed}/{state.target}
          </span>
        </p>
      </section>
      <section className="controls">
        <form>
          <div className="row">
            <div className="col">
              <ControllInput
                label="Focus Time"
                name="focusTime"
                value={state.focusTime}
                min={10}
                max={90}
                changeHandler={changeHandler}
              />
            </div>
            <div className="col">
              <ControllInput
                label="Target"
                name="target"
                value={state.target}
                min={4}
                max={20}
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ControllInput
                label="Short Break"
                name="shortBreak"
                value={state.shortBreak}
                min={2}
                max={20}
                changeHandler={changeHandler}
              />
            </div>
            <div className="col">
              <ControllInput
                label="Long Break"
                name="longBreak"
                value={state.longBreak}
                min={2}
                max={30}
                changeHandler={changeHandler}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Controls;
