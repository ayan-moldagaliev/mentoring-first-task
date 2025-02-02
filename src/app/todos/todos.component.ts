import { Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { TodosApiService } from "../services/todos-api.service";
import { Todo } from "../models/todos.model";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CreateEditTodoComponent } from "./create-edit-todo/create-edit-todo.component";
import { Store } from "@ngrx/store";
import { selectTodos } from "./store/todos.selectors";
import { tap } from "rxjs";
import { TodosActions } from "./store/todos.actions";

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  imports: [TodoCardComponent, NgFor, AsyncPipe]
})

export class TodosComponent {
  private todosApiService = inject(TodosApiService);
  private store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos).pipe(
    tap((todos) => {
      if (!todos.length) {
        this.todosApiService.getTodos().subscribe((response: Todo[]) => {
          this.store.dispatch(TodosActions.set({todos: response}));
        });
      }
    })
  );

  public onEditTodo(editedTodo: Todo) {
    this.store.dispatch(TodosActions.edit({todo: editedTodo}));
  }

  public onDeleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({id: id}));
  }

  private readonly dialog = inject(MatDialog)

  openDialog(): void {
      const dialogRef = this.dialog.open(CreateEditTodoComponent, {
        data: null
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(TodosActions.create({todo: result}));
        }
      });
    }
}