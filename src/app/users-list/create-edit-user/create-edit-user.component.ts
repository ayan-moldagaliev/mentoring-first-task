import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../../models/user.interface";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogClose]
})

export class CreateEditUserComponent {
  public readonly data = inject(MAT_DIALOG_DATA)

  form = new FormGroup({
    name: new FormControl(this.data?.name || '', [Validators.required, Validators.minLength(4)]),
        username: new FormControl(this.data?.username ||'', [Validators.required, Validators.minLength(4)]),
        email: new FormControl(this.data?.email || '', [Validators.required, Validators.email, Validators.minLength(4)]),
        companyName: new FormControl(this.data?.company.name || '', [Validators.required, Validators.minLength(4)]),
  })

  get formWithFields(): User {
    return {
      id: this.data?.id || new Date().getTime(),
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      address: {
        street: this.data?.address.street  || "",
        suite: this.data?.address.suite || "",
        city: this.data?.address.city || "",
        zipcode: this.data?.address.zipcode || "",
        geo: {
          lat: this.data?.address.geo.lat || "",
          lng: this.data?.address.geo.lng || ""
        }
      },
      phone: this.data?.phone || "",
      website: this.data?.website || "",
      company: {
        name: this.form.value.companyName,
        catchPhrase: this.data?.company.catchPhrase || "",
        bs: this.data?.company.bs || ""
      }
    }
  }
}