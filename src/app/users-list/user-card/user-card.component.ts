import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../../models/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
})

export class UserCardComponent {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();

  public onDeleteUser(id: number) {
    this.deleteUser.emit(id);
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editUser.emit(result)
      }
    });
  }
}