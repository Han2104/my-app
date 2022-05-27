import "./App.css";
import { useState } from "react";
import ItemList from "./components/ItemList";
import { useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [mode, setMode] = useState("All");
  const [items, setItems] = useState([
    {
      id: 1,
      itemName: "Hello World",
      isChecked: "Welcome to learning React!",
    },
    {
      id: 2,
      itemName: "Installation",
      isChecked: "You can install React from npm.",
    },
  ]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };
  //const handleSearch = () => {
   // setItems((prev) => {
    //  const newArray = items.filter((item) => item.itemName === searchValue);
      //return newArray;
   // });
 // };
  const handleAddItem = () => {
    const newId = items[items.length - 1].id + 1;
    const newItem = {
      id: newId,
      itemName: inputValue,
      isChecked: false,
    };
    setItems((prev) => {
      const newItems = prev.map((item) => item);
      newItems.push(newItem);
      return newItems;
    });
  };
  const handleChangeMode = (newMode) => {
    setMode(newMode);
  };
  const [viewList, setViewList] = useState(items);
  useEffect(() => {
    let result = [];
    let tempItems = [];
    if (searchValue !=="") {
      tempItems = items.filter(
        (item) => item.itemName.indexOf(searchValue) >=0
      );
    } else {
      tempItems = [...items];
    }
    if (mode === "Active") {
      result = items.filter((item) => {
        return item.isChecked === false;
      });
    } else if (mode === "Completed") {
      result = items.filter((item) => {
        return item.isChecked !== false;
      });
    } else if (mode === "All") {
     // result = items.map((item) => item);
      result = [...tempItems]
      // spread operator: trải các giá trị của mảng/object ra
    }
    setViewList(result);
  }, [mode, items, searchValue]);
  return (
    <div className="App">
      <button
        className={mode === "All" ? "active" : ""}
        onClick={() => handleChangeMode("All")}
      >
        All
      </button>
      <button
        className={mode === "Active" ? "active" : ""}
        onClick={() => handleChangeMode("Active")}
      >
        Active
      </button>
      <button
        className={mode === "Completed" ? "active" : ""}
        onClick={() => handleChangeMode("Completed")}
      >
        Completed
      </button>
      <h1>THINGS TO DO</h1>
      <div className="item">
        <input
          className="input"
          placeholder="Add New"
          type={"text"}
          onChange={(e) => handleChange(e)}
        />
        
        <button onClick={handleAddItem}>Add item</button>
        <input 
          className="search"
          placeholder="Search"
          type={"text"}
          onChange={(e) => handleChangeSearch(e)}
        />
        
        <ItemList className="itemlist" items={viewList} setItems={setItems} />
      </div>
    </div>
  );
}

export default App;
