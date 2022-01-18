import { Dispatch } from "redux";
import { ICartAction } from "../reducers/cartReducer";
import { DELETE_PRODUCT_FROM_CART } from "../reducers/typesOfReducers";

export const fetchDeleteFromCart = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await fetch("/api/cart/delete", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
          Accept: "text/json */*",
          "content-type": "application/json",
        },
      });
      dispatch(deleteFromCart(id));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteFromCart = (id: string): ICartAction => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    payload: {
      id: id,
    },
  };
};
