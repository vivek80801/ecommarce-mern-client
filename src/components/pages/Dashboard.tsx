import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { GET_PRODUCT } from "../../reducers/typesOfReducers";
import Products from "../layouts/Products";

const Dashboard: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/products", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
        });
        const data: {
          products: {
            _id: string;
            name: string;
            price: number;
            details: string;
            img: string;
          }[];
        } = await res.json();
        const newProduct: {
          id: string;
          name: string;
          price: number;
          details: string;
          img: string;
        }[] = [];
        data.products.map((product) => {
          newProduct.push({
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
            payload: newProduct,
          });
        })();
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      {state.auth.auth ? (
        <>
          <h1>welcome {state.auth.username}</h1>
          <h2>your email is {state.auth.email}</h2>
          {loading ? (
            <>
              <h1>loading</h1>
            </>
          ) : (
            <>
              <Products />
            </>
          )}
        </>
      ) : (
        <>
          <h1>you are not logged in</h1>
          <Link to={"/login"}>login</Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
