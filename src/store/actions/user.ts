import { userActions } from "../index";
import { TUser } from "../../types/auth";

export const updateSeller = (seller: TUser) => {
  return (dispatch: any) => {
    dispatch(
      userActions.updateSeller({
        seller: seller,
      })
    );
  };
};

export const clearUser = () => {
  return (dispatch: any) => {
    dispatch(userActions.clear());
  };
};
