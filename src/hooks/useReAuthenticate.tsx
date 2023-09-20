import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { reSignIn } from "../API/auth";
import { authenticate } from "../store/actions/auth";
import { TAuth, TAuthToken } from "../types/auth";
import jwt_decode from "jwt-decode";

export const useReAuthenticate = () => {
  const dispatch: any = useDispatch();

  const strAuthData = localStorage.getItem("auth");
  const parsedAuthData: TAuth = strAuthData && JSON.parse(strAuthData);
  const refreshToken = parsedAuthData && parsedAuthData.refreshToken;
  const accessToken = parsedAuthData && parsedAuthData.accessToken;

  const { mutate } = useMutation({
    mutationFn: reSignIn,
    onSuccess: (auth: TAuth) => {
      dispatch(authenticate(auth));
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const isExpiredAccessToken = (): Boolean => {
    const decoded: TAuthToken = jwt_decode(accessToken);
    const tokenExpiry = decoded.exp; //seconds
    const now = Math.floor(Date.now() / 1000); //seconds

    return now > tokenExpiry;
  };

  const isValidRefreshToken = (): Boolean => {
    const decoded: TAuthToken = jwt_decode(refreshToken);
    const tokenExpiry = decoded.exp; //seconds
    const now = Math.floor(Date.now() / 1000); //seconds

    return tokenExpiry > now;
  };

  const reAuthenticate = (): boolean => {
    const validRefreshToken = isValidRefreshToken();
    const expiredAccessToken = isExpiredAccessToken();

    if (!refreshToken || !validRefreshToken || !expiredAccessToken) {
      return false;
    }

    mutate({
      refreshToken: refreshToken,
    });

    return true;
  };

  return { reAuthenticate };
};
