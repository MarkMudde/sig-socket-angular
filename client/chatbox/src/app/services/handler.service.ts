import { Injectable } from '@angular/core';
import Socketio from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  private socket = Socketio.connect('ws://localhost:3100');

  // Listeners
  public onMessage(updateChatHistory) {
    this.socket.on('message', payload => {
      updateChatHistory(payload);
    });
  }

  public onPrivateMessage(updatePrivateChatHistory) {
    this.socket.on('privateChatMessage', payload => {
      updatePrivateChatHistory(payload);
    });
  }

  public updateUser(updateUser) {
    this.socket.on('updateUser', user => {
      updateUser(user);
    });
  }
  public updateUsers(updateUsers) {
  this.socket.on('updateUsers', connectedUsers => {
    updateUsers(connectedUsers);
  });
}

  public onEnter(updateChatHistory) {
    this.socket.on('enter', user => {
      updateChatHistory({user, message: ' has entered this chatroom', type: 'bot'});
    });
  }

  public onLeave(updateChatHistory) {
    this.socket.on('leave', user => {
      updateChatHistory({user, message: ' has left the building', type: 'bot'});
    });
  }

  public userConnected = (username) => {
    this.socket.emit('enter', username);
  }

  public userLeft = (user) => {
    this.socket.emit('leave', user);
  }

  public message = (payload) => {
      this.socket.emit('message', payload);
  }

  public privateMessage = (payload) => {
    this.socket.emit('privateMessage', payload);
}

}
