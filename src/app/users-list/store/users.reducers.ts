import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./users.actions";
import { User } from "../../models/user.interface";

const initialState: {users: User[]} = {
  users: [],
};

export const userReducers = createReducer(
  initialState,
  on(UserActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UserActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) => {
      return user.id === payload.user.id ?
      payload.user :
      user
    }),
  })),
  on(UserActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UserActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter(user => user.id !== payload.id),
  })),
);
