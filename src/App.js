import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { BASE_URL } from "./API/urls";
import "./App.css";
import AdminHomeComponent from "./components/admin/AdminHomeComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import AuthorsList from "./components/author/AuthorsList/AuthorsLIst";
import BookDetials from "./components/book/BookDetails";
import LandingComponent from "./components/landingPage/landingComponent";
import NavbarComponent from "./components/user/NavbarComponent";
import UserHomeComponent from "./components/user/UserHomeComponent";
import BookCardContainerComponent from "./components/userDashboard/BooksCardContainerComponent.jsx";
import { authContext } from "./contexts/authContext";

function App(props) {
  const authentication = useContext(authContext);
  console.log(authentication);
  return (
    <>
      <Router>
        <div
          className="d-flex flex-column min-vh-100"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          {authentication.auth.authed ===
            true && (<NavbarComponent></NavbarComponent>)}
          {authentication.auth.authed === false &&
            BASE_URL + "/register" === window.location.pathname && (
              <Redirect to={{ pathname: "/login" }} />
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

            <Route path="/authors">
              <AuthorsList />
            </Route>

            <Route exact path="/books/details">
              <BookDetials />
            </Route>
            <Route path="/books">
              <BookCardContainerComponent></BookCardContainerComponent>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
