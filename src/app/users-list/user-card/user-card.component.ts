import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../../models/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
})

export class UserCardComponent {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter<number>();  // Типизация события
  @Output() editUser = new EventEmitter<User>();  // Типизация события

  readonly dialog = inject(MatDialog);  // Инициализация MatDialog через inject

  // Обработчик для удаления пользователя
  public onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);  // Передача id пользователя для удаления
  }

  // Открытие диалога для редактирования пользователя
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editUser.emit(result);  // Эмитируем отредактированного пользователя
      }
    });
  }
}
