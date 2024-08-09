import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [{
    id: 4512247,
    title: "Do your work",
    detail: "lorem ipsum lorem ipsum",
    status: true,
    date: '20 aug 2024'
  },
  {
    id: 45125,
    title: "Complete your work",
    detail: "lorem ipsum lorem ipsum",
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