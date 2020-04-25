import { useReducer } from "react";

function Book() {
  const [book, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "COUNT_ADD":
          return { ...state, count: state.count + 1 };
        case "ADD_LIST":
          return { ...state, list: [action.payload, ...state.list] };
        default:
          return state;
      }
    },
    {
      list: [],
      count: 1,
    }
  );
  const add = () => {
    dispatch({
      type: "COUNT_ADD",
    });
  };
  const addList = (book) => {
    dispatch({
      type: "ADD_LIST",
      payload: book,
    });
  };
  return { book, add, addList };
}

export default Book;
