import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ApiServices } from "../../API/ApiServices";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";
import { validateAllInputs } from "../../helper/validateFormErrors";

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

  useEffect(() => {
    console.log(authentication.auth);
    if (loginPressed) {
      const { valid, newErrors } = validateAllInputs(userErrors);
      if (valid) {
        ApiServices.signin(user)
          .then(function (response) {
            mySessionStorage.setCurrentUser(response.data.user);
            mySessionStorage.setToken(response.data.token);
            console.log(mySessionStorage.getCurrentUser());
            console.log(mySessionStorage.getToken());
            authentication.setAuth({
              authed: true,
              role: mySessionStorage.getCurrentUser().role,
            });
            setloginPressed(false);
          })
          .catch((err) => {
            setServerError(err.response.data.message);
          });
      } else {
        setUserErrors(newErrors);
      }
    }
  }, [loginPressed]);


  const useStyles = makeStyles((theme) => ({
    homeError: {
      borderRadius: "0.2rem",
      fontSize: "0.9rem",
      display: "inline",
      marginRight:"1rem",
      color: "#711D1D"
    },
    loginBtn:{
        backgroundColor: "#3d6b8c"
    }
  }));
  const classes = useStyles();
  
  return (
      <div>
    </div>
  );
}
