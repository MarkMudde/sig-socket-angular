import { Component, OnInit } from '@angular/core';
import { HandlerService } from './services/handler.service';
import { IChatHistoryMessage } from './model/chat.model';
import { IUser } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isSignedIn: boolean;
  user: IUser;
  connectedUsers: IUser[];
  chatHistory: IChatHistoryMessage[] = [];
  chatmessage = '';
  handler;

  constructor(private handlerService: HandlerService) {
    this.handler = handlerService.handler(this.updateChat());
  }

  ngOnInit() {
    this.isSignedIn = false;
  }

  updateChat() {
    console.log("updateChat")
    function exitChatRoom(user: IUser) {
      this.handler.userLeft(user);
      this.isSignedIn = false;
      this.onSignOut.emit();
    }

    const sendMessage = (message: string) => {
      console.log("sendMessage")
      this.handler.message({ user: this.user, message, type: 'user' });
      this.chatmessage = '';
    }

    const updateUser = (user: IUser) => {
      this.user = user;
    };

    const updateUsers = (users: IUser[]) => {
      this.connectedUsers = users;
    };

    const updateChatHistory = (chatMessage: IChatHistoryMessage) => {
      this.chatHistory.push(chatMessage);
    };

    // const updatePrivateChatHistory = (chatMessage: IPrivateChatHistoryMessage) => {
    //   this.privateChatHistory.push(chatMessage);
    // };

    return {
      exitChatRoom,
      sendMessage,
      updateUser,
      updateUsers,
      updateChatHistory
    };
  }

  setIsSignedIn() {
    this.isSignedIn = true;
  }

}
