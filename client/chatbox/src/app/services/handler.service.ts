import { Injectable } from "@angular/core";
import Socketio from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class HandlerService {
  public handler = updateChat => {
    const socket = Socketio.connect("http://localhost:3100");

    // listeners - incoming events
    socket.on("error", function(err: any) {
      console.log("Error:", err);
    });

    socket.on("message", function(payload) {
      updateChat.updateHistory(payload);
    });

    socket.on("privateMessage", function(payload) {
      updateChat.updatePrivateHistory(payload);
    });

    socket.on("leave", function(user) {
      updateChat.updateHistory({
        user,
        message: "has left chat",
        type: "bot"
      });
    });

    socket.on("enter", function(user) {
      updateChat.updateHistory({
        user,
        message: "has entered chat",
        type: "bot"
      });
    });

    socket.on("updateUser", function(user) {
      updateChat.updateUser(user);
    });
    socket.on("updateUsers", function(connectedUsers) {
      updateChat.updateUsers(connectedUsers);
    });

    // outgoing events
    const message = payload => {
      socket.emit("message", payload);
    };

    const privateMessage = payload => {
      socket.emit("privateMessage", payload);
    };

    const leave = userName => {
      socket.emit("leave", userName);
    };

    const enter = userName => {
      socket.emit("enter", userName);
    };

    return {
      message,
      privateMessage,
      enter,
      leave
    };
  };
}
