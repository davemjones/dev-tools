const consoleReducer = (state, action) => {
  if (action.type === "ADD_LOG") {
    return [...state, action.payload];
  }
  if (action.type === "RESET_LOG") {
    return [];
  }
  if (action.type === "HEARTBEAT") {
     const payload = action.payload;
    if (!payload || !payload.id){
      payload.id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }
    
    return [...state, payload];
  }
  return state;
};

export default consoleReducer;
