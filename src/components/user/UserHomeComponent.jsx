import { useContext, useEffect, useState } from "react";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import RateComponent from "../reusableComponents/RateComponent";
import ShelfComponent from "../reusableComponents/ShelfComponent";
import BooksComponent from "../adminDashboard/BooksComponent";
import {CategoryProvider} from "../../contexts/categoryContext";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
import BookCardComponent from "../userDashboard/BookCardComponent";
import BooksCardContainerComponent from "../userDashboard/BooksCardContainerComponent";
import { UserBookServices } from "../../API/userBookservices";
import { mySessionStorage } from "../../helper/LocalStorge";
import { BASE_URL } from "../../API/urls";
import Rating from "@material-ui/lab/Rating";

export default function UserHomeComponent() {
  const [userBooks, setUserBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  let { path, url } = useRouteMatch();
  const authentication = useContext(authContext);
  const history = useHistory();

  let filteredBooks = [];
  switch (filter) {
    case 'all':
      filteredBooks = [...userBooks];
      break;
    case 'wantToRead':
      filteredBooks = [...userBooks].filter((userBook) => userBook.shelf===1);
      break;
    case 'reading':
      filteredBooks = [...userBooks].filter((userBook) => userBook.shelf===2);
      break;
    case 'read':
      filteredBooks = [...userBooks].filter((userBook) => userBook.shelf===3);
      break;
    default:
      filteredBooks = [...userBooks];
      break;
  }

  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "admin"
    ) {
      history.push("/admin");
    }
    if (authentication.auth.authed === false) {
      history.push("/login");
    }
  }, []);

  useEffect(()=>{
    const getBooks = async () => {
        const userBooksData = await UserBookServices.userBooks(mySessionStorage.getCurrentUser()._id);
        console.log(userBooksData.data);
        if (userBooksData.status === 200) setUserBooks(userBooksData.data);
    };
    getBooks()
  },[])

  return (
    <>
    {
    filteredBooks.length === 0 ? (
    <div className="text-center m-5">
      <h1>No books yet!</h1>
     <button className="btn btn-success m-5" onClick={() => setFilter("all")}> All My Reads</button>
     <button className="btn btn-primary m-5" onClick={() => history.push("/user/books")}> All Available Books</button>
     </div>)
    :
    <div className="row m-1">
      <h1 className="text-center m-5">My Books interaction</h1>
      <div className="col-2">
      <ul className="list-group" style={{cursor: "pointer"}}>
        <li className={filter === "all" ? "list-group-item active" : "list-group-item"} onClick={() => setFilter("all")}>All</li>
        <li className={filter === "read" ? "list-group-item active" : "list-group-item"} onClick={() => setFilter("read")}>Read</li>
        <li className={filter === "reading" ? "list-group-item active" : "list-group-item"} onClick={ () => setFilter("reading")}>Currently Reading</li>
        <li className={filter === "wantToRead" ? "list-group-item active" : "list-group-item"} onClick={() => setFilter("wantToRead")}>Want To Read</li>
      </ul>
      </div>

      <div className="col-10">
      <table className="table table-active table-bordered table-striped">
        <thead className="text-center bg-dark text-light">
          <th>Cover</th>
          <th>Name</th>
          <th>Author</th>
          <th>Avg Rate</th>
          <th>Rating</th>
          <th>Shelve</th>
        </thead>
        <tbody>
         { filteredBooks.map( (userBook) => {
            return <tr key={userBook._id}>
              <td className="text-center"> <img width="150px" className="img-fluid" src={BASE_URL+'/'+userBook.book.image} alt="Book" /> </td>
              <td>{userBook.book.name}</td>
              <td>{userBook.book.author.lastname}</td>
              <td><Rating name="read-only" value={userBook.book.avgRating} readOnly size="small"/></td>
              <td><RateComponent bookId={userBook.book._id} userRating={userBook.rating} size="small"></RateComponent></td>
              <td><ShelfComponent bookId={userBook.book._id} bookShelf={userBook.shelf} ></ShelfComponent></td>
            </tr>
            
          })
        }
        </tbody>
      </table>
      </div>
    </div>
    }
      <Switch>
        <Route key={1} path={`${path}/books`}>
          <BooksCardContainerComponent></BooksCardContainerComponent>
        </Route>
      </Switch>

    </>
  );
}
