import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public user: any;
  @Input() item: any;
  @Output() closeEditModal = new EventEmitter();
  @Output()  newItemEvent = new EventEmitter<any>()
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.form.setValue( {firstname: this.item?.user.firstname,lastname: this.item?.user.lastname,email: this.item?.user.email,role: this.item?.user.role,id:this.item?.user._id})
  }

  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  public namePattern = '[a-zA-Z][a-zA-Z ]+';

  public form: FormGroup = new FormGroup({
    id:new FormControl(''),
    firstname: new FormControl( '' , Validators.required),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern(this.namePattern),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    role: new FormControl('', Validators.required),
  });

  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get role() {
    return this.form.get('role');
  }

  closeModal() {
    this.item.bool = false;
    this.closeEditModal.emit(this.item.bool);
  }

  saveChanges() {
    this.item.bool = false;
    this.newItemEvent.emit(this.form.value)
    this.closeEditModal.emit(this.item.bool);
  }
}
