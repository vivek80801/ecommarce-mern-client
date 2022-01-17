import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { GET_CART } from "../../reducers/typesOfReducers";

const Cart: React.FC = (): JSX.Element => {
  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cart/", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
        });
        const data: {
          msg: string;
          cart: {
            _id: string;
            quantity: number;
            subTotal: number;
          }[];
        } = await res.json();
        const getCart = () => {
          return {
            type: GET_CART,
            payload: {
              products: state.product,
              cart: data.cart,
            },
          };
        };
        dispatch(getCart());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <h1>cart</h1>
      {
        //@ts-ignore
        state.cart.length > 0 &&
          //@ts-ignore
          state.cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>{item.name}</h1>
              <h2>{item.num}</h2>
              <h4>{item.price}</h4>
              <h3>{item.total}</h3>
              <button>+</button>
              <button>-</button>
              <button>delete</button>
            </div>
          ))
      }
    </>
  );
};

export default Cart;
