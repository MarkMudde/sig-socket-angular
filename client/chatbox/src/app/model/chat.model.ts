import { IUser } from './user.model';

export interface IChatHistoryMessage {
  user: IUser;
  message: string;
  type: string;
}

export interface IPrivateChatHistoryMessage {
  userPair: { user1: IUser; user2: IUser };
  chatHistoryMessage: IChatHistoryMessage;
}
