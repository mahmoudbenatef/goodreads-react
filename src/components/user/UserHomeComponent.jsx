import { useContext, useEffect, useState } from "react";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";
import BooksComponent from "../adminDashboard/BooksComponent";
import {CategoryProvider} from "../../contexts/categoryContext";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
import BookCardComponent from "../userDashboard/BookCardComponent";
import BooksCardContainerComponent from "../userDashboard/BooksCardContainerComponent";
import { UserBookServices } from "../../API/userBookservices";
import { mySessionStorage } from "../../helper/LocalStorge";
import { BASE_URL } from "../../API/urls";
import Rating from "@material-ui/lab/Rating";
import UserShelvesComponent from './UserShelvesComponent';

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
    if (authentication.auth.authed === false) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Switch>
        <Route key={1} path={`${path}/books`}>
          <BooksCardContainerComponent></BooksCardContainerComponent>
        </Route>

        <Route key={2} path={`${path}/shelves`}>
          <UserShelvesComponent></UserShelvesComponent>
        </Route>
      </Switch>

    </>
  );
}
