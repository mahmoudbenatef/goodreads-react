import {useHistory} from "react-router-dom";
import {useEffect, useContext, useReducer, useState} from "react"
import {authContext} from "../../contexts/authContext";
import styles from "../../styles/signin.module.css"
import {ApiServices} from "../../API/ApiServices";
import {mySessionStorage} from "../../helper/LocalStorge";

export default function LoginComponent() {
    const [user, setUser] = useReducer((oldstate, updates) => ({...oldstate, ...updates}), {
        email: '',
        password: '',
    })

    const [loginPressed, setloginPressed] = useState(false)
    const authentication = useContext(authContext)
    const history = useHistory();
    useEffect(() => {
        if (authentication.auth.authed === true && authentication.auth.role === "admin") {
            history.push("/admin");

        } else if (authentication.auth.authed === true && authentication.auth.role === "user") {
            history.push("/user");
        }

    }, [authentication])

    useEffect(() => {
        console.log(authentication.auth)
        if (loginPressed) {

            ApiServices.signin(user)
                .then(function (response) {
                                    mySessionStorage.setCurrentUser(response.data.user)
                                    mySessionStorage.setToken(response.data.token)
                                    console.log(mySessionStorage.getCurrentUser())
                                    console.log(mySessionStorage.getToken())
                                    authentication.setAuth({authed: true, role: mySessionStorage.getCurrentUser().role})
                    setloginPressed(false)
                })
                .catch(err => {
                console.log(err)
            })
        }

    }, [loginPressed])


    return (
        <>

            <div className={"d-flex flex-column min-vh-100 align-items-center justify-content-center bg-success"}>
                <div className="row justify-content-center w-50 p-3 bg-light rounded-3">
                    <div className="row justify-content-center mt-5 flex-xl-shrink-2">
                        <div className="col-md-4 flex-xl-shrink-2">
                            <h1> login </h1>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-2 ">
                        <div className="col-md-8 ">
                            <input type="email" value={user.email} onChange={(e) => {
                                setUser({email: e.target.value})
                            }} className="form-control" placeholder={"email"}
                                   aria-describedby="emailHelp"/>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-2">
                        <div className="col-md-8">
                            <input type="password" value={user.password} onChange={(e) => {
                                setUser({password: e.target.value})
                            }} className="form-control" placeholder={"password"}
                                   aria-describedby="emailHelp"/>
                        </div>
                    </div>


                    <div className="row justify-content-center mt-3 mb-5">
                        <div className="col-md-8 align-items-center">
                            <button type="submit" className={"btn btn-primary align-self-center"} onClick={() => {
                                setloginPressed(true)
                            }}>Login
                            </button>
                        </div>
                    </div>
                    {/*</div>*/}
                </div>

            </div>
        </>
    )
}
