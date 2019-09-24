import Koa from "koa";
import Http from "http";
import Socketio from "socket.io";
import { IUser } from "./user.model";

const app = new Koa();
const server = Http.createServer(app.callback());
const io = Socketio(server);

const connectedUsers: IUser[] = [];

const addUser = user => {
  connectedUsers.push(user);
};

const removeUser = id => {
  const userIndex = connectedUsers.findIndex(user => user.id === id);
  connectedUsers.splice(userIndex, 1);
};

io.on("connection", function(client) {
  client.on("message", function(payload) {
    io.emit("message", payload);
  });

  client.on("privateMessage", function(payload) {
    const user1 = payload.userPair.user1;
    const user2 = payload.userPair.user2;

    // Emit the message only to the 2 involved recipients
    io.to(user1.id)
      .to(user2.id)
      .emit("privateMessage", {
        userPair: { user1, user2 },
        userName: payload.user.name,
        message: payload.message,
        type: "user"
      });
  });

  client.on("enter", function(userName) {
    const newUser: IUser = { id: client.id, name: userName };
    addUser(newUser);
    io.to(client.id).emit("updateUser", newUser);
    io.emit("updateUsers", connectedUsers);
    io.emit("enter", newUser);
  });

  client.on("leave", function(user) {
    removeUser(client.id);
    io.emit("updateUsers", connectedUsers);
    io.emit("leave", user);
  });

  client.on("disconnect", function() {
    const user = connectedUsers.find(user => user.id === client.id);
    if (!!user) {
      removeUser(client.id);
      io.emit("leave", user);
      io.emit("updateUsers", connectedUsers);
    }
  });

  client.on("error", function(err) {
    console.log(`Client with id ${client.id} threw error ${err}`);
    io.emit("error", err);
  });
});

server.listen(3100);

console.log("Server running on port 3100");
