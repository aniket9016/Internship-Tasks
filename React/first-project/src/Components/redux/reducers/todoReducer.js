const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { title: action.payload.title, description: action.payload.description, completed: false }
      ];
    case "DELETE_TODO":
      return state.filter((_, index) => index !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map((task, index) =>
        index === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

export default todoReducer;
