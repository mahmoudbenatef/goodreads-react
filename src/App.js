import { useContext } from "react";
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
import AuthorsList from "./components/author/AuthorsList/AuthorsLIst";
import AuthorDetails from "./components/author/authorDetails/AuthorDetails";


import LandingComponent from "./components/landingPage/landingComponent";
import NavbarComponent from "./components/user/NavbarComponent";
import UserHomeComponent from "./components/user/UserHomeComponent";
import { authContext } from "./contexts/authContext";




function App(props) {
  const authentication = useContext(authContext);
  console.log(authentication);
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          {authentication.auth.authed === true &&
            authentication.auth.role === "admin" && (
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
              <li key={4}>
                <Link to="/admin/authors">authors</Link>
              </li>
            </ul>
          </nav>
              </>
            )}

          {authentication.auth.authed === true &&
            authentication.auth.role === "user" && (
              <NavbarComponent></NavbarComponent>
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
              <LandingComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/register">
              <RegisterComponent />
            </Route>
        
            <Route exact path="/authors">
              <AuthorsList />
            </Route>
            <Route path="/authors/:id">
              <AuthorDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
