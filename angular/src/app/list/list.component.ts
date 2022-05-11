import { Component, OnInit } from '@angular/core';
import { User } from '../models/users.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
public users:Array<User>=[];
public bool:boolean=false;
public showAddUser:boolean=false;
public filter:string=''
public search:string=''
public art_manager: boolean = false

public user:object={};
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data)=>{
      this.users=data
      data.forEach((e:any) =>{
        if(e.art_manager === true){
            this.art_manager = true
        }
      })
      

    })
  }
  deleteUser(id:string){
    this.users=this.users.filter((e:any)=>e._id!==id)
    this.userService.deleteUser(id).subscribe((data)=>{
      console.log(data)
    })
  }
  
  editUser(user:object){
  this.bool=true
  this.user=user
  }
  
  close(event:any){
   this.bool=event
  }
  onShowAddUser(){
    this.showAddUser=true
  }
  closeAddUser(event:any){
    this.showAddUser=event
   }
  
   selectRole(event:any){
     this.filter=event.target.value
     this.userService.filterByRole(this.filter).subscribe((data)=>{
       this.users=data
     })
   }

   inputSearch(event:any){
    this.search=event.target.value
    this.userService.inputSearch(this.search).subscribe((data)=>{
     this.users=data
    })
   }
   addUser(event:any){
      this.userService.addUser(event).subscribe((newUser:any)=>{
       this.users = [...this.users,newUser] 
       if(event.role === "Art Manager"){
         this.art_manager = true
       }
      })
   }

   updateUser(e:User){
    this.userService.editUser(e).subscribe((data)=>{
        this.users = data
        if(e.role === "Art Manager"){
          this.art_manager = true
        }
          })
   }
}
