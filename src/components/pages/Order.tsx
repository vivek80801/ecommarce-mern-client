import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../store";

const Order: React.FC = (): JSX.Element => {
  const state = useSelector((state: IState) => state);
  return (
    <>
      {state.auth.auth ? (
        <h1>hello from orders</h1>
      ) : (
        <h1>you are not logged in</h1>
      )}
    </>
  );
};

export default Order;
