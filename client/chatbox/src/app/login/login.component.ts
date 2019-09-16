import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignedIn: boolean;
  @Input() handler: () => any;
  @Output() onSignIn = new EventEmitter<boolean>();

  constructor() {
  }

  enterChatRoom(username: string) {
    if (username) {
      // this..userConnected(username);
      this.isSignedIn = true;
      this.onSignIn.emit();
    }
  }

}
