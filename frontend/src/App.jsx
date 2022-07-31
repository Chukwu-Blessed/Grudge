import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Login, SignUp } from "./pages";

const App = () => {
  return (
    <div className="min-h-screen bg-app bg-center bg-no-repeat bg-cover">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
