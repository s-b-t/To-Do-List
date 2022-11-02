import React, { useState } from 'react';
import './App.css';

function App() {
  // Below this is equivalent to:
  // const newTodoStateArr = useState("");
  // const newTodo = newTodoStateArr[0];
  // const newTodo = newTodoStateArr[1];
  
  const [newTodo, setNewTodo] = useState("");
  
  const [todos, setTodos] = useState([]);
  
  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    if (newTodo.length === 0) {
      return;
    }
  
  const todoItem = {
    text: newTodo,
    complete: false
  }

    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
        // Below is another way to write this logic... Also avoids mutating the 'to-do' directly:
        // const updatedTodo = {...todo, complete: !todo.complete};
        // return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div class="App-header">
      <h1>My To-Do List</h1>
      <form onSubmit={(e) => {handleNewTodoSubmit(e);}}>
        <input onChange={(e) => {setNewTodo(e.target.value)}} type="text" value={newTodo} />
        <div>
          <button>Add</button>
        </div>
      </form>

      {todos.map((todo, i) => {
        const todoClasses = [];

        if (todo.complete) {
          todoClasses.push("strike-through");
        }
        return(
          <div key={i}>
            <input onChange={(e) => {
              handleToggleComplete(i);
            }} checked={todo.complete} type ="checkbox"/>
            <span className={todoClasses.join(" ")}>{todo.text} </span>
            <button onClick={(e) => {handleTodoDelete(i);}}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
