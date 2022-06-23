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

const Todo3 = () => {
  const [item, setItem] = useState("");
  const [itemArr, setItemArr] = useState(getLocalItems());
  const [isEdit, setEdit] = useState(true);
  const [isEdited, setEdited] = useState(null);

  const AddItem = () => {
    const NewItem = item;
    if (!item) {
      alert("pls fill the data");
    } else if (item && !isEdit) {
      setItemArr(
        itemArr.map((data) => {
          if (data.id === isEdited) {
            return { ...data, name: item };
          }
          return data;
        })
      );
      setEdit(true);
      //set input value to prev value
      setItem("");
      //to pass current element Id to new state variable for reference
      setEdited(null);
    } else {
      const allItemArr = { id: new Date().getTime().toString(), name: NewItem };
      setItemArr([...itemArr, allItemArr]);
    }

    setItem("");
  };

  const RemoveItem = (id) => {
    const NewArr = itemArr.filter((data) => data.id !== id);
    setItemArr(NewArr);
  };

  const RemoveAll = () => {
    setItemArr([]);
  };

  const EditItem = (id) => {
    //get id and name
    let newEditItem = itemArr.find((data) => data.id === id);
    console.log(newEditItem);
    //toggle edit button
    setEdit(false);
    //set input value to prev value
    setItem(newEditItem.name);
    //to pass current element Id to new state variable for reference
    setEdited(id);
  };

  //   add data to local storage
  useEffect(() => {
    //storing in string format local storage
    localStorage.setItem("lists", JSON.stringify(itemArr));
  }, [itemArr]);

  const renderTaskList = itemArr.map((data) => (
    <div className="eachItem" key={data.id}>
      <h3>{data.name}</h3>
      <div className="todo-btn" key={data.id}>
        <i
          className="far fa-edit add-btn"
          title="Edit item"
          onClick={() => EditItem(data.id)}
        ></i>
        <i
          className="far fa-trash-alt add-btn"
          title="Delte Item"
          onClick={() => RemoveItem(data.id)}
        ></i>
      </div>
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
            {!isEdit ? (
              <i
                className="far fa-edit add-btn"
                title="Edit item"
                onClick={AddItem}
              ></i>
            ) : (
              <i
                className="fa fa-plus add-btn "
                title="Add item"
                onClick={AddItem}
              ></i>
            )}
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

export default Todo3;
