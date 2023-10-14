import { url } from "../store";

export const getUser = async (userId: number) => {
  const response = await fetch(`${url}/users/get-user/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
