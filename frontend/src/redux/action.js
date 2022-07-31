const setAuth = (payload) => {
  return {
    type: "TOKEN",
    payload,
  };
};

export { setAuth };
