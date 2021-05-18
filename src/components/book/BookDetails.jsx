import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import bookServices from "../../API/bookServices";
import { BASE_URL } from "../../API/urls";
import { mySessionStorage } from "../../helper/LocalStorge";
import statusCode from "../../helper/statusCode";
import LoadingComponent from "../reusableComponents/LoadingComponent";
import BookCardCompontent from "../userDashboard/BookCardComponent";
import BookDescription from "./BookDescription";
import ReviewComponent from "./ReviewComponent";

export default function BookDetails(props) {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState("");
  // to get the new upadted data if any change happend to this book
  const [updated, setUpdated] = useState([]);
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
    console.log("getting the book");
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
  }, [updated]);

  // get user full name
  const getFullName = (user) => user.firstname + " " + user.lastname;

  // add new review

  const handleNewReview = async () => {
    //function gurad
    if (!newReview) return;

    try {
      const { status } = await bookServices.review(
        mySessionStorage.getCurrentUser()._id,
        bookId,
        newReview
      );
      if (status === statusCode.Success) {
        setNewReview("");
        setUpdated([]);
      }
    } catch (error) {
      alert("Sorry somthing went wrong please try again later");
      console.log(error.message, error.response);
    }
  };
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
                setUpdated={setUpdated}
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
          <div>
            <div className="row align-baseline">
              <div className="col">
                <input
                  type="text"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="form-control col-2"
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-sm
                 "
                  style={{ backgroundColor: "rgb(227, 242, 253)" }}
                  onClick={handleNewReview}
                >
                  Review
                </button>
              </div>
            </div>
            {reviews.map((review) => (
              <ReviewComponent
                key={review._id}
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
