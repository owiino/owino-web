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

export const reSignIn = async ({ refreshToken }: { refreshToken: string }) => {
  const response = await fetch(`${url}/users/re-signin`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken: refreshToken,
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

export const validatePasswordResetToken = async ({
  resetToken,
}: {
  resetToken: string;
}) => {
  const response = await fetch(`${url}/users/validate-reset-token`, {
    method: "POST",
    body: JSON.stringify({
      resetToken: resetToken,
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

export const resetPassword = async ({
  password,
  userId,
}: {
  userId: number;
  password: string;
}) => {
  const response = await fetch(`${url}/users/reset-password`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      password: password,
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

export const editPersonalDetails = async ({
  userId,
  firstName,
  lastName,
}: {
  userId: number;
  firstName: string;
  lastName: string;
}) => {
  const response = await fetch(`${url}/users/edit-user-details/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
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

export const uploadUserImage = async ({
  userId,
  formData,
  accessToken,
}: {
  userId: number;
  formData: any;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/users/upload-user-image/${userId}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  userId,
}: {
  userId: number;
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await fetch(`${url}/users/change-password/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      currentPassword: currentPassword,
      newPassword: newPassword,
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

export const changePhoneNumber = async ({
  phoneNumber,
  userId,
}: {
  userId: number;
  phoneNumber: string;
}) => {
  const response = await fetch(`${url}/users/change-phone-number/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      phoneNumber: phoneNumber,
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
