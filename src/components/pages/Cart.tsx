import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IState } from "../../store";
import { GET_CART, GET_PRODUCT } from "../../reducers/typesOfReducers";
import { fetchIncCart } from "../../actions/incCart";
import { fetchDecCart } from "../../actions/decCart";
import { fetchDeleteFromCart } from "../../actions/deleteFromCart";

const Cart: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [numberOfItem, setNumberOfItem] = React.useState(0);

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
        let newTotal = 0;
        //@ts-ignore
        if (state.cart.length > 0) {
          //@ts-ignore
          setNumberOfItem(state.cart.length);
          //@ts-ignore
          state.cart.map((myProduct) => {
            newTotal += myProduct.total;
          });
        }
        setTotal(newTotal);
        console.log("total " + newTotal);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {state.auth.auth ? (
        <>
          <h1>cart {numberOfItem}</h1>
          {loading ? (
            <>
              <h1>loading</h1>{" "}
            </>
          ) : //@ts-ignore
          state.cart.length > 0 ? (
            <>
              <div
                style={{
                  margin: "1rem",
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                <h1>name</h1>
                <h1>quantity</h1>
                <h1>price</h1>
                <h1>subTotal</h1>
                <h1>inc</h1>
                <h1>dec</h1>
                <h1>delete</h1>
              </div>
              {
                //@ts-ignore
                state.cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      margin: "1rem",
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    <h1>{item.name}</h1>
                    <h2>{item.num}</h2>
                    <h4> &#8377; {item.price}</h4>
                    <h3> &#8377; {item.total}</h3>
                    <button
                      style={{
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        border: "none",
                        outline: "none",
                        backgroundColor: "#d7d7d7",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let newTotal = 0;
                        //@ts-ignore
                        if (state.cart.length > 0) {
                          //@ts-ignore
                          state.cart.map((myProduct) => {
                            newTotal += myProduct.total;
                          });
                        }
                        setTotal(newTotal + item.price);
                        dispatch(fetchIncCart(item.id));
                      }}
                    >
                      +
                    </button>
                    <button
                      style={{
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        border: "none",
                        outline: "none",
                        backgroundColor: "#d7d7d7",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let newTotal = 0;
                        //@ts-ignore
                        if (state.cart.length > 0) {
                          //@ts-ignore
                          state.cart.map((myProduct) => {
                            newTotal += myProduct.total;
                          });
                        }
                        setTotal(newTotal - item.price);
                        if (item.num > 1) {
                          dispatch(fetchDecCart(item.id));
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      style={{
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        border: "none",
                        outline: "none",
                        backgroundColor: "#d7d7d7",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let newTotal = 0;
                        //@ts-ignore
                        if (state.cart.length > 0) {
                          //@ts-ignore
                          state.cart.map((myProduct) => {
                            if (item.id !== myProduct.id) {
                              newTotal += myProduct.total;
                            }
                          });
                        }
                        setTotal(newTotal);
                        dispatch(fetchDeleteFromCart(item.id));
                      }}
                    >
                      delete
                    </button>
                  </div>
                ))
              }
              <h1>Total: &#8377; {total}</h1>
              <Link to="/order">place order</Link>
            </>
          ) : (
            <>
              <h1>no item in cart</h1>
            </>
          )}
        </>
      ) : (
        <>
          <h1>you are not logged in</h1>
        </>
      )}
    </>
  );
};

export default Cart;
