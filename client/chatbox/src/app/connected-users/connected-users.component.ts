import { Component, OnInit } from '@angular/core';
import { IUser } from './../model/user.model';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {

  connectedUsers: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
