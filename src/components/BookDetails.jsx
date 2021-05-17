import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import bookServices from "../API/bookServices";
import { BASE_URL } from "../API/urls";
import statusCode from "../helper/statusCode";
import LoadingComponent from "./reusableComponents/LoadingComponent";
import BookCardCompontent from "./userDashboard/BookCardComponent";
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
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <BookCardCompontent
            bookID={book._id}
            rate={book.avgRating}
            image={BASE_URL + "/" + book.image}
            bookName={book.name}
            authorName={book.author.firstname + " " + book.author.lastname}
          />
        </div>
      )}
    </>
  );
}
