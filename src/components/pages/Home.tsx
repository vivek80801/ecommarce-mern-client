import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { registerFetch } from "../../actions/register";

const Home: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <>
      <h1>sign up</h1>
      {state.auth.err && (
        <>
          <h1 style={{ color: "#f00" }}>{state.auth.err}</h1>
        </>
      )}
      <form
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          dispatch(
            registerFetch(username, email, password, () => {
              setLoading(false);
            })
          );
        }}
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter your username"
          value={username}
          required
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          value={email}
          required
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          value={password}
          required
        />
        <input type="submit" value="sign up" disabled={loading} />
      </form>
    </>
  );
};

export default Home;
