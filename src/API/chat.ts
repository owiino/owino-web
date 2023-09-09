import { url } from "../store";

export const getChatRecipients = async ({
  userId,
  accessToken,
}: {
  userId: number;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/chat/get-chat-recipients/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

// TODO: add an api request to add fetch the last message message of recipient
