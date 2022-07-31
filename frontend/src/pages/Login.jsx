import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../components";
import { setAuth } from "../redux/action";
import { api } from "../request";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginRequest = () => {
    api.post("account/login", { email, password }).then((res) => {
      if (res.status == 200) {
        localStorage.setItem(
          "grudge-data",
          JSON.stringify({ loggedIn: true, token: res.data.data.token })
        );
        dispatch(setAuth({ loggedIn: true, token: res.data.data.token }));
        navigate("/");
      }
    });
  };
  return (
    <section className="text-gray-600 body-font relative">
      {/* <div className="absolute inset-0 bg-gray-300">
     <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style="filter: grayscale(1) contrast(1.2) opacity(0.4);"></iframe>
        </div> */}
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Login
          </h2>
          <Input
            text={email}
            type={"text"}
            label={"Email"}
            updateText={setEmail}
          />
          <Input
            text={password}
            type={"password"}
            label={"Password"}
            updateText={setPassword}
          />
          <button
            onClick={loginRequest}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg "
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
