import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../src/components/TodoList';

test('renders todo list title', () => {
  render(<TodoList />);
  const titleElement = screen.getByText(/todo list/i);
  expect(titleElement).toBeInTheDocument();
});

test('add todo', () => {
  render(<TodoList />);
  const inputElement = screen.getByPlaceholderText(/enter todo/i);
  const addButton = screen.getByText(/add todo/i);

  fireEvent.change(inputElement, { target: { value: 'Test 1 todo' } });
  fireEvent.click(addButton);

  const addedTodoElement = screen.getByText(/test 1 todo/i);
  expect(addedTodoElement).toBeInTheDocument();
});

test('toggle todo', () => {
  render(<TodoList />);
  const inputElement = screen.getByPlaceholderText(/enter todo/i);
  const addButton = screen.getByText(/add todo/i);

  fireEvent.change(inputElement, { target: { value: 'Test 2 todo' } });
  fireEvent.click(addButton);

  const checkboxElement = screen.getByText(/test 2 todo/i).previousSibling;
  fireEvent.click(checkboxElement);

  expect(checkboxElement).toBeChecked();
});

test('delete todo', () => {
  render(<TodoList />);
  const inputElement = screen.getByPlaceholderText(/enter todo/i);
  const addButton = screen.getByText(/add todo/i);

  fireEvent.change(inputElement, { target: { value: 'Test 3 todo' } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByText(/test 3 todo/i).nextSibling;
  fireEvent.click(deleteButton);

  const deletedTodoElement = screen.queryByText(/test 3 todo/i);
  expect(deletedTodoElement).toBeNull();
});