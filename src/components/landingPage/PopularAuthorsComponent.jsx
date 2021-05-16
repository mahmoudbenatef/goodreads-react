import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookService } from "../../API/BookServices";
import { BASE_URL } from "../../API/urls";
import "../../styles/authors.css";
export default function Authors() {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    BookService.getPopularAuthors().then((authors) => setAuthors(authors.data));
  }, []);

  const useStyles = makeStyles((theme) => ({}));
  const classes = useStyles();

  return (
    <div id="large-th">
      <div className="container">
        <h1 style={{ textAlign: "center" , marginTop:"3rem" , marginBottom:"3rem"}}>Most Popular Authors</h1>
        {authors.map((value, index) => {
          return (
          <div className="book read" key={index}>
            <div className="cover">
            <Link to={"/author/"+value.author._id}>
            <img src="https://s-media-cache-ak0.pinimg.com/564x/f9/8e/2d/f98e2d661445620266c0855d418aab71.jpg" />
            <img src={BASE_URL+value.author.avatar} />
            </Link>
            </div>
            <div className="description">
              <p className="title">{value.author.firstname} {value.author.lastname}</p>
            </div>
          </div>
          )}
        )}
      </div>
    </div>
  );
}
