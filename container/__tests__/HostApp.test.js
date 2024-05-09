import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock the TodoList component
// const TodoList = React.lazy(() => import('todo_list_mfe/TodoList'));
jest.mock(React.lazy(() => import('todo_list_mfe/TodoList')), () => {
  return () => {
    throw new Promise(() => {});
  };
});

describe('Host Application Integration Test', () => {
  test('renders host container title', () => {
    render(<App />);
    const titleElement = screen.getByText(/host container/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays loading indicator', () => {
    render(<App />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders todo list from MFE after loading', async () => {
    render(<App />);
    await waitFor(() => {
      const todoListTitleElement = screen.getByText(/todo list/i);
      expect(todoListTitleElement).toBeInTheDocument();
    });
  });

  // Additional integration tests can be added here as needed
});