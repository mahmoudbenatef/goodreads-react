import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import bookServiece from "../../API/bookServices";
import { BASE_URL } from "../../API/urls";
import PaginationComponent from "../reusableComponents/PaginationComponent";
import BookCardComponent from "./BookCardComponent";

export default function BooksCardContainerComponent() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const histroy = useHistory();
  console.log(books);
  useEffect(() => {
    const getAllData = async () => {
      const params = {
        page,
        limit: 6,
      };
      const booksResponse = await bookServiece.getAllBooks(params);
      console.log(booksResponse);
      if (booksResponse.status === 200) setBooks(booksResponse.data);
    };
    getAllData();
  }, [page]);

  // redirect to book details page
  const handelBookDetails = (bookId) => () => {
    return histroy.push({
      pathname: "books/details",
      state: {
        bookId,
      },
    });
  };
  return (
    <>
      <h1>Books</h1>
      <div className="container">
        <div className="row">
          {!books.data ? (
            <h1>No data yet</h1>
          ) : (
            books.data.map((book) => {
              return (
                <div className={"col-md-4 pt-5"}>
                  <BookCardComponent
                    bookID={book._id}
                    rate={book.avgRating}
                    image={BASE_URL + "/" + book.image}
                    bookName={book.name}
                    authorName={
                      book.author.firstname + " " + book.author.lastname
                    }
                    handelOnClick={handelBookDetails(book._id)}
                  ></BookCardComponent>
                </div>
              );
            })
          )}
        </div>
        <div className="row justify-content-center mt-5  pt-5">
          <div className="col-md-8 ">
            <PaginationComponent
              count={books.count}
              page={page}
              setPage={setPage}
            ></PaginationComponent>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
