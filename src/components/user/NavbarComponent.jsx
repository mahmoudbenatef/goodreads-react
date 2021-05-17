import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../API/urls";
import logo from "../../assets/logo.png";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";

export default function NavbarComponent() {
  const authentication = useContext(authContext);
  const history = useHistory();
  const logout = () => {
    mySessionStorage.removeCurrentUser();
    mySessionStorage.removeToken();
    authentication.setAuth({
      authed: false
    });
    history.push("/");
  };
  return (
    <>
      <nav
        style={{ backgroundColor: "#e3f2fd" }}
        className="navbar navbar-expand-lg navbar-light"
      >
        <Link className="navbar-brand" style={{ marginLeft: "1rem" }} to="/user">
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
              <Link className="nav-link" to="/user">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/authors">
                Authors
              </Link>
            </li>

            <form
              className="form-inline my-2 my-lg-0"
              style={{
                marginRight: "1rem",
                marginLeft: "1rem",
                borderRadius: "3rem",
              }}
            >
              <input
                className="form-control mr-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ borderRadius: "2rem", width: "20rem" }}
              />
            </form>
          </ul>
          <ul className="navbar-nav mr-auto">
            <img
              style={{ borderRadius: "2rem" }}
              src={BASE_URL + "/" + mySessionStorage.getCurrentUser().avatar}
              height="40"
              width="40"
              alt=""
            />
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
