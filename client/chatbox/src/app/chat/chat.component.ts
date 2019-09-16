import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HandlerService } from '../services/handler.service';
import { IUser } from '../model/user.model';
import { IChatHistoryMessage, IPrivateChatHistoryMessage } from '../model/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() handler: () => any;

  title = 'the most interesting chatbox on earth';
  subtitle = '~~~ only discuss interesting subjects ~~~';
  privateChatHistory: IPrivateChatHistoryMessage[] = [];
  isSignedIn: boolean;
  openPopUp = false;
  selectedUser: IUser;

  // @Output() onSignOut = new EventEmitter<boolean>();

  ngOnInit() {
    this.isSignedIn = true;
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
