import { Component, EventEmitter, Output, Input } from "@angular/core";
import { IUser } from "../model/user.model";
import {
  IChatHistoryMessage
} from "../model/chat.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent {
  title = "the most interesting chatbox on earth";
  subtitle = "~~~ only discuss interesting subjects ~~~";
  chatmessage = "";

  @Input() handler: any;
  @Input() user: IUser;
  @Input() chatHistory: IChatHistoryMessage[];
  @Output() onSignOut = new EventEmitter<boolean>();

  sendMessage = (message: string) => {
    this.handler.message({ user: this.user, message, type: "user" });
    this.chatmessage = "";
  };

  exitChatRoom = (user: IUser) => {
    this.handler.leave(user);
    this.onSignOut.emit(false);
  };

}
