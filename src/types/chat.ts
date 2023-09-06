import { TUser } from "./auth";
export interface IChatMessage {
  messageId?: string;
  chatRoomId: string;
  senderId: number;
  recipientId: number;
  message: string;
  isRead: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export interface IOrganizedChatMessage extends IChatMessage {
  isPrimaryMessage: boolean;
  currentUserIsSender: boolean;
  showDay: boolean;
  showTime: boolean;
  userImageUrl: string | null;
  firstName: string;
  lastName: string;
}

export type TChat = {
  chatRecipientList: TUser[];
  currentRecipient: TUser;
  messageList: IChatMessage[];
};

export type TChatState = {
  chat: TChat;
};

export type TRecipientListPayload = {
  chatRecipientList: TUser[];
};

export type TCurrentRecipientPayload = {
  currentRecipient: TUser;
};

export type TMessageListPayload = {
  messageList: IChatMessage[];
};

export type TMessagePayload = {
  message: IChatMessage;
};
