import { Dispatch } from "redux";
import { IAuthAction } from "../reducers/authReducer";
import { LOGOUT } from "../reducers/typesOfReducers";

export const fetchLogOut = (username: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/user/logout", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch(logout(username));
    } catch (err) {
      console.log(err);
    }
  };
};

const logout = (username: string): IAuthAction => {
  return {
    type: LOGOUT,
    payload: {
      username: username,
    },
  };
};
