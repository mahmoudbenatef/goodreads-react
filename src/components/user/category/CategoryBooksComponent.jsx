import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../../../API/urls";
import { userCategoriesServices } from "../../../API/userCategoriesServices";
import { authContext } from "../../../contexts/authContext";
import BookCardComponent from "../../userDashboard/BookCardComponent";
import { useHistory } from "react-router";

export default function CategoryBooksComponent() {
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state;

  const history = useHistory();

  useEffect(() => {
    const getBooks = async () => {
      const CategoryBooksData = await userCategoriesServices.categoryBooks(id);
      if (CategoryBooksData.status === 200) setBooks(CategoryBooksData.data);
    };
    getBooks();
  }, []);

  const handelBookDetails = (bookId) => () => {
    return history.push({
      pathname: "/books/details",
      state: {
        bookId,
      },
    });
  };

  return (
    <>
      <h1 className="text-center">{title}</h1>
      <div className="row">
        {books.length === 0 ? (
          <h1>No Available Books In This Category Yet</h1>
        ) : (
          books.map((book) => {
            return (
              <div key={book._id} className={"col-md-4 pt-5"}>
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
    </>
  );
}
