const consoleReducer = (state, action) => {
  if (action.type === "ADD_LOG") {
    return [...state, action.payload];
  }
  if (action.type === "RESET_LOG") {
    return [];
  }
  return state;
};

export default consoleReducer;
