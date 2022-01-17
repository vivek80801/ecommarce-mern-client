import { LOGIN, LOGOUT, ERROR, REGISTER } from "./typesOfReducers";

export type IAuthAction =
  | {
      type: typeof LOGIN;
      payload: {
        username: string;
        email: string;
        isAdmin?: boolean;
      };
    }
  | {
      type: typeof LOGOUT;
      payload: {
        username: string;
      };
    }
  | {
      type: typeof REGISTER;
      payload: {
        username: string;
        email: string;
      };
    }
  | {
      type: typeof ERROR;
      payload: {
        err: string;
      };
    };

export const authReducer = (
  state: {
    username: string;
    email: string;
    auth: boolean;
    err?: string;
    isAdmin?: boolean;
  } = {
    username: "",
    email: "",
    auth: false,
    err: "",
  },
  action: IAuthAction
) => {
  switch (action.type) {
    case LOGIN:
      return action.payload.isAdmin === undefined
        ? {
            username: action.payload.username,
            email: action.payload.email,
            auth: true,
          }
        : action.payload.isAdmin !== undefined &&
          action.payload.isAdmin === true
        ? {
            username: action.payload.username,
            email: action.payload.email,
            auth: true,
            isAdmin: true,
          }
        : {
            username: action.payload.username,
            email: action.payload.email,
            auth: true,
          };

    case REGISTER:
      return {
        username: action.payload.username,
        email: action.payload.email,
        auth: false,
      };

    case LOGOUT:
      return {
        username: "",
        email: "",
        auth: false,
      };

    case ERROR:
      return {
        username: "",
        email: "",
        auth: false,
        err: action.payload.err,
      };

    default:
      return state;
  }
};
