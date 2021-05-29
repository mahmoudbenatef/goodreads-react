import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../API/urls";
import { UserBookServices } from "../../API/userBookservices";
import { mySessionStorage } from "../../helper/LocalStorge";
import PaginationComponent from "../reusableComponents/PaginationComponent";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";

export default function UserShelvesComponent() {
  const [userBooks, setUserBooks] = useState([]);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState(0);
  const history = useHistory();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const userBooksData = await UserBookServices.userBooks(
          mySessionStorage.getCurrentUser()._id,
          page,
          7,
          filter
        );
        if (userBooksData.status === 200) setUserBooks(userBooksData.data);
      } catch (error) {
        setUserBooks([]);
      }
    };
    getBooks();
  }, [filter, reload]);

  const handelBookDetails = (bookId) => {
    return history.push({
      pathname: "books/details",
      state: {
        bookId,
      },
    });
  };

  return (
    <>
      {userBooks.length === 0 ? (
        <div className="text-center mb-5 mt-5">
          <h1>No books yet!</h1>
          <button className="btn btn-success m-5" onClick={() => setFilter(0)}>
            {" "}
            All My Reads
          </button>
          <button
            className="btn btn-primary m-5"
            onClick={() => history.push("/books")}
          >
            {" "}
            All Available Books
          </button>
        </div>
      ) : (
        <div className="row m-1">
          <h1 className="text-center m-5">My Books interaction</h1>
          <div className="col-2">
            <ul className="list-group" style={{ cursor: "pointer" }}>
              <li
                className={
                  filter === 0 ? "list-group-item active" : "list-group-item"
                }
                onClick={() => setFilter(0)}
              >
                All
              </li>
              <li
                className={
                  filter === 3 ? "list-group-item active" : "list-group-item"
                }
                onClick={() => setFilter(3)}
              >
                Read
              </li>
              <li
                className={
                  filter === 2 ? "list-group-item active" : "list-group-item"
                }
                onClick={() => setFilter(2)}
              >
                Currently Reading
              </li>
              <li
                className={
                  filter === 1 ? "list-group-item active" : "list-group-item"
                }
                onClick={() => setFilter(1)}
              >
                Want To Read
              </li>
            </ul>
          </div>

          <div className="col-10">
            <table className="table table-active table-bordered table-striped">
              <thead className="text-center bg-dark text-light">
                <tr>
                  <th>Cover</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Avg Rate</th>
                  <th>Rating</th>
                  <th>Shelve</th>
                </tr>
              </thead>
              <tbody>
                {userBooks.data.map((userBook) => {
                  return (
                    <tr key={userBook._id}>
                      <td className="text-center">
                        {" "}
                        <img
                          width="150px"
                          className="img-fluid"
                          src={BASE_URL + "/" + userBook.book?.image}
                          alt="Book"
                        />{" "}
                      </td>
                      <td
                        onClick={() => handelBookDetails(userBook.book?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {userBook.book?.name}
                      </td>
                      <td>
                        <Link to={"/authors/" + userBook.book?.author._id}>
                          {userBook.book?.author.lastname}
                        </Link>
                      </td>
                      <td>
                        <Rating
                          name="read-only"
                          value={userBook.book?.avgRating}
                          readOnly
                          size="small"
                        />
                      </td>
                      <td>
                        <RateComponent
                          bookId={userBook.book?._id}
                          userRating={userBook.rating}
                          size="small"
                        ></RateComponent>
                      </td>
                      <td>
                        <ShelfComponent
                          bookId={userBook.book?._id}
                          bookShelf={userBook.shelf}
                          setReload={setReload}
                          reload={reload}
                        ></ShelfComponent>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-center mt-4 ">
            <div className="col-md-8 ">
              <PaginationComponent
                count={userBooks.count}
                page={page}
                setPage={setPage}
              ></PaginationComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
