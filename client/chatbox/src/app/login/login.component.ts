import { Component, Output, EventEmitter } from '@angular/core';
import { HandlerService } from '../services/handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSignedIn: boolean;
  @Output() onSignIn = new EventEmitter<boolean>();

  constructor(private handlerService: HandlerService) { }

  enterChatRoom(username: string) {
    if (username) {
      this.handlerService.userConnected(username);
      this.isSignedIn = true;
      this.onSignIn.emit();
    }
  }

}
