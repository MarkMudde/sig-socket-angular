import { Component, OnInit, Input } from "@angular/core";
import { HandlerService } from "./services/handler.service";
import { IChatHistoryMessage, IPrivateChatHistoryMessage } from "./model/chat.model";
import { IUser } from "./model/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isSignedIn: boolean;
  privateChatIsOpen: boolean;
  user: IUser;
  connectedUsers: IUser[];
  chatHistory: IChatHistoryMessage[] = [];
  privateChatHistory: IPrivateChatHistoryMessage[] = [];
  handler: any;
  selectedUser: IUser;

  constructor(private handlerService: HandlerService) {
    this.handler = this.handlerService.handler(this.updateChat());
  }

  ngOnInit() {
    this.isSignedIn = false;
    this.privateChatIsOpen = false;
  }

  updateChat() {
    const updateUser = (user: IUser) => {
      this.user = user;
    };

    const updateUsers = (users: IUser[]) => {
      this.connectedUsers = users;
    };

    const updateHistory = (chatMessage: IChatHistoryMessage) => {
      this.chatHistory.push(chatMessage);
    };

    const updatePrivateChatHistory = (chatMessage: IPrivateChatHistoryMessage) => {
      this.privateChatHistory.push(chatMessage);
    };

    return {
      updateUser,
      updateUsers,
      updateHistory,
      updatePrivateChatHistory
    };
  }

  setSignedIn(signedIn: boolean) {
    this.isSignedIn = signedIn;
  }

  initPrivateChat(selectedUser: IUser) {
    this.privateChatIsOpen = true;
    this.selectedUser = selectedUser;
    console.log(this.selectedUser.name);
  }
}
