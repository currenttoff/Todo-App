//using loacal storage

import React, { useEffect, useState } from "react";
import "./todo.css";
import "../App.css";

//to set from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    //converting from string to array
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo2 = () => {
  const [item, setItem] = useState("");
  const [itemArr, setItemArr] = useState(getLocalItems());

  const AddItem = () => {
    const NewItem = item;
    if (NewItem !== "" && !itemArr.includes(NewItem)) {
      setItemArr([...itemArr, NewItem]);
    }

    setItem("");
  };

  const RemoveItem = (deletedItem) => {
    const NewArr = itemArr.filter((data) => data !== deletedItem);
    setItemArr(NewArr);
  };

  const RemoveAll = () => {
    setItemArr([]);
  };

  //   add data to local storage
  useEffect(() => {
    //storing in string format local storage
    localStorage.setItem("lists", JSON.stringify(itemArr));
  }, [itemArr]);

  const renderTaskList = itemArr.map((data, index) => (
    <div className="eachItem" key={index}>
      <h3>{data}</h3>
      <i
        className="fas fa-trash-alt add-btn"
        title="Delte Item"
        onClick={() => RemoveItem(data)}
      ></i>
    </div>
  ));

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://cdn.dribbble.com/users/2446756/screenshots/5102086/dribbble_shot_hd_4x.png"
              alt="Icon"
            ></img>
            <figcaption>Add Task here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item... "
              value={item}
              onChange={(e) => setItem(e.target.value)}
            ></input>
            <i
              className="fa fa-plus add-btn "
              title="Add item"
              onClick={AddItem}
            ></i>
          </div>

          <div className="showItems">{renderTaskList}</div>

          <br></br>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={RemoveAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo2;
