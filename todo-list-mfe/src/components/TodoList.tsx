import React, { useState, useEffect } from 'react';
import { Todo } from '../utils/types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        description: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'active') {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div style={{ 'width': '80%', 'margin': 'auto' }}>
      <h2>Add Todo</h2>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter todo"
        style={{ 'width': '20em' }}
      />
      <button onClick={addTodo} style={{ 'marginLeft': '1em' }}>Add Todo</button>
      <div style={{ 'marginTop': '1em' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')} style={{ 'marginLeft': '1em' }}>Active</button>
        <button onClick={() => setFilter('completed')} style={{ 'marginLeft': '1em' }}>Completed</button>
      </div>

      <div style={{ 'marginTop': '1em' }}>{filteredTodos.length < 1 && (<div>Nothing to display.</div>)}</div>
      <ul style={{ 'listStyle': 'none', 'marginTop': '1em', 'padding': '0' }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.description}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ 'marginLeft': '1em' }}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;