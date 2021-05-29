import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useContext, useEffect, useState } from "react";
import { userBookService } from "../../API/userBookService";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },

  media: {
    height: 140,
  },
});

export default function BookCardComponent({
  bookName,
  authorName,
  image,
  bookID,
  handelOnClick,
  setUpdated,
}) {
  const authentication = useContext(authContext);
  const [review, setReview] = useState({rating: 0 , shelf:0});
  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      userBookService
        .getShelve(bookID, mySessionStorage.getCurrentUser()._id)
        .then((data) => {
          if (data.data.data) {
            setReview(data.data.data);
          } else {
            setReview(0);
          }
        })
        .catch();
    }
  }, []);
  const classes = useStyles();
  const handleUpdated = () => {
    if (setUpdated && setUpdated([]));
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
          onClick={handelOnClick}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {bookName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            by: {authorName}
          </Typography>
          <div>
            <RateComponent
              bookId={bookID}
              userRating={review.rating}
              size="small"
              callMeonUpdate={handleUpdated}
            ></RateComponent>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ShelfComponent
          bookShelf={review.shelf}
          callMeonUpdate={handleUpdated}
          bookId={bookID}
        ></ShelfComponent>
      </CardActions>
    </Card>
  );
}
