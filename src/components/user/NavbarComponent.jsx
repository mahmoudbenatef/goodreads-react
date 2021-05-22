import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../API/urls";
import logo from "../../assets/logo.png";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";
import SearchComponent from "./Search/SearchComponent";
export default function NavbarComponent() {
  const authentication = useContext(authContext);
  const history = useHistory();
  const isAdmin = () => mySessionStorage.getCurrentUser().role === "admin";
  const logout = () => {
    mySessionStorage.removeCurrentUser();
    mySessionStorage.removeToken();
    authentication.setAuth({
      authed: false,
    });
    history.push("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" style={{ marginLeft: "1rem" }} to="/">
          <img src={logo} height="45" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between "
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to={isAdmin() ? "/admin/categories" : "/categories"}
              >
                Categories
              </Link>
            </li>
            {isAdmin() ? (
              ""
            ) : (
              <li className="nav-item active">
                <Link className="nav-link" to="/shelves">
                  Shelves
                </Link>
              </li>
            )}
            <li className="nav-item active">
              <Link
                className="nav-link"
                to={isAdmin() ? "/admin/books" : "/books"}
              >
                Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to={isAdmin() ? "/admin/authors" : "/authors"}
              >
                Authors
              </Link>
            </li>
            {isAdmin() ? "" : <SearchComponent></SearchComponent>}
          </ul>
          <ul className="navbar-nav mr-auto">
            {isAdmin() ? (
              ""
            ) : (
              <img
                style={{ borderRadius: "2rem" }}
                src={BASE_URL + "/" + mySessionStorage.getCurrentUser().avatar}
                height="40"
                width="40"
                alt=""
              />
            )}
            <li className="nav-item active nav-link">
              {mySessionStorage.getCurrentUser().firstname}{" "}
              {mySessionStorage.getCurrentUser().lastname}
            </li>
            <li
              onClick={logout}
              className="nav-item nav-link"
              style={{ cursor: "pointer" }}
            >
              logout
              <ExitToAppIcon></ExitToAppIcon>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
