import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BookService from "../../API/bookServices";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";

export default function RateComponent({
  userRating,
  bookId,
  size,
  setReload,
}) {
  const authentication = useContext(authContext);
  const history = useHistory();
  const [rate, setRate] = useState(userRating);

  useEffect(() => setRate(userRating), [userRating]);
  const changeRate = async (event, newValue) => {
    if (authentication.auth.authed) {
      await BookService.rate(
        mySessionStorage.getCurrentUser()._id,
        bookId,
        newValue
      );
      setRate(newValue);
    } else history.push("/login");
  };

  const useStyles = makeStyles((theme) => ({
    rating: {
      alignSelf: "center",
    },
  }));
  const classes = useStyles();

  return (
   <>    
    <Rating
      name={bookId}
      onChange={changeRate}
      value={rate}
      precision={1.0}
      size={size}
      className={classes.rating}
    />
   </>
  );
}
