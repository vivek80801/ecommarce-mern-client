import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  INCREMENT_NUMBER_OF_ITEM_IN_CART,
  DECREMENT_NUMBER_OF_ITEM_IN_CART,
  GET_CART,
} from "./typesOfReducers";

export type ICartAction =
  | {
      type: typeof ADD_PRODUCT_TO_CART;
      payload: {
        id: string;
        name: string;
        img: string;
        price: number;
        details: string;
        num: number;
        total: number;
      };
    }
  | {
      type: typeof DELETE_PRODUCT_FROM_CART;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof INCREMENT_NUMBER_OF_ITEM_IN_CART;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof DECREMENT_NUMBER_OF_ITEM_IN_CART;
      payload: {
        id: string;
      };
    }
  | {
      type: typeof GET_CART;
      payload: {
        products: {
          id: string;
          name: string;
          img: string;
          price: number;
          details: string;
        }[];
        cart: {
          _id: string;
          quantity: number;
          subTotal: number;
        }[];
      };
    };

interface ICartState {
  id: string;
  name: string;
  img: string;
  price: number;
  details: string;
  num: number;
  total: number;
}

export const cartReducer = (state: ICartState[] = [], action: ICartAction) => {
  switch (action.type) {
    case GET_CART:
      return [
        ...action.payload.cart.map((cart) => {
          let newProduct = {};
          action.payload.products.map((product) => {
            if (product.id === cart._id) {
              newProduct = {
                id: cart._id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
                num: cart.quantity,
                total: cart.subTotal,
              };
            }
          });
          return newProduct;
        }),
      ];

    case ADD_PRODUCT_TO_CART:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          img: action.payload.img,
          price: action.payload.price,
          details: action.payload.details,
          total: action.payload.total,
          num: action.payload.num,
        },
      ];

    case DELETE_PRODUCT_FROM_CART:
      return [...state.filter((product) => action.payload.id !== product.id)];

    case INCREMENT_NUMBER_OF_ITEM_IN_CART:
      return [
        ...state.map((product) =>
          action.payload.id === product.id
            ? {
                id: action.payload.id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
                total: product.total,
                num: (product.num += 1),
              }
            : {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
                total: product.total,
                num: product.num,
              }
        ),
      ];

    case DECREMENT_NUMBER_OF_ITEM_IN_CART:
      return [
        ...state.map((product) =>
          action.payload.id === product.id
            ? {
                id: action.payload.id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
                total: product.total,
                num: (product.num -= 1),
              }
            : {
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                details: product.details,
                total: product.total,
                num: product.num,
              }
        ),
      ];

    default:
      return state;
  }
};
