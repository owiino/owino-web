import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TChat,
  TCurrentRecipientPayload,
  TMessageListPayload,
  TRecipientListPayload,
  TMessagePayload,
} from "../../types/chat";

const initialState: TChat = {
  chatRecipientList: [],
  currentRecipient: {
    userId: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "seller",
    imageUrl: null,
    createdAt: "",
    updatedAt: "",
  },
  messageList: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    updateChatRecipientList(
      state,
      action: PayloadAction<TRecipientListPayload>
    ) {
      state.chatRecipientList = action.payload.chatRecipientList;
    },
    updateCurrentRecipient(
      state,
      action: PayloadAction<TCurrentRecipientPayload>
    ) {
      state.currentRecipient = action.payload.currentRecipient;
    },
    updateMessageList(state, action: PayloadAction<TMessageListPayload>) {
      state.messageList = action.payload.messageList;
    },
    addToMessageList(state, action: PayloadAction<TMessagePayload>) {
      state.messageList = [...state.messageList, action.payload.message];
    },
    clearChat(state, _) {
      state.chatRecipientList = [];
      state.currentRecipient = {
        userId: 0,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "seller",
        imageUrl: null,
        createdAt: "",
        updatedAt: "",
      };
      state.messageList = [];
    },
  },
});
