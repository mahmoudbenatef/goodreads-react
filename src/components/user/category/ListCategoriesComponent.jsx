import { useContext, useEffect, useState } from "react";
import {Route, Switch, useHistory, useRouteMatch, Link} from "react-router-dom";
import { userCategoriesServices } from "../../../API/userCategoriesServices";
import { authContext } from "../../../contexts/authContext";

export default function ListCategoriesComponent() {
    const [userCategories, setUserCategories] = useState([]);
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


    useEffect(()=>{
        const getCategories = async () => {
            const userCategoriesData = await userCategoriesServices.userCategories();
            if (userCategoriesData.status === 200) setUserCategories(userCategoriesData.data);
            console.log(userCategoriesData.data);
        };
        getCategories()
      },[]);

  return (
    <>
    {
        userCategories.length === 0 
        ? 
        <h1>No Categories Available</h1>
        :
        <ul className="list-group list-group-horizontal">
            { userCategories.map((category) => {
                return <li className="list-group-item" key={category._id} > <Link to={{
                    pathname: `/categories/${category._id}`,
                    state: {
                        title: category.label,
                    },
                  }}>{ category.label }</Link></li>
            })}
        </ul>

    }
    

    </>
  );
}
