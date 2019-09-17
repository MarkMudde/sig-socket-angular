import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from './../model/user.model';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {

  @Input() handler: any;
  @Input() user: IUser;
  @Input() connectedUsers: IUser[];
  @Output() privateChat = new EventEmitter<boolean>();

  @Output() selectedUser: IUser;

  constructor() { }

  ngOnInit() {
  }

  openPrivateChat = (selectedUser: IUser) => {
    this.selectedUser = selectedUser;
    this.privateChat.emit(true);
  }

}
