export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};
export const addTodo = (task) => ({
  type: "ADD_TODO",
  payload: task,
});

export const deleteTodo = (index) => ({
  type: "DELETE_TODO",
  payload: index,
});

export const toggleComplete = (index) => ({
  type: "TOGGLE_COMPLETE",
  payload: index,
});
