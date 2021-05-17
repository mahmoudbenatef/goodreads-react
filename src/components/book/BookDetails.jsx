import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import bookServices from "../../API/bookServices";
import { BASE_URL } from "../../API/urls";
import statusCode from "../../helper/statusCode";
import LoadingComponent from "../reusableComponents/LoadingComponent";
import BookCardCompontent from "../userDashboard/BookCardComponent";
import BookDescription from "./BookDescription";
import ReviewComponent from "./ReviewComponent";

export default function BookDetails(props) {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // navigation
  const history = useHistory();
  // accessing the passed object
  const location = useLocation();
  const bookId = location?.state?.bookId;

  // redirect if there is not bookId passed
  useEffect(() => {
    if (!bookId) return history.push("/books");
  }, []);

  // get bookDetaisl

  useEffect(async () => {
    try {
      const { status, data } = await bookServices.getBookById(bookId);
      if (status === statusCode.Success) {
        setBook(data.book);
        setReviews(data.reviews);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.response);
      alert("somthing went wrong please try again later");
    }
  }, [bookId]);

  const getFullName = (user) => user.firstname + " " + user.lastname;
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col-6">
              <BookCardCompontent
                bookID={book._id}
                rate={book.avgRating}
                image={BASE_URL + "/" + book.image}
                bookName={book.name}
                authorName={getFullName(book.author)}
              />
            </div>
            <div className="col-6">
              <BookDescription
                bookName={book.name}
                bookAvgValue={book.avgRating}
                authorName={getFullName(book.author)}
                numberOfReviews={reviews.length}
                bookDescription={book.description}
              />
            </div>
          </div>

          <hr />
          <div className="row">
            {reviews.map((review) => (
              <ReviewComponent
                authorImg={review.user.avatar}
                authorName={getFullName(review.user)}
                rating={review.rating}
                review={review.review}
                shelf={review.shelf}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
