import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css"
import axios from "axios";


export default function Register() {
  const url = process.env.REACT_APP_SERVER_URL;
  const location = useHistory();

  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const [error, updateError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    let registerUser = await fetch(`${url}/auth/register`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, email, password
      })
    });
    let res = await registerUser.json();
    if (res.error) return updateError(res.error);

    location.push("/login")
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      {error && <h5 style={{ marginTop: "20px", color: "red", fontSize: "16px" }} >{error}</h5>}

      <form className="registerForm" onSubmit={handleForm} >
        <label>Username</label>
        <input className="registerInput" onChange={(e) => updateUsername(e.target.value)} value={username} type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" onChange={(e) => updateEmail(e.target.value)} value={email} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" onChange={(e) => updatePassword(e.target.value)} value={password} type="password" placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
      </form>

      <Link to="/login" className="registerLoginButton">Login</Link>
    </div>
  )
}
