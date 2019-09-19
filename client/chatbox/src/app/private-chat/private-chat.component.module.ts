import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalComponent, PrivateChatComponent } from './private-chat.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalComponent, PrivateChatComponent],
  exports: [NgbdModalComponent],
  bootstrap: [NgbdModalComponent],
  entryComponents: [PrivateChatComponent]
})
export class NgbdModalComponentModule { }
