export type TLiveNotification = {
  userId: number;
  message: string;
};

export type TLiveNotificationList = {
  notifications: TLiveNotification[];
};

export type TLiveNotificationState = {
  liveNotification: TLiveNotificationList;
};
