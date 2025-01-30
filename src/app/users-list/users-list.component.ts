import { Component, inject, OnInit } from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { UsersService } from "../services/users.service";
import { User } from "../models/user.interface";
import { UsersApiService } from "../services/users-api.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [UserCardComponent, NgFor, AsyncPipe]
})

export class UsersListsComponent {
  private usersApiService = inject(UsersApiService);
  private usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  public onEditUser(editedUser: User) {
    this.usersService.editeUser(editedUser)
  }

  public onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  public onCreateUser(createdUser: User) {
    this.usersService.createUser(createdUser);
  }

  private readonly dialog = inject(MatDialog)

  openDialog(): void {
      const dialogRef = this.dialog.open(CreateEditUserComponent, {
        data: null
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.usersService.createUser(result);
      });
    }
}