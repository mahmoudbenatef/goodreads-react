import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BookService from "../../API/bookServices";
import { BASE_URL } from "../../API/urls";
import LoadingComponent from "../reusableComponents/LoadingComponent";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    BookService.getPopularBooks().then((cat) => {
      setBooks(cat.data);
      setLoading(false);
    });
  }, []);

  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "baseline",
      alignContent: "space-between",
      marginTop: "4rem",
      marginBottom: "10rem",
    },
    label: {
      textDecoration: "none",
      textAlign: "center",
      color: "black",
      "&:hover": {
        color: "#ac5d59",
      },
    },
  }));
  const classes = useStyles();

  const handelBookDetails = (bookId) => {
    return history.push({
      pathname: "books/details",
      state: {
        bookId,
      },
    });
  };
  return (
    <div style={{ paddingTop: "9.0rem" }}>
      <h1 style={{ textAlign: "center" }}>Most Popular Books</h1>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className={classes.flex}>
          {books.map((value, index) => {
            return (
              <main key={index}>
                <div className="book-card">
                  <div className="book-card__cover">
                    <div className="book-card__book">
                      <div className="book-card__book-front">
                        <img
                          onClick={() => handelBookDetails(value.book._id)}
                          style={{ cursor: "pointer" }}
                          className="book-card__img"
                          src={BASE_URL + "/" + value.book.image}
                        />
                      </div>
                      <div className="book-card__book-back"></div>
                      <div className="book-card__book-side"></div>
                    </div>
                  </div>
                  <div>
                    <div className="book-card__title">{value.book.name}</div>
                    <p
                      style={{
                        margin: 0,
                        color: "#2e6f59",
                        textAlign: "center",
                      }}
                    >
                      {value.book.category.label}
                    </p>
                    <div className="book-card__author"></div>
                    <Link
                      className={classes.label}
                      to={"/authors/" + value.book.author._id}
                    >
                      <p style={{ margin: 0 }}>
                        by {value.book.author.firstname}
                        {value.book.author.lastname}
                      </p>
                    </Link>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <Rating
                        name="read-only"
                        value={value.book.avgRating}
                        precision={0.2}
                        size="small"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </main>
            );
          })}
        </div>
      )}
    </div>
  );
}
