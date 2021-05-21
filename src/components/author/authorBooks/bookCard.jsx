import Rating from "@material-ui/lab/Rating";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../API/urls";
import { userBookService } from "../../../API/userBookService";
import { authContext } from "../../../contexts/authContext";
import { mySessionStorage } from "../../../helper/LocalStorge";
import RateComponent from "../../reusableComponents/RateComponent";
import ShelfComponent from "../../reusableComponents/ShelfComponent";

export default function BookCardComponent({ book }) {
  const authentication = useContext(authContext);
  const [review, setReview] = useState({ rating: 0, shelf: 0 });
  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      userBookService
        .getShelve(book._id, mySessionStorage.getCurrentUser()._id)
        .then((data) => {
          if (data.data.data) {
            setReview(data.data.data);
          } else {
            setReview({ rating: 0, shelf: 0 });
          }
        })
        .catch();
    }
  }, []);

  return (
    <div className="container">
      <div className="grid-container">
        <div className="avatar">
          <img className="book-card__img" src={BASE_URL + "/" + book.image} />
        </div>
        <div className="desc">
          <p>{book.name}</p>{" "}
          <Rating
            name="read-only"
            value={book.avgRating}
            readOnly
            size="small"
          />
          <p>{book.ratings} ratings</p>
        </div>
        <div className="action">
          <br />
          <ShelfComponent
            bookShelf={review.shelf}
            bookId={book._id}
          ></ShelfComponent>
          <br />
          <RateComponent
            bookId={book._id}
            userRating={review.rating}
            size="small"
          ></RateComponent>
        </div>
      </div>
    </div>
  );
}
