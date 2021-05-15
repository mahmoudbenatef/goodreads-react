import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ApiServices } from "../../API/ApiServices";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";
import { validateAllInputs } from "../../helper/validateFormErrors";
import ErrorComponent from "../reusableComponents/ErrorComponent";

export default function LoginComponent({ parent = "login" }) {
  const [user, setUser] = useReducer(
    (oldstate, updates) => ({ ...oldstate, ...updates }),
    {
      email: "",
      password: "",
    }
  );

  const [serverError, setServerError] = useState("");
  const [userErrors, setUserErrors] = useReducer(
    (oldstate, updates) => ({ ...oldstate, ...updates }),
    {
      email: {
        isValid: false,
        isTouched: false,
        errorMsg: "email must be in a valid format",
      },
      password: {
        isValid: false,
        isTouched: false,
        errorMsg: "password must be at least 6 characters",
      },
    }
  );

  const [loginPressed, setloginPressed] = useState(0);
  const authentication = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    setServerError("");
    setUserErrors({
      email: { ...userErrors.email, isValid: false, isTouched: false },
      password: { ...userErrors.password, isValid: false, isTouched: false },
    });
    if (
      user.email !== "" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      setUserErrors({ email: { ...userErrors.email, isValid: true } });
    } 
    else if (user.email !== "") {
      setUserErrors({
        email: { ...userErrors.email, isValid: false, isTouched: true },
      });
    }

    if (user.password !== "" && user.password.length > 5) {
      setUserErrors({ password: { ...userErrors.password, isValid: true } });
    } else if (user.password !== "") {
      setUserErrors({
        password: { ...userErrors.password, isValid: false, isTouched: true },
      });
    }
  }, [user]);

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
      color: "#711D1D",
      overflow: "hidden"
    }
  }));
  const classes = useStyles();
  
  return parent == "login" ? (
    <>
      <div
        className={
          "d-flex flex-column min-vh-100 align-items-center justify-content-center bg-success"
        }>
        <div className="row justify-content-center w-50 p-3 bg-light rounded-3">
          <div className="row justify-content-center mt-5 flex-xl-shrink-2">
            <div className="col-md-4 flex-xl-shrink-2">
              <h1> login </h1>
            </div>
          </div>
          <div className="row justify-content-center mt-2 ">
            <div className="col-md-8 ">
              <input
                type="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ email: e.target.value });
                }}
                className="form-control"
                placeholder={"email"}
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          {!userErrors.email.isValid && userErrors.email.isTouched && (
            <ErrorComponent> {userErrors.email.errorMsg}</ErrorComponent>
          )}
          <div className="row justify-content-center mt-2">
            <div className="col-md-8">
              <input
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ password: e.target.value });
                }}
                className="form-control"
                placeholder={"password"}
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          {!userErrors.password.isValid && userErrors.password.isTouched && (
            <ErrorComponent> {userErrors.password.errorMsg}</ErrorComponent>
          )}

          {serverError !== "" && (
            <ErrorComponent> {serverError}</ErrorComponent>
          )}
          <div className="row justify-content-center mt-3 mb-5">
            <div className="col-md-8 align-items-center">
              <button
                type="submit"
                className={"btn btn-primary align-self-center"}
                onClick={() => {
                  setloginPressed(loginPressed + 1);
                }}
              >
                Login
              </button>
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-md-8 align-items-center">
              Doesn't have account ?
              <span className={"ml-2"}>
                {" "}
                <Link to="/register"> register </Link>
              </span>
            </div>
          </div>
          {/*</div>*/}
        </div>
      </div>
    </>
  ) : (
    <div>
      <div className="row">
        <div className="col-md-6 ">
          <input
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser({ email: e.target.value });
            }}
            className="form-control"
            placeholder={"Email"}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="col-md-4">
          <input
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ password: e.target.value });
            }}
            className="form-control"
            placeholder={"Password"}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="col-md-2 align-items-center">
          <button
            type="submit"
            className={"btn align-self-center"}
            onClick={() => {
              setloginPressed(loginPressed + 1);
            }}
            style={{backgroundColor: "#3d6b8c",color:"white"}}
          >
            Login
          </button>
        </div>
      </div>
      <div className="row">
      <ul>
      {serverError !== "" && <li className={classes.homeError}> {serverError}</li>}
      
      {!userErrors.email.isValid && userErrors.email.isTouched && (
        <li style={{marginRight:"5rem",paddingLeft:"2.5rem"}} className={classes.homeError} > {userErrors.email.errorMsg}</li>
      )}
            {!userErrors.password.isValid && userErrors.password.isTouched && (
        <li className={classes.homeError}> {userErrors.password.errorMsg}</li>
      )}
      </ul>
    </div>
    </div>
  );
}
