import { Dispatch } from "redux";
import { ERROR, REGISTER } from "../reducers/typesOfReducers";
import { IAuthAction } from "../reducers/authReducer";

export const registerFetch = (
  username: string,
  email: string,
  password: string,
  callback: () => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/user/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (data.username !== undefined && data.email !== undefined) {
        dispatch(register(data.username, data.email));
        callback();
      } else {
        dispatch(error(data.msg));
        callback();
        setTimeout(() => {
          dispatch(error(""));
        }, 5000);
      }
    } catch (err) {
      dispatch(error(JSON.stringify(err)));
    }
  };
};

const register = (username: string, email: string): IAuthAction => {
  return {
    type: REGISTER,
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
