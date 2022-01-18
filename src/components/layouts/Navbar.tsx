import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { fetchLogOut } from "../../actions/logout";
import navbar from "../../scss/components/layouts/navbar.module.scss";

const Navbar: React.FC = (): JSX.Element => {
  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <>
      <nav className={navbar.desktop}>
        <h1>logo</h1>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          {state.auth.auth && (
            <>
              <li>
                <Link to="/dashboard">dashboard</Link>
              </li>
              <li>
                <Link to="/cart">cart</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(fetchLogOut(state.auth.username));
                  }}
                >
                  logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
