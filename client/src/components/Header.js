import React from "react";
import { signOut, isAuthenticated } from "../auth";

//React Router
import { Link, withRouter } from "react-router-dom";

// Styles
import "../assets/Header.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#fff" };
  }
};

function Header({ history }) {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>

          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">Transport For London Information</Link>
          </span>
        </div>

        {isAuthenticated() && (
          <>
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer lg:hidden block"
            >
              <svg
                className="fill-current text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />

            <div
              id="menu"
              className="hidden  w-full block flex-grow lg:flex lg:items-center lg:w-auto"
            >
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Link to="/pollution">Pollution</Link>
              </div>

              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Link to="/journey_planner">Journey Planner</Link>
              </div>

              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Link to="/taxis">Taxis Nearby</Link>
              </div>

              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 float-right">
                <button
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() =>
                    signOut(() => {
                      history.push("/");
                    })
                  }
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {!isAuthenticated() && (
          <div className="flex">
            <div className=" mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              <Link
                style={isActive(history, "/signup")}
                to="signup"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </div>

            <div className=" mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              <Link
                style={isActive(history, "/login")}
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default withRouter(Header);
