

import React, { useState } from 'react';
import { createRoot } from "react-dom/client";


//variable declaration
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// to render pt1
const container = document.body;
const root = createRoot(container);


//todo component
const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [checked, setChecked] = useState(false); 

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        text: newTodo,
        completed: false
      };
      console.log("this is newtodo", newTodo)
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
            <img onClick={() => deleteTodo(todo.id)} alt="delete icon" src="/media/bin-icon.svg" />
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
};



// App is the component
root.render(<Todos/>);
