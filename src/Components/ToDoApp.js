import React from "react";
import uuid from "uuid";
import axios from "axios";

const BASE_URL = "http://localhost:3000/toDos";

export default class ToDoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      newToDo: "",
      toDos: [],
      filter: "all"
    };
  }

  async componentDidMount() {
    const response = await axios.get(`${BASE_URL}`);
    this.setState({ toDos: response.data });
  }

  handleNewToDoChange = e => {
    this.setState({
      newToDo: e.target.value
    });
  };

  getFilteredToDoList() {
    const { filter, toDos } = this.state;
    if (filter === "pending") {
      return toDos.filter(x => !x.isComplete);
    } else if (filter === "completed") {
      return toDos.filter(x => x.isComplete);
    } else {
      return toDos;
    }
  }

  renderToDoList() {
    return this.getFilteredToDoList().map(item => {
      return (
        <ToDoItem
          key={item.id}
          item={item}
          onDelete={this.handleItemDelete}
          onCompleteToggle={this.handleCompleteToggle}
        />
      );
    });
  }

  handleItemDelete = async item => {
    await axios.delete(`${BASE_URL}/${item.id}`);
    const newItems = this.state.toDos.filter(x => x.id !== item.id);
    this.setState({ toDos: newItems });
  };

  handleCompleteToggle = async item => {
    let itemToReplace = null;
    const newItems = this.state.toDos.map(toDo => {
      if (toDo.id === item.id) {
        itemToReplace = { ...toDo, isComplete: !toDo.isComplete };
        return itemToReplace;
      }
      return toDo;
    });
    await axios.put(`${BASE_URL}/${itemToReplace.id}`, itemToReplace);
    this.setState({ toDos: newItems });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const newItemText = this.state.newToDo.trim();
    if (!newItemText) {
      alert("Please enter what to do.");
    } else {
      const newItem = {
        id: uuid.v4(),
        text: newItemText,
        isComplete: false
      };

      await axios.post(`${BASE_URL}`, newItem);

      this.setState({
        newToDo: "",
        toDos: [...this.state.toDos, ...[newItem]]
      });
    }
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>ToDo App</h1>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="What to do" value={this.state.newToDo} onChange={this.handleNewToDoChange} />
          <button type="submit">submit</button>
        </form>
        <div>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={this.state.filter === "all"}
            onChange={this.handleFilterChange}
          />
          ALL
          <input
            type="radio"
            name="filter"
            value="pending"
            checked={this.state.filter === "pending"}
            onChange={this.handleFilterChange}
          />
          Pending
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={this.state.filter === "completed"}
            onChange={this.handleFilterChange}
          />
          Completed
        </div>
        <ul>{this.renderToDoList()}</ul>
      </div>
    );
  }
}

class ToDoItem extends React.Component {
  deleteItem = e => {
    e.preventDefault();
    this.props.onDelete(this.props.item);
  };

  completeItem = e => {
    e.preventDefault();
    this.props.onCompleteToggle(this.props.item);
  };

  render() {
    return (
      <li>
        <span style={this.props.item.isComplete ? { textDecoration: "line-through" } : {}}>{this.props.item.text}</span>{" "}
        <a href="#" onClick={this.deleteItem} style={{ color: "red" }}>
          X
        </a>{" "}
        <a href="#" onClick={this.completeItem} style={{ color: "blue" }}>
          O
        </a>
      </li>
    );
  }
}
