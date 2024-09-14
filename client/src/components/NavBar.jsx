import React, { useState } from "react";
import { FaPlay, FaTerminal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { outputActions } from "../store/output";
import { Link } from "react-router-dom";
import Spinner from './Spinner';

function NavBar({ LoggedIn, code, handleClick,instance_name }) {
  const { currentPath } = useSelector((store) => store.path);
  const [spinnerActive,setSpinner] = useState(false)
  const dispatch = useDispatch();

  const handleCodeRun = () => {
    setSpinner(true)
    dispatch(outputActions.changeOutput("Executing the file..."));
    fetch("http://localhost:3000/exec_command", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: currentPath,name: instance_name }),
      method: "POST",
      credentials: 'include'
    })
      .then((res) => res.text())
      .then((data) => {
        setSpinner(false)
      });
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <div className="d-flex align-items-center">
            <h3>CodeSphere</h3>
            <img src="../../public/images/logo.png" alt="" width={50} />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {instance_name && <li className="nav-link active">{instance_name}</li>}
            {!code && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
          {!LoggedIn && (
            <div>
              <Link
                className="btn btn-primary me-3"
                to=""
                onClick={handleClick}
              >
                Login
              </Link>
              <a className="btn btn-outline-primary" onClick={handleClick}>
                Sign Up
              </a>
            </div>
          )}
          {code && (
            <div>
              <button
                className="run-btn btn btn-success me-3 mt-1"
                onClick={handleCodeRun}
              >
                {!spinnerActive ? <>RUN <FaPlay /></> :<Spinner />}
              </button>
              <button className="btn btn-primary mt-1">
                <FaTerminal />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
