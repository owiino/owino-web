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
