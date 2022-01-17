import { Dispatch } from "redux";
import { ERROR, LOGIN } from "../reducers/typesOfReducers";
import { IAuthAction } from "../reducers/authReducer";

export const loginFetch = (
  username: string,
  password: string,
  callback: () => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (data.username === undefined) {
        dispatch(error(JSON.parse(data).msg));
        callback();
        setTimeout(() => {
          dispatch(error(""));
        }, 5000);
      } else if (
        data.isAdmin === true &&
        data.username !== undefined &&
        data.email !== undefined
      ) {
        dispatch(adminLogin(data.username, data.email));
        callback();
      } else if (data.username !== undefined && data.email !== undefined) {
        dispatch(login(data.username, data.email));
        callback();
      }
    } catch (err: any) {
      dispatch(error(JSON.stringify(err)));
    }
  };
};

const adminLogin = (username: string, email: string): IAuthAction => {
  return {
    type: LOGIN,
    payload: {
      username: username,
      email: email,
      isAdmin: true,
    },
  };
};

const login = (username: string, email: string): IAuthAction => {
  return {
    type: LOGIN,
    payload: {
      username: username,
      email: email,
    },
  };
};

const error = (err: string): IAuthAction => {
  return {
    type: ERROR,
    payload: {
      err: err,
    },
  };
};
