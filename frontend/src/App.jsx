import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/Auth";
import { Home, Login, SignUp } from "./pages";

{
  localStorage.getItem("grudge-data") == null &&
    localStorage.setItem("grudge-data", null);
}
const browserData = localStorage.getItem("grudge-data");

const App = () => {
  const [token, setToken] = useState(JSON.parse(browserData));
  return (
    <UserProvider>
      <div className="min-h-screen bg-app bg-center bg-no-repeat bg-cover">
        <BrowserRouter>
          <Navbar token={token} setToken={setToken} />
          <Routes>
            <Route
              exact
              path=""
              element={<Home token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="login"
              element={<Login token={token} setToken={setToken} />}
            />
            <Route exact path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
