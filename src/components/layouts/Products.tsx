import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { fetchAddToCart } from "../../actions/addToCart";

const Products: React.FC = (): JSX.Element => {
  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <>
      {state.product.length > 0 &&
        state.product.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <img
              src={`http://localhost:5000/${product.img}`}
              alt={product.name}
              width="200px"
              height="200px"
            />
            <h3>Price: {product.price}</h3>
            <p>{product.details}</p>
            <button
              onClick={() => {
                dispatch(fetchAddToCart(product.id));
              }}
            >
              add to cart
            </button>
          </div>
        ))}
    </>
  );
};

export default Products;
