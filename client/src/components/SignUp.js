import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth";

function SignUp(props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: false,
    error: false,
  });

  const {
    username,
    email,
    password,
    confirmPassword,
    success,
    error,
  } = formData;

  //On Form Field Change
  const handleChange = (event) => {
    console.log({ formData });
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Set State and Send Data To signUp function in auth -> index.js
  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormData({
        ...formData,
        error: "Passwords do not match, please try again.",
        success: false,
      });
    } else {
      console.log({ username, email, password });
      signUp({ username, email, password }).then((data) => {
        console.log(data);
        if (data.error || data.err) {
          setFormData({
            ...formData,
            error: data.error || data.err,
            success: false,
          });
        } else {
          setFormData({
            username,
            email,
            success: true,
          });
        }
      });
    }
  };

  //Error And Success Messages
  const showError = () => (
    <div
      className="font-bold p-3 bg-red-300 w-3/4 rounded-lg"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="font-bold p-3 bg-green-300 w-3/4 rounded-lg"
      style={{ display: success ? "" : "none" }}
    >
      Account Created. <br /> Please{" "}
      <Link to="/login" className="text-blue-700 hover:underline">
        Login
      </Link>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-1/2 m-10 text-center">
          <form className="bg-white shadow-lg rounded px-5 mb-5">
            <div className="mb-5">
              <label
                className="block text-grey-700 text-md font-bold mb-3"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3"
                placeholder="Username"
                type="text"
                name="username"
                onChange={handleChange}
                value={username}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-700 text-md font-bold mb-3"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                name="email"
                onChange={handleChange}
                value={email}
                className="shadow appearance-none border rounded w-full py-2 px-3"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-700 text-md font-bold mb-3"
                htmlFor="password"
              >
                Password:
              </label>

              <input
                name="password"
                onChange={handleChange}
                value={password}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-700 text-md font-bold mb-3"
                htmlFor="confirmPassword"
              >
                Confirm Password:
              </label>

              <input
                name="confirmPassword"
                onChange={handleChange}
                value={confirmPassword}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
            {/******Error and Success Messages******/}
            <div className="flex items-center justify-center mb-5">
              {showError()}
              {showSuccess()}
            </div>
            <button
              className="bg-blue-500 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignUp}
            >
              Sign Up{" "}
              <span role="img" aria-label="smiley emoji">
                😊
              </span>
            </button>
            <br />
            <div className="pb-6">
              Already have an account? Login{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
                Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
