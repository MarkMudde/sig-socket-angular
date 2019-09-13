import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandlerService } from './services/handler.service';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { PrivateChatComponent, PrivateChatPopUpComponent } from './chat/private-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    PrivateChatComponent,
    PrivateChatPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  entryComponents: [
    PrivateChatComponent,
    PrivateChatPopUpComponent
  ],
  providers: [
    HandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
