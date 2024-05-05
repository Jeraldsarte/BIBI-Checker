import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import logo from "./images/logo.png";
import user from "./images/users.png";
import hris from "./images/hris-logo.png";
import web from "./images/web.png";
import SignUp from "./SignupForm";

const App = () => {
  const [profileID, setID] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (profileID) {
      axios
        .post("http://localhost:5001/employee/get_service_record", {
          employee_id: profileID,
        })
        .then((response) => {
          console.log(response.data); // Log the data to check if it's coming correctly
        })
        .catch((error) => {
          console.error(error);
          alert("Error: Failed to fetch service records data");
        });
    }
  }, [profileID]);

  // Function to set logged-in state and save the token and user data to local storage
  const setLoggedInWithLocalStorage = (token, userDetails) => {
    console.log("userDetails:", userDetails);

    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      const errorMessage = "Please enter both email and password";
      setLoginError(errorMessage);
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:5001/api/login", { username: email, password })
      .then((response) => {
        console.log(response.data);
        const { error, message, token, userDetails } = response.data;

        if (error) {
          setLoginError(message);
        } else {
          setLoggedInWithLocalStorage(token, userDetails);
          setLoggedIn(true); // Set loggedIn to true after successful login
        }
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          alert("Error: No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error: Failed to make the request");
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading animation
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    console.clear();
  };

  const handleRegisterLinkClick = () => {
    setRegister(true);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div className="success">
          <div className="background-container"></div>
          <nav className="navbar">
            <div className="logo-container">
              <img src={logo} alt="bisu-logo" className="bisu-logo" />
              <div className="logo-line"></div>
              <img src={hris} alt="hris-logo" className="hris" />

              <div className="campus-name">
                <p className="text">
                  BOHOL ISLAND STATE UNIVERSITY
                  <br />
                  BILAR CAMPUS
                  <br />
                  Zamora, Bilar, Bohol
                </p>
              </div>
            </div>
            <img src={web} alt="website" className="website" />
          </nav>

          <div className="user-info-container">
            <div className="user-info">
              <div className="top-info-container">
                <div className="top-info">
                  <h2>Welcome, {name}!</h2>
                  <div className="user-info-input">
                    <p>
                      <strong>Profile ID:</strong> {profileID}
                    </p>
                    <p>
                      <strong>Name:</strong> {name}
                    </p>
                    <p>
                      <strong>Position:</strong> {position}
                    </p>
                    <p>
                      <strong>Address:</strong> {address}
                    </p>
                  </div>
                </div>

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="background-container"></div>
          <nav className="navbar">
            <div className="logo-container">
              <img src={logo} alt="bisu-logo" className="bisu-logo" />
              <div className="logo-line"></div>
              <img src={hris} alt="hris-logo" className="hris" />

              <div className="campus-name">
                <p className="text">
                  BOHOL ISLAND STATE UNIVERSITY
                  <br />
                  BILAR CAMPUS
                  <br />
                  Zamora, Bilar, Bohol
                </p>
              </div>
            </div>
            <img src={web} alt="website" className="website" />
          </nav>

          <div className="container">
            <div className="login-container">
              <div className="user-logo">
                <img src={user} className="user-image" alt="user-logo" />
                <div className="vertical-line"></div>
                <p className="bibic-header">
                  Bisu Bilar
                  <br />
                  Enrollment Checker
                </p>
              </div>
              {register ? (
                <SignUp />
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="register-info">
                    <div>
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {loginError && (
                        <p className="login-error">{loginError}</p>
                      )}
                    </div>

                    <button
                      className="login"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <div className="loader"></div> : "Login"}
                    </button>

                    <div>
                      <p>
                        Don't have an account?{" "}
                        <span
                          className="register-link"
                          onClick={handleRegisterLinkClick}
                        >
                          Click here
                        </span>
                      </p>
                    </div>

                    {/* <p className="developer">
                    Developed and Maintained by: <br />
                    <a
                      href="https://www.facebook.com/malabutejustin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Management Information System Unit
                    </a>
                    Version 1.0
                  </p> */}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
