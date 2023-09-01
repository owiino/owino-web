import { url } from "../store";
import { TSigninInPut, TSignupInput } from "../types/auth";

export const signIn = async ({ phoneNumber, password }: TSigninInPut) => {
  const response = await fetch(`${url}/users/signin`, {
    method: "POST",
    body: JSON.stringify({
      phoneNumber,
      password,
    }),
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

export const signUp = async ({
  firstName,
  lastName,
  phoneNumber,
  password,
}: TSignupInput) => {
  const response = await fetch(`${url}/users/signup`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      phoneNumber,
      password,
    }),
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

export const forgotPassword = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const response = await fetch(`${url}/users/forgot-password`, {
    method: "POST",
    body: JSON.stringify({
      phoneNumber,
    }),
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
