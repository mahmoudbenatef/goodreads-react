import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryService } from "../../API/CategoryServices";

export default function Categories() {
  const [categories , setCategories] = useState([]);
  useEffect(() => {
        CategoryService.getPopular().then((cat)=>setCategories(cat.data));
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
      width: "20rem",
      height: "7rem",
      textAlign: "center",
      marginBottom: "2rem",
      lineHeight: "7rem",
    },
    label: {
      fontSize: "2rem",
      textDecoration: "none",
      color: "black",
      fontSize : "1.5rem",
      "&:hover": {
        color: "#ac5d59",
      },
    },
  }));
  const classes = useStyles();

  return (
    <div style={{ paddingTop: "4.0rem" }}>
      <h1 style={{ textAlign: "center" }}>Explore our Categories</h1>
      <div className={classes.flex}>
        {categories.map((value, index) => {
          return (
            <div className={classes.category} key={index}>
              <Button style={{padding: "1rem" , width: "15rem"}} variant="outlined" >
                <Link className={classes.label} to={"/categoty/"+value._id._id}>
                  {value._id.label}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
