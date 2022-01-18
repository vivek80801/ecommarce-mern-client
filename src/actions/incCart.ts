import { Dispatch } from "redux";
import { ICartAction } from "../reducers/cartReducer";
import { INCREMENT_NUMBER_OF_ITEM_IN_CART } from "../reducers/typesOfReducers";

export const fetchIncCart = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await fetch("/api/cart/inc", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
          Accept: "text/json */*",
          "content-type": "application/json",
        },
      });
      dispatch(incCart(id));
    } catch (err) {
      console.log(err);
    }
  };
};

const incCart = (id: string): ICartAction => {
  return {
    type: INCREMENT_NUMBER_OF_ITEM_IN_CART,
    payload: {
      id: id,
    },
  };
};
