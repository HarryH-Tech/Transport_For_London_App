import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate } from "../auth";

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: "",
    error: "",
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = formData;

  //on form field change
  const handleChange = (name) => (event) => {
    setFormData({ ...formData, error: false, [name]: event.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setFormData({ ...formData, error: false, loading: true });
    login({ email, password }).then((data) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setFormData({
            ...formData,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  //Error And Success Messages
  const showError = () => (
    <div
      className="font-bold p-3 bg-red-300 w-3/4 rounded-lg mb-2 m-auto"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="loading">
        <img
          alt="Loading..."
          src="https://i.pinimg.com/originals/f9/41/ae/f941ae9d16fd7d2957eea6e5b1100d1e.gif"
        />
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

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
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3"
                placeholder="Username"
                type="text"
                onChange={handleChange("email")}
                value={email || ""}
                required
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
                onChange={handleChange("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                placeholder="Password"
                type="password"
                value={password || ""}
                required
              />
            </div>

            {showLoading()}
            {showError()}
            {redirectUser()}

            <button
              className="bg-blue-500 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Login{" "}
              <span role="img" aria-label="smiley emoji">
                😊
              </span>
            </button>
            <br />
            <div className="pb-6">
              Don't have an account yet? Sign Up{" "}
              <Link to="/signup" className="text-blue-700 hover:underline">
                Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
