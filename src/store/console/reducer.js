const consoleReducer = (state, action) => {
  if (action.type === "ADD_LOG") {
    // const payload = action.payload;
    // if (payload && payload.data && !Array.isArray(payload.data)) {
    //   payload.data = JSON.stringify(payload.data, null, 2);
    // }
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
