import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WorkList from "./WorkList";

// fontawesome.com for react icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };

    /*bind() method allows us to easily set which object will be bound by the this keyword when a function or method is invoked. */
    this.inputList = this.inputList.bind(this);
    this.addWork = this.addWork.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  // taking input of items
  inputList(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  // to add an item to list
  addWork(e) {
    e.preventDefault();
    let newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      newItem = [...this.state.items, newItem];
      this.setState({
        items: newItem,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }

  // to remove an item from the list

  removeItem(key) {
    /* The filter() method creates an array filled with all array elements that pass a test*/
    const removedItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: removedItems,
    });
  }

  // to edit the item entered in the list
  setUpdate(text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1 className="heading">MY TO-DO LIST</h1>
        </div>
        <header>
          <form id="to-do" onSubmit={this.addWork}>
            <input
              type="text"
              placeholder="ENTER TEXT"
              value={this.state.currentItem.text}
              onChange={this.inputList}
            />
            <button type="submit">ADD</button>
          </form>
        </header>
        <WorkList
          items={this.state.items}
          removeItem={this.removeItem}
          setUpdate={this.setUpdate}
        ></WorkList>
      </div>
    );
  }
}

export default App;
