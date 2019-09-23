import { Component, OnInit } from "@angular/core";
import { HandlerService } from "./services/handler.service";
import {
  IChatHistoryMessage,
  IPrivateChatHistoryMessage
} from "./model/chat.model";
import { IUser } from "./model/user.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrivateChatComponent } from "./private-chat/private-chat.component";

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
  selectedUser: IUser;
  chatHistory: IChatHistoryMessage[] = [];
  privateChatHistory: IPrivateChatHistoryMessage[] = [];
  currentPrivateChat: IChatHistoryMessage[] = [];
  handler: any;

  constructor(
    private handlerService: HandlerService,
    private modalService: NgbModal
  ) {
    this.handler = this.handlerService.handler(this.updateChat());
  }

  ngOnInit() {
    this.isSignedIn = false;
    this.privateChatIsOpen = false;
  }

  getIndexPrivateChat = (user1: IUser, user2: IUser) => {
    if (!user1 || !user2) {
      return -1;
    }
    return this.privateChatHistory.findIndex(
      c =>
        (c.userPair.user1.id === user1.id ||
          c.userPair.user1.id === user2.id) &&
        (c.userPair.user2.id === user2.id || c.userPair.user2.id === user1.id)
    );
  };

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

    const updatePrivateHistory = (payload: any) => {
      const user1 = payload.userPair.user1;
      const user2 = payload.userPair.user2;
      const i = this.getIndexPrivateChat(user1, user2);
      const privPairChat = this.privateChatHistory[i];

      if (i === -1) {
        // Create userpair with chathistory
        const initPrivChat = {
          userPair: { user1, user2 },
          chatHistory: [
            {
              userName: payload.userName,
              message: payload.message,
              type: "user"
            }
          ]
        };

        this.privateChatHistory.push(initPrivChat);
      } else {
        // Add message to chathistory from existing userpair
        privPairChat.chatHistory.push({
          userName: payload.userName,
          message: payload.message,
          type: "user"
        });

        const newHist = [...this.privateChatHistory];
        newHist[i] = { ...privPairChat };
        this.privateChatHistory = newHist;
      }
      if (
        !!this.selectedUser &&
        (user1.id === this.selectedUser.id || user2.id === this.selectedUser.id)
      ) {
        this.currentPrivateChat.push({
          userName: payload.userName,
          message: payload.message,
          type: "user"
        });
      }
    };

    return {
      updateUser,
      updateUsers,
      updateHistory,
      updatePrivateHistory
    };
  }

  setSignedIn = (signedIn: boolean) => {
    this.isSignedIn = signedIn;
  };

  getSelectedUser = (user: IUser) => {
    this.selectedUser = user;
    this.getPrivateChat(this.getIndexPrivateChat(this.user, user));
  };

  getIsPrivateChatOpen(isOpen: boolean) {
    this.privateChatIsOpen = isOpen;
    if (isOpen) {
      this.open();
    }
  }

  getPrivateChat = (privateChatIndex: number) => {
    if (privateChatIndex > -1) {
      this.currentPrivateChat = [
        ...this.privateChatHistory[privateChatIndex].chatHistory
      ];
    }
  };

  open = () => {
    const modalRef = this.modalService.open(PrivateChatComponent);
    modalRef.componentInstance.handler = this.handler;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.selectedUser = this.selectedUser;
    modalRef.componentInstance.privateChatHistory = this.currentPrivateChat;
  };
}
