import React, { createContext, useState } from "react";

{
  localStorage.getItem("grudge-data") == null &&
    localStorage.setItem("grudge-data", "");
}
const browserData = localStorage.getItem("grudge-data");
const UserContext = createContext(browserData);

const UserProvider = ({ children }) => {
  // const [name, setName] = useState("John Doe");
  // const happyBirthday = () => setAge(age + 1);
  // const [age, setAge] = useState(1);
  const [token, setToken] = useState("Hello");

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, browserData, UserProvider };
