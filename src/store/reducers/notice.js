export default (
  state = {
    isAllRead: false,
    count: 8,
    toTop: false,
    showHigh: null,
    getInfo: null,
  },
  action
) => {
  switch (action.type) {
    case "READ_ALL":
      return { ...state, isAllRead: true };
    case "TO_TOP":
      return { ...state, toTop: action.data };
    case "GET_HIGH":
      return { ...state, showHigh: action.showHigh };
    case "GET_INFO":
      return { ...state, getInfo: action.getInfo };
    default:
      return state;
  }
};
