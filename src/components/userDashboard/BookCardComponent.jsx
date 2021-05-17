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
  rate,
  bookID,
  handelOnClick,
}) {
  const authentication = useContext(authContext);
  const [shelf, setShelf] = useState(0);

  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      userBookService
        .getShelve(bookID, mySessionStorage.getCurrentUser()._id)
        .then((data) => {
          // console.log(data.data.data.shelf)
          if (data.data.data) {
            setShelf(data.data.data.shelf);
          } else {
            setShelf(0);
          }
        })
        .catch();
    }
  }, []);
  const classes = useStyles();
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
              userRating={rate}
              size="small"
            ></RateComponent>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ShelfComponent bookShelf={shelf} bookId={bookID}></ShelfComponent>
      </CardActions>
    </Card>
  );
}
