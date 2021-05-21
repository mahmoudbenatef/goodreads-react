import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../API/urls";
import LoadingComponent from "../../reusableComponents/LoadingComponent";
import AuthorBooksComponent from "../authorBooks/authorBooks";

const AuthorDetails = (props) => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/authors/${id}`).then((res) => {
      let dd = res.data.DOB;
      let d = new Date(dd);
      var datestring =
        d.getDate() + " - " + (d.getMonth() + 1) + " - " + d.getFullYear();

      setAuthor({ ...res.data, DOB: datestring });

      setLoading(false);
    });
  }, []);
  return loading ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <div className="container">
      <div className="container bcontent">
        <div className="row col-4 " style={{ marginTop: "20px" }}>
          <h2>Author Details</h2>
        </div>

        <hr />
        <div className="card col-12 ">
          <div className="row">
            <div className="col-sm-4">
              <img
                className="card-img"
                height="300"
                src={BASE_URL + "/" + author.avatar}
                alt="image"
              />
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <h3 className="card-title">
                  {author.firstname + " " + author.lastname}
                </h3>
                <h4> {author.DOB}</h4>
                <p className="card-text">{author.description}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <h2>Author Books</h2>
        <hr />
        <AuthorBooksComponent authorId={id}></AuthorBooksComponent>
      </div>
    </div>
  );
};
export default AuthorDetails;
