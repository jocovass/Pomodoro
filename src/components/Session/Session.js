import React, { useRef, useEffect, useReducer } from "react";
import "./Session.css";

function reducer(state, action) {
  switch (action.type) {
    case "set-timer":
      return { ...state, ...action.payload };
    case "update-time":
      return { ...state, time: state.time - 1 };
    case "set-session":
      return { ...state, ...action.payload };
    case "start-stop":
      return { ...state, ...action.payload };
    case "reset":
      return { ...state, ...action.payload };
    default:
      throw Error("Unhandled reducer!");
  }
}

const Session = ({
  focusTime,
  shortBreak,
  longBreak,
  completed,
  updateCompleted,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    countDown: false,
    session: "focus",
    paused: false,
    time: focusTime * 60,
  });
  const handleResetClick = () => {
    dispatch({
      type: "reset",
      payload: {
        countDown: false,
        session: "focus",
        paused: false,
        time: focusTime * 60,
      },
    });
  };
  const handlePauseClick = () => {
    console.log(state.time);
    dispatch({
      type: "start-stop",
      payload: { countDown: false, paused: true },
    });
  };
  const handleStartClick = () => {
    if (state.paused) {
      dispatch({
        type: "start-stop",
        payload: { countDown: true, paused: false },
      });
    } else {
      dispatch({
        type: "set-timer",
        payload: { countDown: true, time: focusTime * 60 },
      });
    }
  };
  const checkSession = () => {
    if (state.session === "focus") {
      updateCompleted({ completed: completed + 1 });
      dispatch({
        type: "set-session",
        payload: {
          time:
            completed && completed % 4 === 0 ? longBreak * 60 : shortBreak * 60,
          session: "break",
        },
      });
    } else if (state.session === "break") {
      dispatch({
        type: "set-session",
        payload: {
          time: focusTime * 60,
          session: "focus",
        },
      });
    }
  };
  const startCountdown = () => {
    dispatch({ type: "update-time" });
    if (state.time === 0) {
      checkSession();
    }
  };

  useInterval(startCountdown, state.countDown, state.session);
  return (
    <section className="session">
      <div className="session__watch">
        <h3 className="session__title">
          {state.session === "focus" ? "Time to Focus" : "Take a Break"}
        </h3>
        <p className="session__time">{formatTime(state.time)}</p>
      </div>
      <div className="buttons">
        <button className="btn" onClick={handleStartClick}>
          Start
        </button>
        <button className="btn" onClick={handlePauseClick}>
          Pause
        </button>
        <button className="btn" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </section>
  );
};

function useInterval(callback, countDown, session, delay = 1000) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null && countDown) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, countDown, session]);
}

function formatTime(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
}

export default Session;
