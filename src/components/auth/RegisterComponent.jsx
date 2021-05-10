import {useHistory} from "react-router-dom";
import {useEffect, useContext, useState, useReducer} from "react"
import {authContext} from "../../contexts/authContext";
import styles from "../../styles/register.module.css"
import {ApiServices} from "../../API/ApiServices"
import {mySessionStorage} from "../../helper/LocalStorge"
import axios from "axios";
import {API} from "../../API/Constants";

export default function LoginComponent() {
    const authentication = useContext(authContext)
    const history = useHistory();
    const [avatar, setAvatar] = useState(null)
    const [user, setUser] = useReducer((oldstate, updates) => ({...oldstate, ...updates}), {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        gender: ''

    })
    const [registerPressed, setRegisterPressed] = useState(false)
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
            setRegisterPressed(false)
            console.log("msa2k laziz")
            let formData = new FormData()
            console.log(avatar)
            console.log(avatar.name)
            formData.append("avatar",avatar,avatar.name)
            for (const [key, value] of Object.entries(user)) {
                formData.append(key, value)
            }
            // ApiServices.register(formData)
            console.log(formData)
            axios.post(API.register() , formData)
                .then(function (response) {
                    history.push("/login");
                })
                .catch(function (error) {
                    console.log(error);
                    setRegisterPressed(false)
                });
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

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="text" value={user.lastname} onChange={(e) => {
                                    setUser({lastname: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"last name"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="email" value={user.email} onChange={(e) => {
                                    setUser({email: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"email"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="password" value={user.password} onChange={(e) => {
                                    setUser({password: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="password" value={user.confirm_password} onChange={(e) => {
                                    setUser({confirm_password: e.target.value})
                                }} className="form-control" id="exampleInputEmail1" placeholder={"confirm password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>
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

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input type="file"  onChange={(e) => {
                                    setAvatar( e.target.files[0])
                                }} className="form-control" placeholder={"password"}
                                       aria-describedby="emailHelp"/>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 align-items-center">
                                <button type="submit" className="btn btn-primary align-self-center" onClick={() => {
                                    setRegisterPressed(true)
                                }}>Rgeister
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
