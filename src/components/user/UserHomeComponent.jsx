import {useContext,useEffect, useState} from "react"
import {authContext} from "../../contexts/authContext";
import {Redirect,useHistory} from "react-router-dom";

export default function UserHomeComponent(){
    const authentication = useContext(authContext)
    const history = useHistory();
    useEffect(()=>{
 if (authentication.auth.authed === true&& authentication.auth.role === "admin" )
       {
           history.push("/admin");
       }
        if (authentication.auth.authed === false )
        {
            history.push("/login");
        }
    },[])
    return (
        <>
        <h1>Hello User</h1>
        </>
    )
}
