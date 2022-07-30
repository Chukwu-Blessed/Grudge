import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const [signedIn, setSignedIn] = useState(false);

  const logOut = () => {
    setSignedIn(true);
    setToken(null);
    localStorage.setItem("grudge-data", null);
  };
  useEffect(() => {
    if (token == null) {
      logOut();
    } else {
      setSignedIn(false);
    }

    return () => {};
  }, []);

  return (
    <header className="body-font backdrop-filter backdrop-blur-lg bg-opacity-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to=""
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-gray-100 ">Grugde</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-3">
          <Link
            to={"/"}
            className="hover:text-gray-900 text-gray-200 ease-in-out duration-300"
          >
            Home
          </Link>
          {signedIn ? (
            <>
              <Link
                to={"/signup"}
                className="hover:text-gray-900 text-gray-200 ease-in-out duration-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="inline-flex items-center justify-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-4 lg:mt-0 ease-in-out duration-300"
              >
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1 rotate-180"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </>
          ) : (
            <button
              onClick={logOut}
              className="inline-flex items-center  bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-4 lg:mt-0 ease-in-out duration-300"
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
