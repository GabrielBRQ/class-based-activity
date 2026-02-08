/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: "ex1",
          value: "Just some demo tasks",
          isEditing: false,
          editValue: "",
        },
        {
          id: "ex2",
          value: "As an example",
          isEditing: false,
          editValue: "",
        },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  saveTodo = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          value: todo.editValue,
          isEditing: false,
          editValue: "",
        };
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  handleEditChange = (id, newValue) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editValue: newValue };
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      value: this.state.inputVal,
      isEditing: false,
      editValue: "",
    };
    this.setState((prevState) => ({
      // 3. O array antigo vem do argumento 'prevState'
      todos: [...prevState.todos, newTodo],
      inputVal: "",
    }));
  }

  deleteTask(idToDelete) {
    const newList = this.state.todos.filter((todo) => todo.id !== idToDelete);
    this.setState(() => ({
      todos: newList,
    }));
  }

  toggleEdit(idToEdit) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === idToEdit) {
        return { ...todo, isEditing: !todo.isEditing };
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  render() {
    const count = this.state.todos.length;

    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks: {count}</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <div key={todo.id} style={{ display: "flex" }}>
              {todo.isEditing ? (
                <>
                  <input
                    type="text"
                    value={todo.editValue}
                    onChange={(e) =>
                      this.handleEditChange(todo.id, e.target.value)
                    }
                  />
                  <button onClick={() => this.saveTodo(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  <li>{todo.value}</li>

                  <button onClick={() => this.deleteTask(todo.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.toggleEdit(todo.id)}>Edit</button>
                </>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
