export const setFilter = (filter) => {
  return {
    type: "SET",
    payload: filter,
  };
};

export const clearFilter = () => {
  return {
    type: "CLEAR",
    payload: "",
  };
};

const filterReducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);
  console.log("action payload", action.payload);
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export default filterReducer;
