import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: 'Recolectar la piedra del alma',
  //   done: false,
  // },
  // {
  //   id: new Date().getTime() * 3,
  //   description: 'Recolectar la piedra del poder',
  //   done: false,
  // },
];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init); //todoReducer importado desde afuera

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: 'Add Todo',
      payload: todo,
    };

    dispatchTodo(action);
  };

  const handleDeleteTodo = (todoId) => {
    const action = {
      type: 'Delete Todo',
      payload: todoId,
    };

    dispatchTodo(action);
  };

  const handleToggleTodo = (todoId) => {
    const action = {
      type: 'Toggle Todo',
      payload: todoId,
    };

    dispatchTodo(action);
  };

  const todoCount = todos.length;

  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todoCount,
    pendingTodosCount,
  };
};
