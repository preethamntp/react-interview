import React from "react";
import { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "addCat":
      return {
        ...state,
        catList: [action.catName, ...state.catList],
      };
    case "removeCat":
      return {
        ...state,
        catList: state.catList.filter((cat) => cat !== action.catName),
      };

    default:
      return state;
  }
};

const CatList = () => {
  const [catName, setCatName] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    catList: ["Whiskers", "Felix", "Oscar", "Smudge"],
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setCatName(e.target.value)}
        placeholder="enter a cat name..."
        value={catName}
      />

      {/* Add cat to the list */}
      <button onClick={() => dispatch({ type: "addCat", catName: catName })}>
        Add cat
      </button>

      {/* Remove cat from the list */}
      <button onClick={() => dispatch({ type: "removeCat", catName: catName })}>
        Remove cat
      </button>
      <h3>All cats</h3>

      {/* Show list of cats  */}
      <ul>
        {state.catList.map((catName, index) => (
          <li key={index}>{catName}</li>
        ))}
      </ul>
    </div>
  );
};

export default CatList;
