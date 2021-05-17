import { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import BooksCardContainerComponent from "../userDashboard/BooksCardContainerComponent";

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
      {/* <RateComponent bookId="609964ba4d02fa267a53acf4" userRating={2} size="small"></RateComponent>
       <ShelfComponent bookId="609964ba4d02fa267a53acf4" ></ShelfComponent> */}
      <Switch>
        <Route key={1} path={`${path}/books`}>
          <BooksCardContainerComponent></BooksCardContainerComponent>
        </Route>
      </Switch>

    </>
  );
}
