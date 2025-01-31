import { Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { TodosApiService } from "../services/todos-api.service";
import { TodosService } from "../services/todos.service";
import { Todo } from "../models/todos.model";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CreateEditTodoComponent } from "./create-edit-todo/create-edit-todo.component";
import { UsersService } from "../services/users.service";
import { User } from "../models/user.interface";
import { UsersApiService } from "../services/users-api.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  imports: [TodoCardComponent, NgFor, AsyncPipe]
})

export class TodosComponent {
  private usersApiService = inject(UsersApiService);
  private todosApiService = inject(TodosApiService);
  private todosService = inject(TodosService);
  private usersService = inject(UsersService);
  public readonly todos$ = this.todosService.todos$;
  public readonly users$ = this.usersService.users$;

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });

    if (!this.users$) {
      this.usersApiService.getUsers().subscribe((response: User[]) => {
        this.usersService.setUsers(response);
      });
    }
  }

  public onEditTodo(editedTodo: Todo) {
    this.todosService.editeTodo(editedTodo)
  }

  public onDeleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }

  private readonly dialog = inject(MatDialog)

  openDialog(): void {
      const dialogRef = this.dialog.open(CreateEditTodoComponent, {
        data: null
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.todosService.createTodo(result);
        }
      });
    }
}