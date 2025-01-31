import { Component, inject, OnInit } from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { NgFor, AsyncPipe } from "@angular/common";
import { UsersService } from "../services/users.service";
import { User } from "../models/user.interface";
import { UsersApiService } from "../services/users-api.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "./create-edit-user/create-edit-user.component";
import { LocalStorageJwtService } from "../services/local-storage";
import { Observable } from "rxjs";

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [UserCardComponent, NgFor, AsyncPipe]
})
export class UsersListsComponent implements OnInit {
  private usersApiService = inject(UsersApiService);
  private usersService = inject(UsersService);
  private localStorage = inject(LocalStorageJwtService);
  private dialog = inject(MatDialog);

  public users$: Observable<User[]> = this.usersService.users$;

  ngOnInit(): void {
    const storedUsers = this.localStorage.getItem("users");
    if (!storedUsers) {
      this.usersApiService.getUsers().subscribe((response: User[]) => {
        this.usersService.setUsers(response);
      });
    } else {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          this.usersService.setUsers(parsedUsers);
        }
      } catch (error) {
        console.error("Error parsing users from localStorage", error);
      }
    }
  }

  public onEditUser(editedUser: User) {
    this.usersService.editUser(editedUser);
  }

  public onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, { data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.createUser(result);
      }
    });
  }
}
