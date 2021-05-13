import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";

export default function UserHomeComponent() {
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
      <h1>Hello User</h1>
      <RateComponent bookId="609964ba4d02fa267a53acf4" userRating={2} size="small"></RateComponent>
      <ShelfComponent bookId="609964ba4d02fa267a53acf4" ></ShelfComponent>
    </>
  );
}
