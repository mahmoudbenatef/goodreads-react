import {useEffect,useContext} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, useHistory
} from "react-router-dom";
import AdminBooksComponent from "./AdminBooksComponent";
import {authContext} from "../../contexts/authContext";
export default function AdminHomeComponent(){
    let { path, url } = useRouteMatch();
    const authentication = useContext(authContext)
    const history = useHistory();
    useEffect(()=>{
        if (authentication.auth.authed === true&& authentication.auth.role === "user" )
        {
            history.push("/user");
        }
        if (authentication.auth.authed === false )
        {
            history.push("/login");
        }

    },[])

    return (

        <>
            <Switch>
                <Route path={`${path}/books`}>
                    <AdminBooksComponent />
                </Route>

            </Switch>
        </>
    )
}
