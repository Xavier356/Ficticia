import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  p: number = 1;
  users: User[] = [];
  constructor(private UserService: UserService) {}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(): void {
    this.UserService.getUsers()
    .subscribe(users => this.users = users);
  }

}
