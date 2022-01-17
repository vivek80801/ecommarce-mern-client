import {
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "./typesOfReducers";

export type IProductAction =
  | {
      type: typeof ADD_PRODUCT;
      payload: {
        id: string;
        name: string;
        price: number;
        details: string;
        img: string;
      };
    }
  | {
      type: typeof UPDATE_PRODUCT;
      payload: {
        id: string;
        name: string;
        price: number;
        details: string;
        img: string;
      };
    }
  | {
      type: typeof DELETE_PRODUCT;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof GET_PRODUCT;
      payload: {
        id: string;
        name: string;
        img: string;
        price: number;
        details: string;
      }[];
    };

export const productReducer = (
  state: {
    id: string;
    name: string;
    img: string;
    price: number;
    details: string;
  }[] = [],
  action: IProductAction
): {
  id: string;
  name: string;
  img: string;
  price: number;
  details: string;
}[] => {
  switch (action.type) {
    case GET_PRODUCT:
      return [...action.payload];

    case ADD_PRODUCT:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          details: action.payload.details,
          img: action.payload.img,
        },
      ];

    case UPDATE_PRODUCT:
      return [
        ...state.map((product) =>
          product.id === action.payload.id
            ? {
                id: action.payload.id,
                name: action.payload.name,
                img: action.payload.img,
                price: action.payload.price,
                details: action.payload.details,
              }
            : {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
              }
        ),
      ];

    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
};
