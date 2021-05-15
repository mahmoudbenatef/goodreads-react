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
import UserHomeComponent from "./components/user/UserHomeComponent";
import AdmiAuthorsComponent from "./components/admin/AdmiAuthorsComponent";

import { authContext } from "./contexts/authContext";

function App(props) {
  // const location = useLocation();
  const authentication = useContext(authContext);
  // useEffect(()=>{
  //   if (mySessionStorage.getCurrentUser())
  //   {
  //     authentication.setAuth({authed:true,role:mySessionStorage.getCurrentUser().role})
  //   }
  // },[])
  console.log(authentication);
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {authentication.auth.authed === true &&
            authentication.auth.role === "admin" && (
              // location.pathname !== "register" &&
              <>
                <nav>
                  <ul>
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                    <li>
                      <Link to="/admin/books">admin books</Link>
                    </li>
                  </ul>
                </nav>
              </>
            )}

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
            <Route path="/testAdmin">
              <AdmiAuthorsComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
