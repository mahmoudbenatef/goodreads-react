import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import BooksCardContainerComponent from "../userDashboard/BooksCardContainerComponent";
import { UserBookServices } from "../../API/userBookservices";
import { mySessionStorage } from "../../helper/LocalStorge";
import { BASE_URL } from "../../API/urls";
import Rating from "@material-ui/lab/Rating";
import UserShelvesComponent from "./UserShelvesComponent";
import ListCategoriesComponent from "../adminDashboard/category/ListCategoriesComponent";
import CategoryBooksComponent from "./category/CategoryBooksComponent";

export default function UserHomeComponent() {
  let { path, url } = useRouteMatch();
  const authentication = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "admin"
    ) {
      history.push("/admin");
    }
    // if (authentication.auth.authed === false) {
    //   history.push("/login");
    // }
  }, []);

  return (
    <>
      <UserShelvesComponent />
    </>
  );
}
