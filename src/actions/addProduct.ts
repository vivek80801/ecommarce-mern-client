import { Dispatch } from "redux";
import { ADD_PRODUCT } from "../reducers/typesOfReducers";
import { IProductAction } from "../reducers/productReducers";

export const fetchAddProduct = (formData: FormData) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/products/addproduct", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      });
      const data: {
        _doc: {
          _id: string;
          msg: string;
          name: string;
          price: string;
          details: string;
          img: string;
        };
      } = await res.json();
      const { _id, name, price, details, img } = data._doc;
      dispatch(addProduct(_id, name, parseInt(price), details, img));
    } catch (err) {
      console.log(err);
    }
  };
};

const addProduct = (
  id: string,
  name: string,
  price: number,
  details: string,
  img: string
): IProductAction => {
  return {
    type: ADD_PRODUCT,
    payload: {
      id: id,
      name: name,
      price: price,
      details: details,
      img: img,
    },
  };
};
