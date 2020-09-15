import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import History from "../components/History/History";
import Timer from "./Timer/Timer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Timer} />
          <Route path="/history" component={History} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
