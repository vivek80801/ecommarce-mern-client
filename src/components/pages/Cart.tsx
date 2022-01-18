import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { GET_CART, GET_PRODUCT } from "../../reducers/typesOfReducers";
import { fetchIncCart } from "../../actions/incCart";
import { fetchDecCart } from "../../actions/decCart";

const Cart: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productRes = await fetch("/products", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
        });
        const productData: {
          products: {
            _id: string;
            name: string;
            price: number;
            details: string;
            img: string;
          }[];
        } = await productRes.json();
        const newProductData: {
          id: string;
          name: string;
          price: number;
          details: string;
          img: string;
        }[] = [];
        productData.products.map((product) => {
          newProductData.push({
            id: product._id,
            name: product.name,
            price: product.price,
            img: product.img,
            details: product.details,
          });
        });
        (() => {
          dispatch({
            type: GET_PRODUCT,
            payload: newProductData,
          });
        })();
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
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <h1>cart</h1>
      {loading ? (
        <>
          <h1>loading</h1>{" "}
        </>
      ) : (
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
            <button onClick={() => dispatch(fetchIncCart(item.id))}>+</button>
            <button
              onClick={() => {
                if (item.num > 0) {
                  dispatch(fetchDecCart(item.id));
                }
              }}
            >
              -
            </button>
            <button>delete</button>
          </div>
        ))
      )}
    </>
  );
};

export default Cart;
