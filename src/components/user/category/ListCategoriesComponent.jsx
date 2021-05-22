import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

  useEffect(() => {
    const getCategories = async () => {
      const userCategoriesData = await userCategoriesServices.userCategories();
      if (userCategoriesData.status === 200)
        setUserCategories(userCategoriesData.data);
      console.log(userCategoriesData.data);
    };
    getCategories();
  }, []);

  const useStyles = makeStyles((theme) => ({
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "baseline",
      alignContent: "space-between",
      marginTop: "4rem",
    },
    category: {
      width: "10rem",
      height: "7rem",
      textAlign: "center",
      marginBottom: "2rem",
      lineHeight: "7rem",
    },
    label: {
      textDecoration: "none",
      color: "black",
      fontSize: "1.2rem",
      "&:hover": {
        color: "#ac5d59",
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      {userCategories.length === 0 ? (
        <h1>No Categories Available</h1>
      ) : (
        <div className={classes.flex}>
          {userCategories.map((category) => {
            return (
              <div className={classes.category} key={category._id}>
                <Button
                  style={{ padding: "1rem", width: "13rem" }}
                  variant="outlined"
                >
                  <Link
                  className={classes.label}
                    to={{
                      pathname: `/categories/${category._id}`,
                      state: {
                        title: category.label,
                      },
                    }}
                  >
                    {category.label}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
