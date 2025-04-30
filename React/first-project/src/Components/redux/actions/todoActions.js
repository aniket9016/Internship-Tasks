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
