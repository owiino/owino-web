import { TUser } from "./auth";
export interface IChatMessage {
  messageId?: number;
  chatRoomId: string;
  senderId: number;
  recipientId: number;
  message: string;
  isRead: boolean;
  isDelivered: boolean;
  subscriptionRequired?: boolean;
  createdAt: string;
  type?: string;
}

export interface IOrganizedChatMessage extends IChatMessage {
  isPrimaryMessage: boolean;
  currentUserIsSender: boolean;
  showDay: boolean;
  showTime: boolean;
  userImageUrl: string | null;
  username: string;
}

export type TChat = {
  chatRecipientList: TUser[];
  currentRecipient: TUser;
  messageList: IChatMessage[];
  showChat: boolean;
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
