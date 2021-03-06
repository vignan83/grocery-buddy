import "./App.css";

import React, {useState } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "hello world",
    type: "danger",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter the value", "danger");
    }
    
    else if (name && isEditing) {
     
      setList(list.map((item)=>{
        if(item.id === editID){
          return {...item,title:name}
        }
        return item;
      }))
      setName('');
      setEditID(null);
      setIsediting(false);
      showAlert(true,"Value Changed","success");

    } else {
      showAlert(true, "Added successfully", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "Removed all items", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "Item Deleted", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id)=>{
    const specificItem = list.find((item) => item.id===id);
    setIsediting(true);
    setEditID(id);
    setName(specificItem.title);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
