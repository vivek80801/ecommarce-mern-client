import { Dispatch } from "redux";
import { ICartAction } from "../reducers/cartReducer";
import { ADD_PRODUCT_TO_CART } from "../reducers/typesOfReducers";

export const fetchAddToCart = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("api/cart/add", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
          Accept: "text/json */*",
          "content-type": "application/json",
        },
      });
      const data: {
        msg: string;
        cart: {
          _id: string;
          img: string;
          name: string;
          price: number;
          details: string;
          quantity: number;
          subTotal: number;
        };
      } = await res.json();
      const { _id, img, name, price, details, quantity, subTotal } = data.cart;
      dispatch(addToCart(_id, name, img, price, details, quantity, subTotal));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (
  id: string,
  name: string,
  img: string,
  price: number,
  details: string,
  num: number,
  total: number
): ICartAction => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: {
      id: id,
      name: name,
      img: img,
      price: price,
      details: details,
      num: num,
      total: total,
    },
  };
};
