import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../models/todos.model";
import { TodosActions } from "./todos.actions";

const initialState: {todos: Todo[]} = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),
  on(TodosActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo) => {
      return todo.id === payload.todo.id ?
      payload.todo :
      todo
    }),
  })),
  on(TodosActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodosActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payload.id),
  })),
)