import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { Database } from "../../OwnRedux/Provider";

export default function Login() {
  const [{ user }, updateUser] = Database();

  const url = process.env.REACT_APP_SERVER_URL;
  const location = useHistory();

  const [error, updateError] = React.useState("");
  const [email, updateEmail] = React.useState("");
  const [password, updatePassword] = React.useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    let loginUser = await fetch(`${url}/auth/login`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    });
    let res = await loginUser.json();
    if (res.error) return updateError(res.error);
    if (loginUser.status == 200) {
      updateUser({ type: "ADD_USER", "data": res });
      location.push("/");
    };

  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {error && <h5 style={{ marginTop: "20px", color: "red", fontSize: "16px" }} >{error}</h5>}

      <form className="loginForm" onSubmit={handleForm}>
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." onChange={(e) => updateEmail(e.target.value)} value={email} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={(e) => updatePassword(e.target.value)} value={password} />
        <button className="loginButton">Login</button>
      </form>
      <Link to="/register" className="loginRegisterButton">Register</Link>
    </div>
  );
}
