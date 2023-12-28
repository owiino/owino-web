export type TLiveNotification = {
  userId: number;
  message: string;
};

export type TLiveNotificationState = {
  notifications: TLiveNotification[];
};
