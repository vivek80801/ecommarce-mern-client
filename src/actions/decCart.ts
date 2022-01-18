import { Dispatch } from "redux";
import { ICartAction } from "../reducers/cartReducer";
import { DECREMENT_NUMBER_OF_ITEM_IN_CART } from "../reducers/typesOfReducers";

export const fetchDecCart = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await fetch("/api/cart/dec", {
        method: "PUT",
        body: JSON.stringify({ id: id }),
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
          Accept: "text/json */*",
          "content-type": "application/json",
        },
      });
      dispatch(decCart(id));
    } catch (err) {
      console.log(err);
    }
  };
};

const decCart = (id: string): ICartAction => {
  return {
    type: DECREMENT_NUMBER_OF_ITEM_IN_CART,
    payload: {
      id: id,
    },
  };
};
