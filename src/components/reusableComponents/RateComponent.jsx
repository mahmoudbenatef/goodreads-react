import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BookService } from "../../API/BookServices";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";

export default function RateComponent({userRating,bookId,size}) {
  const authentication = useContext(authContext);
  const history = useHistory();

  const changeRate = async (event, newValue) => {
    if (authentication.auth.authed) {
        BookService.rate(mySessionStorage.getCurrentUser()._id,bookId,newValue);
    } else history.push("/login");
  };
  
  const useStyles = makeStyles((theme) => ({
    rating: {
      alignSelf: "center"
        }
  }));
  const classes = useStyles();

  return (
      <>
    <Rating
      name="half-rating"
      onChange={changeRate}
      defaultValue={userRating}
      precision={1.0}
      size={size}
      className={classes.rating}
    />
      </>
  );
}
