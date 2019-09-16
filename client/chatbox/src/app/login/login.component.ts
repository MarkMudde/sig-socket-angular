import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  @Input() handler: any;
  @Output() onSignIn = new EventEmitter<boolean>();

  constructor() {}

  enterChatRoom(username: string) {
    if (username) {
      this.handler.enter(username);
      this.onSignIn.emit(true);
    }
  }
}
