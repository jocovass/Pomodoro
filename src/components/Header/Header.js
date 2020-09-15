import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <header className="Header">
      <h1 className="title">
        <img className="Logo" src={logo} alt="logo" />
        <span className="title__text">PomodoroTime</span>
      </h1>
      <nav>
        <Link className="nav__link" to="/">
          Home
        </Link>
        <Link className="nav__link" to="/history">
          History
        </Link>
        <a
          className="github-button"
          href="https://www.github.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Github V1.0
        </a>
      </nav>
    </header>
  );
};

export default Header;
