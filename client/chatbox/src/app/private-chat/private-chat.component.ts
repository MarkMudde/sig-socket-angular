import { Component, OnInit, Input } from "@angular/core";
import { IPrivateChatHistoryMessage } from "../model/chat.model";
import { IUser } from "../model/user.model";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-private-chat",
  templateUrl: "./private-chat.component.html",
  styleUrls: ["./private-chat.component.css"]
})
export class PrivateChatComponent implements OnInit {
  @Input() privateChatHistory: IPrivateChatHistoryMessage[] = [];
  @Input() user: IUser;
  @Input() selectedUser: IUser;
  @Input() handler: any;

  chatmessage = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  sendMessage = (message: string) => {
    this.handler.privateMessage({ userPair: { user1: this.user, user2: this.selectedUser }, message, type: "user" });
    this.chatmessage = "";
  };

}

@Component({
  selector: 'ngbd-modal-component',
  template: `<div></div>
  `
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(PrivateChatComponent);
    modalRef.componentInstance.name = 'World';
  }
}
