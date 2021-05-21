import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import bg from "../../assets/bg.png";
import headerBg from "../../assets/e.png";
import logo from "../../assets/logo.png";
import { authContext } from "../../contexts/authContext";
import "../../styles/popular.css";
import LoginComponent from "../auth/LoginComponent";
import RegisterComponent from "../auth/RegisterComponent";
import AuthorsComponent from "./PopularAuthorsComponent";
import BooksComponent from "./PopularBooksComponent";
import CategoriesComponent from "./PopularCategoriesComponent";

export default function LandingComponent({ parent = "login" }) {
  const authentication = useContext(authContext);
  const history = useHistory();
  
  useEffect(() => {
    document.title = "Goodreads"
  }, [])

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
      backgroundImage: `url(${headerBg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
        },
    regHeader: {
      color:"black",
      textAlign:"center",
      marginTop: '5rem',
      marginLeft: "3rem"
    },
    categories:{
      backgroundColor:"white"
    },
    books:{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      margin:"0"
    }
  }));
  const classes = useStyles();

  return (
    <>
    <div className={classes.header}>
      <img src={logo} style={{ width: "17rem" ,marginLeft:"1rem"}} />
      <div className={classes.login}>
        <div style={{ height: "5rem"}}>
        <LoginComponent parent="home" />
        </div>
        <h3 className={classes.regHeader}>New here? Create an account </h3>
        <RegisterComponent parent="home" />
      </div>
    </div>
    <div className={classes.categories}>
 <CategoriesComponent></CategoriesComponent>
    </div>
    <div className={classes.books}>
    <BooksComponent></BooksComponent>
    </div>
    <div style={{ backgroundColor: "white" , paddingBottom:"4rem"}}>
    <AuthorsComponent></AuthorsComponent>
    </div>
    </>
  );
}
