import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.interface";
import { LocalStorageJwtService } from "./local-storage";
import { UsersApiService } from "./users-api.service";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private localStorage = inject(LocalStorageJwtService);
  private usersApiService = inject(UsersApiService);
  private usersSubject = new BehaviorSubject<User[]>(this.getUsersFromStorage());
  public readonly users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadUsersIfEmpty();
  }

  private getUsersFromStorage(): User[] {
    const data = this.localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }

  private loadUsersIfEmpty(): void {
    if (this.usersSubject.value.length === 0) {
      this.usersApiService.getUsers().subscribe((users: User[]) => {
        this.setUsers(users);
      });
    }
  }

  public setUsers(users: User[]) {
    this.usersSubject.next(users);
    this.localStorage.setItem('users', JSON.stringify(users));
  }

  public editUser(editedUser: User) {
    const updatedUsers = this.usersSubject.value.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    this.setUsers(updatedUsers);
  }

  public createUser(user: User) {
    this.setUsers([...this.usersSubject.value, user]);
  }

  public deleteUser(id: number) {
    const updatedUsers = this.usersSubject.value.filter(user => user.id !== id);
    this.setUsers(updatedUsers);

    // Если всех пользователей удалили, загрузить заново с сервера
    if (updatedUsers.length === 0) {
      this.loadUsersIfEmpty();
    }
  }
}
