import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandlerService } from './services/handler.service';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { NgbdModalComponentModule } from './modal/modal-component.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    ConnectedUsersComponent,
    PrivateChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbdModalComponentModule
  ],
  providers: [
    HandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
