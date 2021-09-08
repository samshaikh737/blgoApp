import React from "react";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { Database } from "./OwnRedux/Provider";

function App() {
  const location = useHistory();
  const [{ user }, updateUser] = Database();

  React.useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("user"));
    if (typeof(getUser) === "object" || typeof(getUser) === Object ) return updateUser({ "type": "ADD_USER", "data": getUser });
    localStorage.removeItem("user")
    location.push("/login")
  }, [])


  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          {user ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/update/:id">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
