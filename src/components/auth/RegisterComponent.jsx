import {useHistory} from "react-router-dom";
import {useEffect, useContext, useState, useReducer} from "react"
import {authContext} from "../../contexts/authContext";
import axios from "axios";
import {API} from "../../API/Constants";
import ErrorComponent from "../reusableComponents/ErrorComponent"
import {validateAllInputs} from "../../helper/validateFormErrors"
import {
    Link
} from "react-router-dom";
export default function LoginComponent() {
    const authentication = useContext(authContext)
    const history = useHistory();
    const [user, setUser] = useReducer((oldstate, updates) => ({...oldstate, ...updates}), {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        gender: '',
        avatar: null

    })
    const [userErrors, setUserErrors] = useReducer((oldstate, updates) => ({...oldstate, ...updates}), {
        firstname: {
            isValid: false,
            isTouched: false,
            errorMsg: 'firstname is required and bust me more than 2 characters'
        },
        lastname: {
            isValid: false,
            isTouched: false,
            errorMsg: 'last is required and bust me more than 2 characters'
        },
        email: {
            isValid: false,
            isTouched: false,
            errorMsg: 'email must be in a valid format'
        },
        password: {
            isValid: false, isTouched: false,
            errorMsg: 'password must be at least 6 characters'
        },
        confirm_password: {
            isValid: false, isTouched: false,
            errorMsg: 'confirm password must be identical to your password'
        },
        gender: {
            isValid: false, isTouched: false,
            errorMsg: 'you have to choose you gender'
        },
        avatar: {
            isValid: false,
            isTouched: false,
            errorMsg: 'you must upload your photo'
        },
    })
    const[serverError,setServerError]= useState("")

    const [registerPressed, setRegisterPressed] = useState(0)

    // validate effect
    useEffect(() => {
        setServerError("")
        // console.log(userErrors)
        if (user.firstname !== '' && user.firstname.length > 2) {
            setUserErrors({firstname: {...userErrors.firstname, isValid: true}})
        } else if (user.firstname !== '') {
            setUserErrors({firstname: {...userErrors.firstname, isValid: false, isTouched: true}})

        }

        if (user.lastname !== '' && user.lastname.length > 2) {
            setUserErrors({lastname: {...userErrors.lastname, isValid: true}})
        } else if (user.lastname !== '') {
            setUserErrors({lastname: {...userErrors.lastname, isValid: false, isTouched: true}})
        }

        if (user.email !== '' && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
            setUserErrors({email: {...userErrors.email, isValid: true}})
        } else if (user.email !== '') {
            setUserErrors({email: {...userErrors.email, isValid: false, isTouched: true}})
        }
        if (user.password !== '' && user.password.length > 5) {
            setUserErrors({password: {...userErrors.password, isValid: true}})
        } else if (user.password !== '') {
            setUserErrors({password: {...userErrors.password, isValid: false, isTouched: true}})
        }

        if (user.confirm_password === user.password) {
            setUserErrors({confirm_password: {...userErrors.confirm_password, isValid: true}})
        } else if (user.confirm_password !== user.password) {
            setUserErrors({confirm_password: {...userErrors.confirm_password, isValid: false, isTouched: true}})
        }

        if (user.gender !== '') {
            setUserErrors({gender: {...userErrors.gender, isValid: true}})
        } else if (user.gender === '') {
            setUserErrors({gender: {...userErrors.gender, isValid: false}})
        }


        if (user.avatar !== null) {
            setUserErrors({avatar: {...userErrors.avatar, isValid: true}})
        }

    }, [user])

    // redirect if authenticated
    useEffect(() => {
        if (authentication.auth.authed === true && authentication.auth.role === "admin") {
            history.push("/admin");

        } else if (authentication.auth.authed === true && authentication.auth.role === "user") {
            history.push("/user");
        }

    }, [])


    // this state for listening for register button
    useEffect(() => {

        if (registerPressed) {
            const {valid, newErrors} = validateAllInputs(userErrors)
            if (valid) {
                // setRegisterPressed(false)
                console.log("msa2k laziz")
                let formData = new FormData()
                for (const [key, value] of Object.entries(user)) {
                    formData.append(key, value)
                }
                // ApiServices.register(formData)
                console.log(formData)
                axios.post(API.register(), formData)
                    .then(function (response) {
                        history.push("/login");
                    })
                    .catch(function (error) {
                        console.log(error);
                        setServerError("this email has been already taken")
                        setRegisterPressed(false)
                    });
            } else {
                setUserErrors(newErrors)
            }
        }
    }, [registerPressed])

    return (
        <>
            <div className={"d-flex flex-column min-vh-100 align-items-center justify-content-center bg-success"}>

                <div className="row justify-content-center w-50 p-3 bg-light rounded-3">

                    <div className="col-md-12 flex-grow-1 p-5 ">
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <h1>Register</h1>

                            </div>
                        </div>

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="text" value={user.firstname} onChange={(e) => {
                                    setUser({firstname: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"first name"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>
                        { !userErrors.firstname.isValid && userErrors.firstname.isTouched &&

                        <ErrorComponent > {userErrors.firstname.errorMsg}</ErrorComponent>

                        }
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="text" value={user.lastname} onChange={(e) => {
                                    setUser({lastname: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"last name"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        {!userErrors.lastname.isValid && userErrors.lastname.isTouched &&
                        <ErrorComponent > {userErrors.lastname.errorMsg}</ErrorComponent>
                        }


                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="email" value={user.email} onChange={(e) => {
                                    setUser({email: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"email"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        {!userErrors.email.isValid && userErrors.email.isTouched &&
                        <ErrorComponent > {userErrors.email.errorMsg}</ErrorComponent>

                        }

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="password" value={user.password} onChange={(e) => {
                                    setUser({password: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        {!userErrors.password.isValid && userErrors.password.isTouched &&
                        <ErrorComponent > {userErrors.password.errorMsg}</ErrorComponent>
                        }

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="password" value={user.confirm_password} onChange={(e) => {
                                    setUser({confirm_password: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"confirm password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        {!userErrors.confirm_password.isValid && userErrors.confirm_password.isTouched &&
                        <ErrorComponent > {userErrors.confirm_password.errorMsg}</ErrorComponent>
                        }

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <select className="form-select" value={user.gender} onChange={(e) => {
                                    setUser({gender: e.target.value})
                                }
                                }>
                                    <option value={''}> select gender</option>
                                    <option value={'Male'}> Male</option>
                                    <option value={'Female'}> Female</option>
                                </select>
                            </div>
                        </div>

                        {!userErrors.gender.isValid && userErrors.gender.isTouched &&
                        <ErrorComponent > {userErrors.gender.errorMsg}</ErrorComponent>
                        }

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="file" onChange={(e) => {
                                    // setAvatar(e.target.files[0])
                                    setUser({avatar: e.target.files[0]})
                                }} className="form-control" placeholder={"password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        {!userErrors.avatar.isValid && userErrors.avatar.isTouched &&
                        <ErrorComponent > {userErrors.avatar.errorMsg}</ErrorComponent>
                        }

                        { serverError !== "" &&
                        <ErrorComponent > {serverError}</ErrorComponent>
                        }
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 align-items-center">
                                <button type="submit" className="btn btn-primary align-self-center" onClick={() => {
                                    setRegisterPressed(registerPressed + 1)
                                }}>Register
                                </button>

                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 align-items-center">
                              Already have account?                 <Link to="/login">login</Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
