import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../redux/action";
import { authDefault } from "../redux/reducer";

const Navbar = () => {
  const stateData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(setAuth(authDefault));
    localStorage.setItem("grudge-data", JSON.stringify());
    navigate("/login");
  };

  return (
    <header className="body-font backdrop-filter backdrop-blur-lg bg-opacity-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to=""
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="../../public/icons8-angry-64.png" className="w-10" alt="" />
          <span className="ml-3 text-xl text-gray-100 ">Grugde</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-3">
          <Link
            to={"/"}
            className="hover:text-gray-900 text-gray-200 ease-in-out duration-300"
          >
            Home
          </Link>
          {!stateData.loggedIn ? (
            <>
              <Link
                to={"/signup"}
                className="hover:text-gray-900 text-gray-200 ease-in-out duration-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="inline-flex items-center justify-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0 ease-in-out duration-300"
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
              className="inline-flex items-center  bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-0 ease-in-out duration-300"
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
