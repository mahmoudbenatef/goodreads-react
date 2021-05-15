import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookService } from "../../API/BookServices";

export default function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BookService.getPopular().then((cat) => setBooks(cat.data));
  }, []);

  const useStyles = makeStyles((theme) => ({
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "baseline",
      alignContent: "space-between",
      marginTop: "4rem",
    },
    category: {
      width: "20rem",
      height: "7rem",
      textAlign: "center",
      marginBottom: "2rem",
      lineHeight: "7rem",
    },
    label: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#ac5d59",
      },
    },
  }));
  const classes = useStyles();

  return (
    <div style={{ paddingTop: "9.0rem" }}>
      <h1 style={{ textAlign: "center" }}>Most Popular Books</h1>
      <div className={classes.flex}>
        {books.map((value, index) => {
          return (
            <main>
              <div class="book-card">
                <Link className={classes.label} to={"/book/" + value._id}>
                  <div class="book-card__cover">
                    <div class="book-card__book">
                      <div class="book-card__book-front">
                        <img
                          class="book-card__img"
                          src="https://i.ibb.co/gTvbqnQ/harry-potter.jpg"
                        />
                      </div>
                      <div class="book-card__book-back"></div>
                      <div class="book-card__book-side"></div>
                    </div>
                  </div>
                </Link>
                <div>
                  <div class="book-card__title">{value.name}</div>
                  <Link
                    className={classes.label}
                    to={"/authors/" + value.author._id}
                  >
                    <div class="book-card__author">
                      By: {value.author.firstname} {value.author.lastname}
                    </div>
                  </Link>
                </div>
              </div>
            </main>
          );
        })}
      </div>
    </div>
  );
}
