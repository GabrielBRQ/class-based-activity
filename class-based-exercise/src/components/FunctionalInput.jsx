import React, { useState } from "react";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
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
  ]);
  const [inputVal, setInputVal] = useState("");

  const count = todos.length;

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      value: inputVal,
      isEditing: false,
      editVal: "",
    };
    setTodos((todo) => [...todo, newTodo]);
    setInputVal("");
  };

  const deleteTask = (deleteId) => {
    const newList = todos.filter((todo) => todo.id !== deleteId);
    setTodos(newList);
  };

  const toggleEdit = (idToEdit) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === idToEdit) {
        return { ...todo, isEditing: !todo.isEditing };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleEditChange = (id, newValue) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editValue: newValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const saveTodo = (idToSave) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === idToSave) {
        return {
          ...todo,
          value: todo.editValue,
          isEditing: false,
          editValue: "",
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks {count}</h4>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: "flex" }}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={todo.editValue}
                  onChange={(e) => handleEditChange(todo.id, e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <li>{todo.value}</li>

                <button onClick={() => deleteTask(todo.id)}>Delete</button>
                <button onClick={() => toggleEdit(todo.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
