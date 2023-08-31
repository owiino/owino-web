enum Role {
  Seller = "seller",
  Buyer = "buyer",
  Admin = "admin",
  Agent = "agent",
}

export type TUser = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: Role;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TAuth = {
  status: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expirationTime: string;
  user: TUser;
};

export type TAuthExtended = {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: TUser | null;
};

export type TAuthState = {
  auth: TAuthExtended;
};

export type TSigninInPut = {
  phoneNumber: string;
  password: string;
};

export type TSignupInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  // location: string;
};
