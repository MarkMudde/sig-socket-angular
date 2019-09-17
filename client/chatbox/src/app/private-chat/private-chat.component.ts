import { Component, OnInit, Input } from '@angular/core';
import { IPrivateChatHistoryMessage } from '../model/chat.model';
import { IUser } from '../model/user.model';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  @Input() privateChatHistory: IPrivateChatHistoryMessage[] = [];
  @Input() user: IUser;
  @Input() selectedUser: IUser;
  @Input() handler: any;

  constructor() { }

  ngOnInit() {
  }

}
