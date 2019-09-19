import { IUser } from './user.model';

export interface IChatHistoryMessage {
  userName: string;
  message: string;
  type: string;
}

export interface IPrivateChatHistoryMessage {
  userPair: { user1: IUser; user2: IUser };
  chatHistory: IChatHistoryMessage[];
}
