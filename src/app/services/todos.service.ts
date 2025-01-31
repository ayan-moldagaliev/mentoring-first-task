import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../models/todos.model";

@Injectable({providedIn: 'root'})

export class TodosService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public readonly todos$ = this.todosSubject.asObservable();

  public setTodos(todos: Todo[]) {
    this.todosSubject.next(todos);
  }

  public editeTodo(editedTodo: Todo) {
    this.todosSubject.next(
      this.todosSubject.value.map(todo => {
        return todo.id === editedTodo.id ? editedTodo : todo;
      })
    );
  }

  public createTodo(todo: Todo) {
    this.todosSubject.next(
      [...this.todosSubject.value, todo]
    );
  }

  public deleteTodo(id: number) {
    this.todosSubject.next(
      this.todosSubject.value.filter(
        item => id !== item.id
      )
    );
  }
}