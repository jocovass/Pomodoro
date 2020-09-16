import React, { useReducer, useEffect, useCallback } from "react";
import "./Timer.css";
import Controls from "../../components/Controls.js/Controls";
import Session from "../../components/Session/Session";
import debounce from "lodash/debounce";

const initialState = {
  focusTime: 25,
  target: 8,
  completed: 0,
  series: 0,
  shortBreak: 5,
  longBreak: 15,
  dailyChallange: false,
};

function reducer(state, action) {
  return { ...state, ...action };
}

const Timer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pomodoro"));
    if (data) {
      const today = Date.now();
      const diff = Math.floor((today - data.date) / 1000 / 60 / 60);
      if (diff < 24) {
        dispatch({ series: data.series, dailyChallange: true });
      } else if (diff < 48) {
        dispatch({ series: data.series, dailyChallange: false });
      } else {
        dispatch({ series: 0, dailyChallange: true });
      }
    }
  }, []);
  useEffect(() => {
    if (state.completed === state.target && !state.dailyChallange) {
      const data = {
        series: state.series + 1,
        dailyChallange: true,
        date: Date.now(),
      };
      localStorage.setItem("pomodoro", JSON.stringify(data));
      dispatch({ series: state.series + 1, dailyChallange: true });
    }
  }, [state.completed, state.target]);
  const changeHandler = (e) => {
    dispatch({
      [e.target.name]: Number(e.target.value),
    });
  };
  return (
    <main className="Main">
      <Controls state={state} changeHandler={changeHandler} />
      <Session
        focusTime={state.focusTime}
        longBreak={state.longBreak}
        shortBreak={state.shortBreak}
        completed={state.completed}
        dispatch={dispatch}
        updateCompleted={dispatch}
      />
    </main>
  );
};

export default Timer;
