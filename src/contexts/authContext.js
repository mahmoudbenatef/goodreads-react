import {createContext, useState}from "react"
import {mySessionStorage} from "../helper/LocalStorge";
export const authContext = createContext()
const {Provider}= authContext

export function AuthProvider({children}) {
let authed = false, role=""
    if (mySessionStorage.getCurrentUser())
    {
        authed =true
        role = mySessionStorage.getCurrentUser().role
        // authentication.setAuth({authed:true,role:mySessionStorage.getCurrentUser().role})
    }
 const [auth, setAuth]= useState({authed:authed,role:role})
    return <>
        <Provider value={{auth,setAuth}}>{
        children}</Provider>
        </>
}
