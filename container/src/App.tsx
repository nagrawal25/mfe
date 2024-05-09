import React from 'react';
const TodoList = React.lazy(() => import('todo_list_mfe/TodoList'));

const App: React.FC = () => {

  return (
    <div>
      <h1>Container</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </React.Suspense>
    </div>
  );
};

export default App;