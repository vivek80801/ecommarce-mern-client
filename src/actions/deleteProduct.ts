import { Dispatch } from "redux";
import { DELETE_PRODUCT } from "../reducers/typesOfReducers";
import { IProductAction } from "../reducers/productReducers";

export const fetchDeleteProduct = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch(deleteProduct(id));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteProduct = (id: string): IProductAction => {
  return {
    type: DELETE_PRODUCT,
    payload: {
      id: id,
    },
  };
};
