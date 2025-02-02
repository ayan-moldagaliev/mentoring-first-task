import { Todo } from "./models/todos.model";
import { User } from "./models/user.interface";

export interface UserState {
  users: User[],
};

export interface TodoState {
  todos: Todo[],
}

export interface AppState {
  users: UserState,
  todos: TodoState,
};