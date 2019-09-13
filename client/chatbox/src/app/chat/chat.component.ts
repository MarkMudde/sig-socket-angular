import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HandlerService } from '../services/handler.service';
import { IUser } from '../model/user.model';
import { IChatHistoryMessage, IPrivateChatHistoryMessage } from '../model/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  title = 'the most interesting chatbox on earth';
  subtitle = '~~~ only discuss interesting subjects ~~~';
  chatHistory: IChatHistoryMessage[] = [];
  privateChatHistory: IPrivateChatHistoryMessage[] =[];
  user: IUser;
  connectedUsers: IUser[];

  chatmessage = '';
  isSignedIn: boolean;
  openPopUp = false;
  selectedUser: IUser;

  @Output() onSignOut = new EventEmitter<boolean>();

  constructor(private handlerService: HandlerService) {  }

  ngOnInit() {
    this.handlerService.updateUser(this.updateUser);
    this.handlerService.updateUsers(this.updateUsers);
    this.handlerService.onMessage(this.updateChatHistory);
    this.handlerService.onEnter(this.updateChatHistory);
    this.handlerService.onLeave(this.updateChatHistory);
    this.handlerService.onPrivateMessage(this.updatePrivateChatHistory)
    this.isSignedIn = true;
   }

   exitChatRoom(user: IUser) {
    this.handlerService.userLeft(user);
    this.isSignedIn = false;
    this.onSignOut.emit();
  }

   sendMessage(message: string) {
    this.handlerService.message({user: this.user, message, type: 'user'});
    this.chatmessage = '';
   }

  updateUser = (user: IUser) => {
    this.user = user;
   }

   updateUsers = (users: IUser[]) => {
     this.connectedUsers = users;
   }

   updateChatHistory = (chatMessage: IChatHistoryMessage) => {
     this.chatHistory.push(chatMessage);
   }

   updatePrivateChatHistory = (chatMessage: IPrivateChatHistoryMessage) => {
     this.privateChatHistory.push(chatMessage);
   }

   // deze private chat is nog niet helemaal gelukt...

   openPrivateChat(selUser: IUser) {
    this.selectedUser = selUser;
    this.openPopUp = !this.openPopUp;
    console.log(selUser);
    console.log(this.openPopUp);
    if (this.openPopUp) {
      const popup = document.getElementById('privatechat');
      console.log(popup);
      popup.style.display = 'block';
    }
   }
}
