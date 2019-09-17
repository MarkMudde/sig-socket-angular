import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IUser } from "./../model/user.model";

@Component({
  selector: "app-connected-users",
  templateUrl: "./connected-users.component.html",
  styleUrls: ["./connected-users.component.css"]
})
export class ConnectedUsersComponent implements OnInit {
  @Input() handler: any;
  @Input() user: IUser;
  @Input() connectedUsers: IUser[];
  @Output() updateSelectedUser = new EventEmitter<IUser>();
  @Output() updateIsPrivateChatOpen = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  openPrivateChat = (selectedUser: IUser) => {
    this.updateSelectedUser.emit(selectedUser);
    this.updateIsPrivateChatOpen.emit(true);
  };
}
