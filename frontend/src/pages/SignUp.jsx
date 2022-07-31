import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Input, swal } from "../components";

const MySwal = withReactContent(Swal);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const signUpRequest = () => {
    checkTextbox();
    api.post("account/signup", { email, password, username }).then((res) => {
      if (res.status == 201) {
        swal(res.data.message, "success");
        navigate("/login");
      }
    });
  };
  const checkTextbox = () => {
    if (username == "") {
      return MySwal.fire({ icon: "info", html: "usename is empty" });
    }
    if (email == "") {
      return MySwal.fire({ icon: "info", html: "email is empty" });
    }
    if (password == "") {
      return MySwal.fire({ icon: "info", html: "password is empty" });
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-3 lg:py-24  mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            SignUp
          </h2>
          <Input
            text={username}
            type={"text"}
            label={"Username"}
            updateText={setUsername}
          />
          <Input
            text={email}
            type={"text"}
            label={"Email"}
            updateText={setEmail}
          />
          <Input
            text={password}
            type={"text"}
            label={"Password"}
            updateText={setPassword}
          />

          <button
            onClick={signUpRequest}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg "
          >
            Signup
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
