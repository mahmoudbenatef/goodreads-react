import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Background from "../assets/e.png";
import logo from "../assets/logo.png";
import { authContext } from "../contexts/authContext";
import LoginComponent from "./auth/LoginComponent";
import RegisterComponent from "./auth/RegisterComponent";
export default function LandingComponent({ parent = "login" }) {
  const authentication = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "admin"
    ) {
      history.push("/admin");
    } else if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      history.push("/user");
    }
  }, [authentication]);

  const useStyles = makeStyles((theme) => ({
    login: {
      float: "right",
      marginTop: "0.6rem",
      width: "38rem",
      overflow: "hidden",
    },
    header: {
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      margin:"0"
    },
    regHeader: {
      color:"black",
      textAlign:"center",
      marginTop: '5rem'
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <img src={logo} style={{ width: "17rem" ,marginLeft:"1rem"}} />
      <div className={classes.login}>
        <LoginComponent className={classes.login} parent="home" />
        <h3 className={classes.regHeader}>New here? Create an account </h3>
        <RegisterComponent parent="home" />
      </div>
    </div>
  );
}
