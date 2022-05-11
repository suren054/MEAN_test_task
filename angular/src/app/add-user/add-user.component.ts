import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() item:any={};
  @Output() closeNewUserModal=new EventEmitter()
  @Output() newItemEvent = new EventEmitter<any>()
  
    constructor() { }
  
    ngOnInit(): void {}
    public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    public namePattern="[a-zA-Z][a-zA-Z ]+"
    
  
    public form:FormGroup=new FormGroup({
      firstname:new FormControl('',[Validators.required, Validators.pattern(this.namePattern)] ),
      lastname:new FormControl('',[Validators.required, Validators.pattern(this.namePattern)]),
      email:new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      role:new FormControl('',Validators.required)
    })
  
    get firstname(){
      return this.form.get('firstname')
    }
  
    get lastname(){
      return this.form.get('lastname')
    }
    
    get email(){
      return this.form.get('email')
    }
  
    get role(){
      return this.form.get('role')
    }
  
    closeModal(){
      this.item.showAddUser=false;
       this.closeNewUserModal.emit(this.item.showAddUser)
      
    }
  
   
  submit(){
    this.item.showAddUser=false;
    this.newItemEvent.emit(this.form.value)
    this.closeNewUserModal.emit(this.item.showAddUser)
  }
}
