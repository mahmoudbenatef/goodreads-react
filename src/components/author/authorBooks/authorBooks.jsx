import { useEffect, useState } from "react";
import AuthorService from "../../../API/authorServices";
import LoadingComponent from "../../reusableComponents/LoadingComponent";
import BookCard from "./bookCard";
import "./style.css";
const AuthorBooks = ({ authorId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);
  const loadMore = () => {
    AuthorService.getAuthorBooks(authorId, books.length).then((_books) => {
      if (!_books.data.length) {
        setMore(false);
      } else setBooks(books.concat(_books.data));
    });
  };

  useEffect(() => {
    AuthorService.getAuthorBooks(authorId, books.length).then((_books) =>
      setBooks(books.concat(_books.data))
    );
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <>
      {books.map((book) => (
        <BookCard key={book._id} book={book}></BookCard>
      ))}
      { more? 
      <div className="wrapp">
        <button onClick={loadMore} className="myButton">
          Load more
        </button>
      </div>:""
      }
    </>
  );
};
export default AuthorBooks;
