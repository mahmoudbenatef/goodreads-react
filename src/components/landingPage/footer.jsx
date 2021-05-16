import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export default function Footer() {
  const useStyles = makeStyles((theme) => ({
    label: {
      textDecoration: "none",
      color: "#ccc",
      fontSize: "1.0rem",
      "&:hover": {
        color: "#4878a2",
      },
    },
  }));
  const classes = useStyles();

  return (
    <footer>
      <div className="footer">
        <div className="footer_about">
          <h3>GoodReads</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            aliquid, inventore veritatis, a beatae asperiores eveniet ex
            repudiandae voluptatibus tempora, optio nam harum temporibus
            tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi recusandae dolore molestiae quis iste.
          </p>
        </div>
        <div className="footer_main">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link className={classes.label} to={"/authors"}>
                Authors
              </Link>
            </li>
            <li>
              <Link className={classes.label} to={"/books"}>
                Books
              </Link>
            </li>
            <li>
              <Link className={classes.label} to={"/categories"}>
                Categories
              </Link>
            </li>
          </ul>
        </div>
        <div class="footer_right">
          <h3>About Us</h3>
          <p>
          We are a team of software engineering students at ITI intake 41, 
          Smart Village branch, Open-source application track.
          </p>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2021 All Rights Reserved by Hanibal.
      </div>
    </footer>
  );
}
