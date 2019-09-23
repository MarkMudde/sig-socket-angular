import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { IChatHistoryMessage } from "../model/chat.model";
import { IUser } from "../model/user.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-private-chat",
  templateUrl: "./private-chat.component.html",
  styleUrls: ["./private-chat.component.css"]
})
export class PrivateChatComponent {
  @Input() privateChatHistory: IChatHistoryMessage[] = [];
  @Input() user: IUser;
  @Input() selectedUser: IUser;
  @Input() handler: any;
  chatmessage = "";

  constructor(public activeModal: NgbActiveModal) {}

  sendMessage = (message: string) => {
    this.handler.privateMessage({
      userPair: { user1: this.user, user2: this.selectedUser },
      message,
      user: this.user,
      type: "user"
    });
    this.chatmessage = "";
  };
}
