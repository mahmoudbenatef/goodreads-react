import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import RateComponent from "../reusableComponents/RateComponent";

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
      <RateComponent bookId="60990a758d143e7cc21a02ac" userRating="3" size="small"></RateComponent>
    </>
  );
}
