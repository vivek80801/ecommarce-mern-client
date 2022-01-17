import { Dispatch } from "redux";
import { IProductAction } from "../reducers/productReducers";
import { UPDATE_PRODUCT } from "../reducers/typesOfReducers";

export const fetchEditProduct = (formData: FormData, id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/products/editproduct/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      });
      const data: {
        msg: string;
        newProduct: {
          details: string;
          img: string;
          name: string;
          price: number;
          _id: string;
        };
      } = await res.json();
      const { details, img, name, price, _id } = data.newProduct;
      console.log(_id, name);
      dispatch(editProduct(details, img, name, price, _id));
    } catch (err) {
      console.log(err);
    }
  };
};

const editProduct = (
  details: string,
  img: string,
  name: string,
  price: number,
  id: string
): IProductAction => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id: id,
      details: details,
      img: img,
      name: name,
      price: price,
    },
  };
};
