import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookService from "../../API/bookServices";
import BookCard from "../author/authorBooks/bookCard";
import "../author/authorBooks/style.css";
import LoadingComponent from "../reusableComponents/LoadingComponent";

const SearchComponent = ({}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);
  const { value } = useParams();


  const loadMore = () => {
    BookService.search(value,books.length).then((result) => {
      if (!result.data.length) {
        setMore(false);
      } else setBooks(books.concat(result.data));
    });
  };

  useEffect(() => {
    BookService.search(value,0).then((result) => {
        setBooks(result.data);
      });
    setLoading(false);
  }, [value]);

  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <>
    <h3 style={{textAlign:"center",margin:"2rem"}}>All results for {value}</h3>
    <hr/>
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
export default SearchComponent;
