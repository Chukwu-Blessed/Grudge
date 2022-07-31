import { combineReducers } from "redux";

const authDefault = { loggedIn: false, token: "" };
{
  localStorage.getItem("grudge-data") == null &&
    localStorage.setItem("grudge-data", JSON.stringify(authDefault));
}
const initialState = JSON.parse(localStorage.getItem("grudge-data"));

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TOKEN":
      return payload;
    default:
      return state;
  }
};

const allReaducers = combineReducers({
  auth,
});

export { authDefault, allReaducers };
