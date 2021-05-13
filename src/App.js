<<<<<<< HEAD
import { useContext } from "react";
=======
import './App.css';
import {authContext} from "./contexts/authContext"
import {useContext, useEffect} from "react"
import {BASE_URL} from "./API/Constants"
>>>>>>> add autherization headers to admin request
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { BASE_URL } from "./API/urls";
import "./App.css";
import AdminHomeComponent from "./components/admin/AdminHomeComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import UserHomeComponent from "./components/user/UserHomeComponent";
import { authContext } from "./contexts/authContext";

function App(props) {
  const authentication = useContext(authContext)

  console.log(authentication)
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          {
            authentication.auth.authed === true&& authentication.auth.role === "admin" &&
            // location.pathname !== "register" &&
                <>
          <nav>
            <ul>
              <li key={1}>
                <Link to="/admin">Admin</Link>
              </li>
              <li key={2}>
                <Link to="/admin/books">admin books</Link>
              </li>

              <li key={3}>
                <Link to="/admin/categories">Categories</Link>
              </li>
            </ul>
          </nav>
              </>
            }

          {authentication.auth.authed === true &&
            authentication.auth.role === "user" && (
              <nav>
                <ul>
                  <li>
                    <Link to="/user">User</Link>
                  </li>
                </ul>
              </nav>
            )}
          {authentication.auth.authed === false &&
            BASE_URL + "/register" === window.location.pathname && (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )}
          <Switch>
            <Route path="/admin">
              <AdminHomeComponent />
            </Route>
            <Route path="/user">
              <UserHomeComponent />
            </Route>
            <Route exact path="/">
              <LoginComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/register">
              <RegisterComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
