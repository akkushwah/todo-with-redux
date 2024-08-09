import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [{
    id: 4512247,
    title: "Update Resume",
    detail: "Add recent projects and new skills learned in the last few months. Ensure that the formatting is clean and the content is concise.",
    status: true,
    date: '20 aug 2024'
  },
  {
    id: 45125,
    title: "Finish React Project",
    detail: "Complete the remaining tasks on the dashboard component, including data fetching, state management, and styling. Ensure to review the code for any bugs",
    status: true,
    date: '20 aug 12'
  }
  ]
}

const TodoSlice = createSlice({
  name: 'Todo',
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action) => {
      console.log(action.payload)
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    updateTodo: (state, action) => {
      const { id, title, detail, status, date } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      existingTodo.title = title;
      existingTodo.detail = detail;
      existingTodo.status = status;
      existingTodo.date = date;
    },

    changeStatus: (state, action) => {
      const existingTodo = state.todos.find(todo => todo.id === action.payload.id)
      if (existingTodo) {
        existingTodo.status = action.payload.status;
      }
    }
  }
});

export const { addTodo, deleteTodo, updateTodo, changeStatus } = TodoSlice.actions;
export default TodoSlice.reducer;