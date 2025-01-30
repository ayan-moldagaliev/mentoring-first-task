import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({providedIn: 'root'})

export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  public setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  public editeUser(editedUser: User) {
    this.usersSubject.next(
      this.usersSubject.value.map(user => {
        return user.id === editedUser.id ? editedUser : user;
      })
    );
  }

  public createUser(user: User) {
    this.usersSubject.next(
      [...this.usersSubject.value, user]
    );
  }

  public deleteUser(id: number) {
    this.usersSubject.next(
      this.usersSubject.value.filter(
        item => id !== item.id
      )
    );
  }
}