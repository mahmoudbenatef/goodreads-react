import { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { CategoryProvider } from "../../contexts/categoryContext";
import BooksComponent from "../adminDashboard/BooksComponent";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
import AdmiAuthorsComponent from "./AdmiAuthorsComponent";

export default function AdminHomeComponent() {
  let { path, url } = useRouteMatch();
  const authentication = useContext(authContext);
  const history = useHistory();
  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      history.push("/user");
    }
    if (authentication.auth.authed === false) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Switch>
        <Route key={1} path={`${path}/books`}>
          <BooksComponent />
        </Route>

        <Route key={2} path={`${path}/categories`}>
          <CategoryProvider>
            <CategoryComponent />
          </CategoryProvider>
        </Route>
        <Route key={3} path={`${path}/authors`}>
          <AdmiAuthorsComponent />
        </Route>
      </Switch>
    </>
  );
}
