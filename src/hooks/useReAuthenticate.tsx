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
      console.log("The user re-authenticated");
    },
    onError: (error: any) => {
      console.log("error while re-authenticating");
      console.error(error);
    },
  });

  const isExpiredAccessToken = (): Boolean => {
    console.log("accessToken :", accessToken);
    const decoded: TAuthToken = jwt_decode(accessToken);
    const tokenExpiry = decoded.exp; //seconds
    const now = Math.floor(Date.now() / 1000); //seconds

    return now > tokenExpiry;
  };

  const isValidRefreshToken = (): Boolean => {
    console.log("refreshToken :", refreshToken);
    const decoded: TAuthToken = jwt_decode(refreshToken);
    const tokenExpiry = decoded.exp; //seconds
    const now = Math.floor(Date.now() / 1000); //seconds

    return tokenExpiry > now;
  };

  const reAuthenticate = () => {
    const validRefreshToken = isValidRefreshToken();
    const expiredAccessToken = isExpiredAccessToken();

    if (!refreshToken || !validRefreshToken || !expiredAccessToken) return;

    mutate({
      refreshToken: refreshToken,
    });
  };

  return { reAuthenticate };
};
