import React, { useState } from "react";
import "./styles.css";
import { useActivityMonitor } from "./useActivityMonitor";

const JWT = {
  username: "unminified",
  amount: 20
};

export default function App() {
  const [listen, setListen] = useState(true);
  const [session, setSession] = useState(JWT);

  useActivityMonitor(
    () => {
      setListen(false);
      if (window.confirm("Do you want to continue your session?")) {
        setListen(true);
      } else {
        logout();
      }
    },
    { when: listen }
  );

  function setUser() {
    setSession(JWT);
    setListen(true);
  }

  function logout() {
    setSession(null);
    setListen(false);
  }

  if (!session)
    return (
      <div>
        <h1>Login</h1>
        <button onClick={setUser}>Log me in as Satoshi</button>
      </div>
    );

  return (
    <div className="App">
      <h1>Bank of Satoshi</h1>
      <p>@{session.username}</p> <button onClick={logout}>Logout</button>
      <p>Bitcoin: {session.amount}</p>
      <button>Sell</button>
      <button>Buy</button>
    </div>
  );
}
