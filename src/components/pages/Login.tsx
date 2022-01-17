import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../../actions/login";
import { IState } from "../../store";

const LogIn: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const state = useSelector((state: IState) => state);

  return (
    <>
      {loading && (
        <>
          <h1>loading</h1>
        </>
      )}
      {state.auth.err && (
        <>
          <h1 style={{ color: "#f00" }}>{state.auth.err}</h1>
        </>
      )}
      <h1>log in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          dispatch(
            loginFetch(username, password, () => {
              setLoading(false);
            })
          );
        }}
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          placeholder="enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="login" disabled={loading} />
      </form>
    </>
  );
};

export default LogIn;
