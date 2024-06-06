import React, { useEffect } from "react";
import { useReducer, useState } from "react";

const initialMessage = {
  catList: ["Whiskers", "Felix", "Oscar", "Smudge"],
  message: "",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "addCat":
      if (![...state.catList].includes(action.catName)) {
        return {
          ...state,
          catList: [action.catName, ...state.catList],
          message: action.message,
          //   message: action.message,
        };
      }
      return {
        ...state,
        message: `Error in adding ${action.catName} check if it already exist`,
      };
    case "removeCat":
      return {
        ...state,
        catList: state.catList.filter((cat) => cat !== action.catName),
        message: action.message,
      };
    case "clearMessage":
      return {
        ...state,
        message: ``,
      };

    default:
      return state;
  }
};

const CatList = () => {
  const [catName, setCatName] = useState("");

  const [state, dispatch] = useReducer(reducer, initialMessage);

  // useEffect(() => {

  // }, [state]);

  const handleKeyPress = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      dispatch({
        type: "addCat",
        catName,
        message: `${catName} added successfully`,
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setCatName(e.target.value)}
        placeholder="enter a cat name..."
        value={catName}
        onKeyDown={handleKeyPress}
      />

      {/* Add cat to the list */}
      <button
        onClick={() =>
          dispatch({
            type: "addCat",
            catName: catName,
            message: `${catName} added successfully`,
          })
        }
      >
        Add cat
      </button>

      {/* Remove cat from the list */}
      <button
        onClick={() =>
          dispatch({
            type: "removeCat",
            catName: catName,
            message: `${catName} removed successfuly`,
          })
        }
      >
        Remove cat
      </button>
      <h3>All cats</h3>

      {/* Show list of cats  */}
      <ul>
        {state.catList.map((catName, index) => (
          <li key={index}>{catName}</li>
        ))}
      </ul>
      <div>{state.message ?? state.message}</div>
    </div>
  );
};

export default CatList;
