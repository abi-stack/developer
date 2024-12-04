import { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './Todo.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    // No need for separate activeTodos, directly filter in the rendering
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const visibleTodos = showActive ? todos.filter(todo => !todo.completed) : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <footer>
        {todos.filter(todo => !todo.completed).length} todos left
      </footer>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleAddClick = () => {
    if (text.trim()) {
      onAdd(createTodo(text));
      setText('');
    }
  };

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
