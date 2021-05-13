import {useEffect,useContext} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch, useHistory
} from "react-router-dom";
import {CategoryProvider} from "../../contexts/categoryContext"
import BooksComponent from "../adminDashboard/BooksComponent";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
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
                <Route key={1} path={`${path}/books`}>
                    <BooksComponent />
                </Route>


                <Route key={2} path={`${path}/categories`}>
                <CategoryProvider>
                    <CategoryComponent />
                </CategoryProvider>
                </Route>
            </Switch>
        </>
    )
}
