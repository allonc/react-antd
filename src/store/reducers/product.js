export default (state = { list: [], page: 1, total: 0 }, action) => {
  switch (action.type) {
    case "PRODUCT_LOADED":
        console.log(action,'action')
      return { ...state,list: action.payload.data.data,total:action.payload.data.total};
    default:
      return state;
  }
};
